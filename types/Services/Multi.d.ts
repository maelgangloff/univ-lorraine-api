import { Utilisateur } from "..";
export declare class Multi {
    private utilisateur;
    constructor(utilisateur: Utilisateur);
    getToken(): Promise<any>;
}
