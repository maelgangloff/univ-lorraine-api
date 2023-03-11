export enum BU {
    E_BU_MANUFACTURE = 'yVOLXtN6B2LKyN',
    BU_DROIT_NANCY = 'L9s1PMQeNQOikB',
    IUT_CHARLEMAGNE = 'gs0Z4TlLqAvM5L',
    BU_SAULCY = 'vKus3CioEzz8A7',
    BU_SANTE = 'e2BFakuahrZY5o',
    BU_SCIENCES = 'rpNx50D9cfzErZ',
    BU_LETTRES_SHS = '3WQ2LLjQFAZKXl',
    BU_INGE_BRABOIS = 'iby2zlomfgkKqw',
    INSPE_MONTIGNY = 'bY9dIcZC0xjU5I',
    INSPE_MAXEVILLE = 'PNz6TTLTUGQ0mM',
    MEDIATHEQUE_CAMPUS_ARTEM = 'fwVFZuIyaoucdy'
}

export interface AffluenceBU {
    site_uuid: string
    site_name: string
    site_slug: string
    progress: number
    api_format: string
    previsions: {
        value: any[]
        localized_forecasts: string
    }
    critical_message: {
        message_id: number
        message: string
        url: string
        expiration: any
    }
    current_state: {
        state: string
        value: number
        localized_state: string
        localized_closed: string
    }
    localized_strings: {
        info: string
        title: string
        app: string
    }
}
