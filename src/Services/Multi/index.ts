import axios, { AxiosResponse } from 'axios'
import { Utilisateur } from '../../index'
import { Service } from '../../Auth/Service'
import { Timetable, TIMETABLE_GRAPHQL_QUERY } from './Timetable'
import { AffluenceBU, BU } from './AffluencesBU'
import { CROUS_MENU_GRAPHQL_QUERY, Resto } from './MenuCROUS'

const MULTI_GRAPHQL_URL = 'https://multi.univ-lorraine.fr/graphql'

export class Multi {
  private token: string
  private refreshToken: string

  public constructor ([token, refreshToken]: [string, string]) {
    this.token = token
    this.refreshToken = refreshToken
  }

  /**
     * Emploi du temps d'une personne de l'Université de Lorraine
     * @param {string} uid Identifiant CAS d'un utilisateur
     * @param {Date} from Date de début
     * @param {Date} to Date de fin
     * @returns {Timetable} L'emploi du temps de l'utilisateur sur la période
     */
  public async getTimetable (uid: string, from: Date, to: Date): Promise<Timetable> {
    const response = await this.queryGraphQL<{data:{timetable: Timetable}}>('timetable', TIMETABLE_GRAPHQL_QUERY, { uid, from: from.getTime(), to: to.getTime() })
    return response.data.data.timetable
  }

  /**
     * Affluence d'une BU (Bibliothèque Universitaire)
     * @param {BU|string} buToken Identifiant de la bibliothèque universitaire
     * @returns {Promise<AffluenceBU>} Les données brutes concernant l'occupation du lieu
     */
  public static async getAffluenceBU (buToken: BU | string): Promise<AffluenceBU> {
    const response = await axios.get<AffluenceBU>(`https://webapi.affluences.com/api/fillRate?token=${buToken}`, {
      responseType: 'json'
    })
    return response.data
  }

  /**
     * Les menus de tous les restaurants universitaires
     * @returns {Promise<MenuCROUS>} Les menus des Restos U' de Nancy
     */
  public static async getCROUSmenu (): Promise<Resto[]> {
    const response = await axios.post<{data:{restos: Resto[]}}>(MULTI_GRAPHQL_URL, {
      operationName: 'crous', query: CROUS_MENU_GRAPHQL_QUERY, variables: {}
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    })
    return response.data.data.restos
  }

  /**
     * Récupérer deux jetons JWT permettant de s'authentifier auprès de l'API du Multi
     * Le premier JWT est le jeton d'authentification. Le deuxième est un refresh token permettant de générer un nouveau token d'authentification.
     * @param utilisateur Un utilisateur de l'UL
     * @returns {[string, string]} Les deux jetons JWT
     */
  public static async login (utilisateur: Utilisateur): Promise<[string, string]> {
    const response = await axios.post(MULTI_GRAPHQL_URL, {
      operationName: 'casAuth',
      query: `query casAuth($token: String!) {
                casAuth(token: $token)
            }`,
      variables: {
        token: await utilisateur.getTicket(Service.MULTI)
      }
    })

    if (!response.data.data.casAuth) throw new Error("Impossible de récupérer le jeton d'authentification pour ce service.")
    return response.data.data.casAuth
  }

  private async queryGraphQL<T = any> (operationName: string, query: string, variables: object): Promise<AxiosResponse<T>> {
    const response = await axios.post(MULTI_GRAPHQL_URL, {
      operationName, query, variables
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-refresh-token': this.refreshToken,
        'x-token': this.token
      },
      responseType: 'json'
    })
    if (response.headers['x-token-status'] !== '200') {
      if (!response.headers['x-token'] && !response.headers['x-token']) throw new Error("Impossible d'obtenir un nouveau jeton valide, veuilez demander un nouveau ticket auprès du CAS...")
      this.refreshToken = response.headers['x-refresh-token'] ?? this.refreshToken
      this.token = response.headers['x-token'] ?? this.token
    }
    return response
  }
}
