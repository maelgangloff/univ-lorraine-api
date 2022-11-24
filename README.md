<a name="Utilisateur"></a>

## Utilisateur
Support non officiel des API de l'Université de Lorraine

**Kind**: global class  

* [Utilisateur](#Utilisateur)
    * _instance_
        * [.getTicket(service)](#Utilisateur+getTicket) ⇒ <code>Promise.&lt;string&gt;</code>
    * _static_
        * [.serviceValidate(service, ticket)](#Utilisateur.serviceValidate) ⇒ <code>Promise.&lt;AuthenticationSuccess&gt;</code>

<a name="Utilisateur+getTicket"></a>

### utilisateur.getTicket(service) ⇒ <code>Promise.&lt;string&gt;</code>
Générer un ticket d'authentification à faire utiliser par un service

**Kind**: instance method of [<code>Utilisateur</code>](#Utilisateur)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Le ticket à utiliser auprès du service  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>Service</code> \| <code>string</code> | L'URL de redirection à utiliser pour transmettre le ticket au service |

<a name="Utilisateur.serviceValidate"></a>

### Utilisateur.serviceValidate(service, ticket) ⇒ <code>Promise.&lt;AuthenticationSuccess&gt;</code>
Récupérer les informations de l'utilisateur du CAS. L'opération nécessite un ticket.

**Kind**: static method of [<code>Utilisateur</code>](#Utilisateur)  
**Returns**: <code>Promise.&lt;AuthenticationSuccess&gt;</code> - Informations de l'utilisateur  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>Service</code> \| <code>string</code> | L'URL de connexion du service (utilisé comme un identifiant) |
| ticket | <code>string</code> | Le ticket adressé au service |

