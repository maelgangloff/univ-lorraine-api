import { CasAuthInfo } from './Auth/CasAuthInfo';
import { Service } from './Auth/Service';
export declare class Utilisateur {
    private casAuthInfo;
    constructor(casAuthInfo: CasAuthInfo);
    getTicket(service: Service | string): Promise<string>;
    static serviceValidate(service: Service | string, ticket: string): Promise<any>;
}
