import axios from 'axios'
import { AnnuaireResponse, PhotoResponse } from './AnnuaireResponse'

const BASE_URL = 'https://annuaire-web.univ-lorraine.fr/rest/'

/**
 * Fonction permettant de "décoder" certaines données de l'annuaire: adresse mail et numéro de téléphone
 * @param {string} s Les données à "décoder"
 * @returns {string|null} Les données "décodées"
 */
export function decryptData (s: string): string|null {
  if (s == null) return null
  let n = 0
  let r = ''
  for (let i = 0; i < s.length; i++) {
    n = s.charCodeAt(i)
    if (n >= 8364) n = 128
    r += String.fromCharCode(n - 1)
  }
  return r
}

/**
 * L'annuaire web de l'Université de Lorraine permet de se renseigner sur un personnel (adresse mail, affectation, ...)
 */
export class Annuaire {
  /**
     * Rechercher une personne travaillant dans l'Annuaire
     * @param {string} valeur Nom/Prénom/Téléphone
     * @param {string} filtervalue Filtrer par identifiant d'un service ou d'une composante
     * @param {boolean} withvac Rechercher dans les vacataires ou non
     * @example ```js
     * const { Annuaire, decryptData } = require('univ-lorraine-api')
     *
     * Annuaire.getLdapSearch('Durand', null, false).then(reponse => {
     *  for(const personne of reponse.items) {
     *    console.log(`${personne.displayName} <${decryptData(personne.mail)}>`)
     *  }
     * })
     * ```
     * @returns {Promise<AnnuaireResponse>} Le résultat de la recherche
     */
  public static async getLdapSearch (valeur: string, filtervalue: string|null = null, withvac?: boolean): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'ldapsearch', {
      params: {
        valeur, filtervalue, withvac
      }
    })
    return response.data
  }

  /**
     * Il est possible d'accéder à la photo des personnels ayant donné leur accord pour qu'elle soit publique.
     * La photo est encodée en base64.
     * @param {string} valeur Identifiant d'un personnel
     * @returns {Promise<PhotoResponse>} La réponse contenant la photo en base64
     */
  public static async getPhoto (valeur: string): Promise<PhotoResponse> {
    const response = await axios.get<PhotoResponse>(BASE_URL + 'getphoto', {
      params: { valeur }
    })
    return response.data
  }

  /**
     * Obtenir les détails des affectations d'un personnel
     * @param {string} valeur Les identifiants des secteurs d'affectation
     * @param {string} principale L'affectation principale du personnel
     * @returns {Promise<AnnuaireResponse>} Les affectations du personnel
     */
  public static async getAffectations (valeur: string, principale: string): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getaffectations', {
      params: { valeur, principale }
    })
    return response.data
  }

  /**
     * Activité principale de la personne
     * @param {string} valeur Identifiant d'un personnel
     * @returns {Promise<AnnuaireResponse>} L'activité principale du personnel
     */
  public static async getActivite (valeur: string): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getactivite', {
      params: { valeur }
    })
    return response.data
  }

  /**
     * Les fonctions du personnel au sein de l'Université (Directeur de la composante, ...)
     * @param {string} valeur Identifiant d'un personnel
     * @returns {Promise<AnnuaireResponse>} Les fonctions du personnel au sein de l'UL
     */
  public static async getFonctions (valeur: string): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getfonctions', {
      params: { valeur }
    })
    return response.data
  }

  /**
     * Liste les Services & Composantes de l'Université de Lorraine (Présidence, Formation, Recherche et Ecoles doctorales)
     */
  public static async getStructuresRacine (): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getstructuresracine')
    return response.data
  }

  /**
     * Liste les fonctions au sein de l'UL
     * @returns {Promise<AnnuaireResponse>} Les fonctions
     */
  public static async getDomainesFonction (): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getdomainesfonction')
    return response.data
  }

  /**
     * Obtenir les personnels liés à une fonction particulière
     * @param {string} valeur Identifiant de la fonction
     * @returns {Promise<AnnuaireResponse>} Les personnels attachés à cette fonction
     */
  public static async getPersonnelsFonction (valeur: string): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getpersonnelsfonction', {
      params: { valeur }
    })
    return response.data
  }

  /**
   * Rechercher une personne à partir de son identifiant
   * @param {string} valeur Identifiant d'un personnel
   * @returns {Promise<AnnuaireResponse>} Un personnel (vacataire)
   */
  public static async getPersonne (valeur: string): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getpersonne', {
      params: { valeur }
    })
    return response.data
  }

  /**
   * Lister tous les vacataires d'une structure
   * @param {string} valeur Identifiant de la structure (supannCodeEntite)
   * @returns {Promise<AnnuaireResponse>} Les vacataires attachés à la structure
   */
  public static async getVacataires (valeur: string): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getvacatairesstructure', {
      params: { valeur }
    })
    return response.data
  }

  /**
   * Lister tous les personnels non vacataires d'une structure
   * @param {string} valeur Identifiant de la structure (supannCodeEntite)
   * @returns {Promise<AnnuaireResponse>} Les personnels attachés à la structure
   */
  public static async getPersonnelsStructure (valeur: string): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getpersonnelsstructure', {
      params: { valeur }
    })
    return response.data
  }

  /**
   * Lister tous les personnels non vacataires des structures filles d'une entité
   * @param {string} valeur Identifiant de la structure (supannCodeEntite)
   * @returns {Promise<AnnuaireResponse>} Les personnels attachés aux structures filles d'une entité
   */
  public static async getPersonnelsStructuresFilles (valeur: string): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getpersstructuresfilles', {
      params: { valeur }
    })
    return response.data
  }

  /**
   * Lister tous les vacataires des structures filles d'une entité
   * @param {string} valeur Identifiant de la structure (supannCodeEntite)
   * @returns {Promise<AnnuaireResponse>} Les vacataires attachés aux structures filles d'une entité
   */
  public static async getVacatairesStructuresFilles (valeur: string): Promise<AnnuaireResponse> {
    const response = await axios.get<AnnuaireResponse>(BASE_URL + 'getvacstructuresfilles', {
      params: { valeur }
    })
    return response.data
  }
}
