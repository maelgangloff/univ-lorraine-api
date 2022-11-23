import axios from "axios";
import { Utilisateur } from "..";
import { Service } from "../Auth/Service";

export class Multi {

    public constructor(private utilisateur: Utilisateur) {
    }

    public async getToken() {
        const response = await axios.post('https://multi.univ-lorraine.fr/graphql', {
            operationName: 'casAuth',
            query: `query casAuth($token: String!) {
                casAuth(token: $token)
            }`,
            variables: {
                token: await this.utilisateur.getTicket(Service.MULTI)
            }
        })

        if(!response.data.data.casAuth) throw new Error("Impossible de récupérer le jeton d'authentification pour ce service.")
        return response.data.data.casAuth[0]
    }
}
