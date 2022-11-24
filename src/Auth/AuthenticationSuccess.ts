export interface AuthenticationSuccess {
    'cas:user': string
    'cas:attributes': {
        'cas:cn': string
        'cas:displayname': string
        'cas:givenname': string
        'cas:mail': string
        'cas:sn': string
        'cas:uid': string

    }
}
