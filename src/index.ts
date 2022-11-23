import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { CasAuthInfo } from './Auth/CasAuthInfo'
import { Service } from './Auth/Service'
import { Multi } from './Services/Multi'

const CAS_LOGIN_URL = 'https://auth.univ-lorraine.fr/login'
const CAS_SERVICE_VALIDATE_URL = 'https://auth.univ-lorraine.fr/serviceValidate'


export class Utilisateur {

    public constructor(private casAuthInfo: CasAuthInfo) {
    }

    public async getTicket(service: Service | string): Promise<string> {
        const url = `${CAS_LOGIN_URL}?service=${service}`
        const executionRegex = ((await axios.get(url)).data as string).match(/name="execution" value="(\S+)"/)
        if(executionRegex === null || executionRegex.length != 2) throw new Error("Le paramètre execution n'a pas pu être récupéré.") 
        const execution = executionRegex[1]

        const {username, password} = this.casAuthInfo
        const loginRequest = await axios.post(url, `username=${username}&password=${password}&execution=${execution}&_eventId=submit`)

        return loginRequest.request.res.responseUrl.split('ticket=')[1]
    }

    public static async serviceValidate(service: Service | string, ticket: string) {
        const url = `${CAS_SERVICE_VALIDATE_URL}?ticket=${ticket}&service=${service}`
        const parser = new XMLParser()
        return parser.parse((await axios.get(url)).data)['cas:serviceResponse']['cas:authenticationSuccess']
    }
}
