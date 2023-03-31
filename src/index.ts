import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { AuthenticationSuccess } from './Auth/AuthenticationSuccess'
import { Service } from './Auth/Service'

export { Multi } from './Services/Multi'
export { Annuaire, decryptData } from './Services/Annuaire'
export { Service } from './Auth/Service'
export * from './Services/Multi/Timetable'
export * from './Services/Annuaire/AnnuaireResponse'
export * from './Services/Multi/AffluencesBU'
export { Menu, Resto } from './Services/Multi/MenuCROUS'
export { News } from './Services/Multi/Factuel'

const CAS_LOGIN_URL = 'https://auth.univ-lorraine.fr/login'
const CAS_SERVICE_VALIDATE_URL = 'https://auth.univ-lorraine.fr/serviceValidate'

/**
 * Support non officiel des API de l'Université de Lorraine
 *
 * Un exemple d'implémentation est disponible sur [maelgangloff/bot-u2l](https://github.com/maelgangloff/u2l-bot)
 *
 * La classe Utilisateur contient les informations d'authentification d'un étudiant ou d'un personnel de l'Université de Lorraine. Elle permet de récupérer un ticket auprès du serveur d'authentification CAS pour s'authentifier auprès de serveurs tiers (mULti, Annuaire, ...).
 * @example ```js
 * const { Utilisateur } = require('univ-lorraine-api')
 *
 * const user = new Utilisateur('identifiantUL', 'motdepasseUL')
 * ```
 */
export class Utilisateur {
  private username: string
  private password: string
  public constructor (username: string, password: string) {
    this.username = username
    this.password = password
  }

  /**
     * Générer un ticket d'authentification à faire utiliser par un service
     * @example ```js
     * const { Utilisateur, Service } = require('univ-lorraine-api')
     *
     * const user = new Utilisateur('identifiantUL', 'motdepasseUL')
     * user.getTicket(Service.MULTI).then(ticket => {
     *  console.log('Ticket à faire consommer par le service MULTI: ' + ticket)
     * })
     * ```
     * @param {Service|string} service L'URL de redirection à utiliser pour transmettre le ticket au service
     * @returns {Promise<string>} Le ticket à utiliser auprès du service
     */
  public async getTicket (service: Service | string): Promise<string> {
    const url = `${CAS_LOGIN_URL}?service=${service}`
    const executionRegex = ((await axios.get(url)).data as string).match(/name="execution" value="(\S+)"/)
    if (executionRegex === null || executionRegex.length !== 2) throw new Error("Le paramètre execution n'a pas pu être récupéré.")
    const execution = executionRegex[1]

    const loginRequest = await axios.post(url, `username=${this.username}&password=${this.password}&execution=${execution}&_eventId=submit`)

    return loginRequest.request.res.responseUrl.split('ticket=')[1]
  }

  /**
     * Récupérer les informations de l'utilisateur du CAS. L'opération nécessite un ticket.
     * @param {Service|string} service L'URL de connexion du service (utilisé comme un identifiant)
     * @param {string} ticket Le ticket adressé au service
     * @example ```js
     * const { Utilisateur, Service } = require('univ-lorraine-api')
     *
     * const user = new Utilisateur('identifiantUL', 'motdepasseUL')
     * user.getTicket(Service.MULTI).then(async ticket => {
     *  const infos = await Utilisateur.serviceValidate(Service.MULTI, ticket)
     *  console.log(`Vous êtes bien authentifié en tant que ${infos['cas:attributes']['cas:displayname']} <${infos['cas:attributes']['cas:mail']}>.`)
     * })
     * ```
     * @returns {Promise<AuthenticationSuccess>} Informations de l'utilisateur
     */
  public static async serviceValidate (service: Service | string, ticket: string): Promise<AuthenticationSuccess> {
    const url = `${CAS_SERVICE_VALIDATE_URL}?ticket=${ticket}&service=${service}`
    const parser = new XMLParser()
    return parser.parse((await axios.get(url)).data)['cas:serviceResponse']['cas:authenticationSuccess']
  }
}
