## Classes

<dl>
<dt><a href="#Utilisateur">Utilisateur</a></dt>
<dd><p>Support non officiel des API de l&#39;Université de Lorraine</p>
</dd>
<dt><a href="#Multi">Multi</a></dt>
<dd><p>Le mULti centralise plusieurs ressouces:</p>
<ul>
<li>Emploi du temps</li>
<li>Taux d&#39;occupation des BU</li>
<li>Menu des Restos U&#39;</li>
<li>FactUeL</li>
</ul>
</dd>
</dl>

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

<a name="Multi"></a>

## Multi
Le mULti centralise plusieurs ressouces:
 - Emploi du temps
 - Taux d'occupation des BU
 - Menu des Restos U'
 - FactUeL

**Kind**: global class  

* [Multi](#Multi)
    * _instance_
        * [.getTimetable(uid, from, to)](#Multi+getTimetable) ⇒ <code>Timetable</code>
    * _static_
        * [.getAffluenceBU(buToken)](#Multi.getAffluenceBU) ⇒ <code>Promise.&lt;AffluenceBU&gt;</code>
        * [.getCROUSmenu()](#Multi.getCROUSmenu) ⇒ <code>Promise.&lt;MenuCROUS&gt;</code>
        * [.login(utilisateur)](#Multi.login) ⇒ <code>Array.&lt;string&gt;</code>

<a name="Multi+getTimetable"></a>

### multi.getTimetable(uid, from, to) ⇒ <code>Timetable</code>
Emploi du temps d'une personne de l'Université de Lorraine

**Kind**: instance method of [<code>Multi</code>](#Multi)  
**Returns**: <code>Timetable</code> - L'emploi du temps de l'utilisateur sur la période  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | Identifiant CAS d'un utilisateur |
| from | <code>Date</code> | Date de début |
| to | <code>Date</code> | Date de fin |

<a name="Multi.getAffluenceBU"></a>

### Multi.getAffluenceBU(buToken) ⇒ <code>Promise.&lt;AffluenceBU&gt;</code>
Affluence d'une BU (Bibliothèque Universitaire)

**Kind**: static method of [<code>Multi</code>](#Multi)  
**Returns**: <code>Promise.&lt;AffluenceBU&gt;</code> - Les données brutes concernant l'occupation du lieu  

| Param | Type | Description |
| --- | --- | --- |
| buToken | <code>BU</code> \| <code>string</code> | Identifiant de la bibliothèque universitaire |

<a name="Multi.getCROUSmenu"></a>

### Multi.getCROUSmenu() ⇒ <code>Promise.&lt;MenuCROUS&gt;</code>
Les menus de tous les restaurants universitaires

**Kind**: static method of [<code>Multi</code>](#Multi)  
**Returns**: <code>Promise.&lt;MenuCROUS&gt;</code> - Les menus des Restos U' de Nancy  
<a name="Multi.login"></a>

### Multi.login(utilisateur) ⇒ <code>Array.&lt;string&gt;</code>
Récupérer deux jetons JWT permettant de s'authentifier auprès de l'API du Multi
Le premier JWT est le jeton d'authentification. Le deuxième est un refresh token permettant de générer un nouveau token d'authentification.

**Kind**: static method of [<code>Multi</code>](#Multi)  
**Returns**: <code>Array.&lt;string&gt;</code> - Les deux jetons JWT  

| Param | Description |
| --- | --- |
| utilisateur | Un utilisateur de l'UL |

