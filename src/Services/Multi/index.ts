import axios, { AxiosResponse } from "axios";
import { Utilisateur } from "../../index";
import { Service } from "../../Auth/Service";
import { Timetable, TIMETABLE_GRAPHQL_QUERY } from "./Timetable";

const MULTI_GRAPHQL_URL = 'https://multi.univ-lorraine.fr/graphql'

export class Multi {

    private token: string
    private refreshToken: string
    
    public constructor([token, refreshToken]: [string, string]) {
        this.token = token
        this.refreshToken = refreshToken
    }

    /**
     * @param {string} uid Identifiant CAS d'un utilisateur
     * @param {Date} from Date de début
     * @param {Date} to Date de fin
     * @returns {Timetable} L'emploi du temps de l'utilisateur sur la période
     */
    public async getTimetable(uid: string, from: Date, to: Date): Promise<Timetable> {
        const response = await this.queryGraphQL('timetable', TIMETABLE_GRAPHQL_QUERY, {uid, from: from.getTime(), to: to.getTime()})
        return response.data.data.timetable
    }

    /**
     * Récupérer deux jetons JWT permettant de s'authentifier auprès de l'API du Multi 
     * Le premier JWT est le jeton d'authentification. Le deuxième est un refresh token permettant de générer un nouveau token d'authentification.
     * @param utilisateur Un utilisateur de l'UL
     * @returns {[string, string]} Les deux jetons JWT
     */
    public static async login(utilisateur: Utilisateur): Promise<[string, string]> {
        const response = await axios.post(MULTI_GRAPHQL_URL, {
            operationName: 'casAuth',
            query: `query casAuth($token: String!) {
                casAuth(token: $token)
            }`,
            variables: {
                token: await utilisateur.getTicket(Service.MULTI)
            }
        })

        if(!response.data.data.casAuth) throw new Error("Impossible de récupérer le jeton d'authentification pour ce service.")
        return response.data.data.casAuth
    }

    private async queryGraphQL<T = any>(operationName: string, query: string, variables: object): Promise<AxiosResponse<T>> {
        const response = await axios.post(MULTI_GRAPHQL_URL, {
            operationName, query, variables
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-refresh-token': this.refreshToken,
                'x-token': this.token
            }
        })
        if(response.headers['x-token-status'] != '200') {
            if(!response.headers['x-token'] && !response.headers['x-token']) throw new Error("Impossible d'obtenir un nouveau jeton valide, veuilez demander un nouveau ticket auprès du CAS...")
            this.refreshToken = response.headers['x-refresh-token'] ?? this.refreshToken
            this.token = response.headers['x-token'] ?? this.token
        }
        return response
    }
}
