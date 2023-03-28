## Classes

<dl>
<dt><a href="#Utilisateur">Utilisateur</a></dt>
<dd><p>Support non officiel des API de l&#39;Université de Lorraine</p>
<p>Un exemple d&#39;implémentation est disponible sur <a href="https://github.com/maelgangloff/u2l-bot">maelgangloff/bot-u2l</a></p>
<p>La classe Utilisateur contient les informations d&#39;authentification d&#39;un étudiant ou d&#39;un personnel de l&#39;Université de Lorraine. Elle permet de récupérer un ticket auprès du serveur d&#39;authentification CAS pour s&#39;authentifier auprès de serveurs tiers (mULti, Annuaire, ...).</p>
</dd>
<dt><a href="#Annuaire">Annuaire</a></dt>
<dd><p>L&#39;annuaire web de l&#39;Université de Lorraine permet de se renseigner sur un personnel (adresse mail, affectation, ...)</p>
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

## Functions

<dl>
<dt><a href="#decryptData">decryptData(s)</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Fonction permettant de &quot;décoder&quot; certaines données de l&#39;annuaire: adresse mail et numéro de téléphone</p>
</dd>
</dl>

<a name="Utilisateur"></a>

## Utilisateur
Support non officiel des API de l'Université de Lorraine

Un exemple d'implémentation est disponible sur [maelgangloff/bot-u2l](https://github.com/maelgangloff/u2l-bot)

La classe Utilisateur contient les informations d'authentification d'un étudiant ou d'un personnel de l'Université de Lorraine. Elle permet de récupérer un ticket auprès du serveur d'authentification CAS pour s'authentifier auprès de serveurs tiers (mULti, Annuaire, ...).

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

**Example**  
```js
const { Utilisateur, Service } = require('univ-lorraine-api')

const user = new Utilisateur('identifiantUL', 'motdepasseUL')
user.getTicket(Service.MULTI).then(ticket => {
 console.log('Ticket à faire consommer par le service MULTI: ' + ticket)
})
```
<a name="Utilisateur.serviceValidate"></a>

### Utilisateur.serviceValidate(service, ticket) ⇒ <code>Promise.&lt;AuthenticationSuccess&gt;</code>
Récupérer les informations de l'utilisateur du CAS. L'opération nécessite un ticket.

**Kind**: static method of [<code>Utilisateur</code>](#Utilisateur)  
**Returns**: <code>Promise.&lt;AuthenticationSuccess&gt;</code> - Informations de l'utilisateur  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>Service</code> \| <code>string</code> | L'URL de connexion du service (utilisé comme un identifiant) |
| ticket | <code>string</code> | Le ticket adressé au service |

**Example**  
```js
const { Utilisateur, Service } = require('univ-lorraine-api')

const user = new Utilisateur('identifiantUL', 'motdepasseUL')
user.getTicket(Service.MULTI).then(async ticket => {
 const infos = await Utilisateur.serviceValidate(Service.MULTI, ticket)
 console.log(`Vous êtes bien authentifié en tant que ${infos['cas:attributes']['cas:displayname']} <${infos['cas:attributes']['cas:mail']}>.`)
})
```
<a name="Annuaire"></a>

## Annuaire
L'annuaire web de l'Université de Lorraine permet de se renseigner sur un personnel (adresse mail, affectation, ...)

**Kind**: global class  

* [Annuaire](#Annuaire)
    * [.getLdapSearch(valeur, filtervalue, withvac)](#Annuaire.getLdapSearch) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
    * [.getPhoto(valeur)](#Annuaire.getPhoto) ⇒ <code>Promise.&lt;PhotoResponse&gt;</code>
    * [.getAffectations(valeur, principale)](#Annuaire.getAffectations) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
    * [.getActivite(valeur)](#Annuaire.getActivite) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
    * [.getFonctions(valeur)](#Annuaire.getFonctions) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
    * [.getStructuresRacine()](#Annuaire.getStructuresRacine)
    * [.getDomainesFonction()](#Annuaire.getDomainesFonction) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
    * [.getPersonnelsFonction(valeur)](#Annuaire.getPersonnelsFonction) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
    * [.getPersonne(valeur)](#Annuaire.getPersonne) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
    * [.getVacataires(valeur)](#Annuaire.getVacataires) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
    * [.getPersonnelsStructure(valeur)](#Annuaire.getPersonnelsStructure) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
    * [.getPersonnelsStructuresFilles(valeur)](#Annuaire.getPersonnelsStructuresFilles) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
    * [.getVacatairesStructuresFilles(valeur)](#Annuaire.getVacatairesStructuresFilles) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>

<a name="Annuaire.getLdapSearch"></a>

### Annuaire.getLdapSearch(valeur, filtervalue, withvac) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Rechercher une personne travaillant dans l'Annuaire

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - Le résultat de la recherche  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| valeur | <code>string</code> |  | Nom/Prénom/Téléphone |
| filtervalue | <code>string</code> | <code>null</code> | Filtrer par identifiant d'un service ou d'une composante |
| withvac | <code>boolean</code> |  | Rechercher dans les vacataires ou non |

**Example**  
```js
const { Annuaire, decryptData } = require('univ-lorraine-api')

Annuaire.getLdapSearch('Durand', null, false).then(reponse => {
 for(const personne of reponse.items) {
   console.log(`${personne.displayName} <${decryptData(personne.mail)}>`)
 }
})
```
<a name="Annuaire.getPhoto"></a>

### Annuaire.getPhoto(valeur) ⇒ <code>Promise.&lt;PhotoResponse&gt;</code>
Il est possible d'accéder à la photo des personnels ayant donné leur accord pour qu'elle soit publique.
La photo est encodée en base64.

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;PhotoResponse&gt;</code> - La réponse contenant la photo en base64  

| Param | Type | Description |
| --- | --- | --- |
| valeur | <code>string</code> | Identifiant d'un personnel |

<a name="Annuaire.getAffectations"></a>

### Annuaire.getAffectations(valeur, principale) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Obtenir les détails des affectations d'un personnel

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - Les affectations du personnel  

| Param | Type | Description |
| --- | --- | --- |
| valeur | <code>string</code> | Les identifiants des secteurs d'affectation |
| principale | <code>string</code> | L'affectation principale du personnel |

<a name="Annuaire.getActivite"></a>

### Annuaire.getActivite(valeur) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Activité principale de la personne

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - L'activité principale du personnel  

| Param | Type | Description |
| --- | --- | --- |
| valeur | <code>string</code> | Identifiant d'un personnel |

<a name="Annuaire.getFonctions"></a>

### Annuaire.getFonctions(valeur) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Les fonctions du personnel au sein de l'Université (Directeur de la composante, ...)

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - Les fonctions du personnel au sein de l'UL  

| Param | Type | Description |
| --- | --- | --- |
| valeur | <code>string</code> | Identifiant d'un personnel |

<a name="Annuaire.getStructuresRacine"></a>

### Annuaire.getStructuresRacine()
Liste les Services & Composantes de l'Université de Lorraine (Présidence, Formation, Recherche et Ecoles doctorales)

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
<a name="Annuaire.getDomainesFonction"></a>

### Annuaire.getDomainesFonction() ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Liste les fonctions au sein de l'UL

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - Les fonctions  
<a name="Annuaire.getPersonnelsFonction"></a>

### Annuaire.getPersonnelsFonction(valeur) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Obtenir les personnels liés à une fonction particulière

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - Les personnels attachés à cette fonction  

| Param | Type | Description |
| --- | --- | --- |
| valeur | <code>string</code> | Identifiant de la fonction |

<a name="Annuaire.getPersonne"></a>

### Annuaire.getPersonne(valeur) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Rechercher une personne à partir de son identifiant

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - Un personnel (vacataire)  

| Param | Type | Description |
| --- | --- | --- |
| valeur | <code>string</code> | Identifiant d'un personnel |

<a name="Annuaire.getVacataires"></a>

### Annuaire.getVacataires(valeur) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Lister tous les vacataires d'une structure

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - Les vacataires attachés à la structure  

| Param | Type | Description |
| --- | --- | --- |
| valeur | <code>string</code> | Identifiant de la structure (supannCodeEntite) |

<a name="Annuaire.getPersonnelsStructure"></a>

### Annuaire.getPersonnelsStructure(valeur) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Lister tous les personnels non vacataires d'une structure

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - Les personnels attachés à la structure  

| Param | Type | Description |
| --- | --- | --- |
| valeur | <code>string</code> | Identifiant de la structure (supannCodeEntite) |

<a name="Annuaire.getPersonnelsStructuresFilles"></a>

### Annuaire.getPersonnelsStructuresFilles(valeur) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Lister tous les personnels non vacataires des structures filles d'une entité

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - Les personnels attachés aux structures filles d'une entité  

| Param | Type | Description |
| --- | --- | --- |
| valeur | <code>string</code> | Identifiant de la structure (supannCodeEntite) |

<a name="Annuaire.getVacatairesStructuresFilles"></a>

### Annuaire.getVacatairesStructuresFilles(valeur) ⇒ <code>Promise.&lt;AnnuaireResponse&gt;</code>
Lister tous les vacataires des structures filles d'une entité

**Kind**: static method of [<code>Annuaire</code>](#Annuaire)  
**Returns**: <code>Promise.&lt;AnnuaireResponse&gt;</code> - Les vacataires attachés aux structures filles d'une entité  

| Param | Type | Description |
| --- | --- | --- |
| valeur | <code>string</code> | Identifiant de la structure (supannCodeEntite) |

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

**Example**  
```js
const { Utilisateur, Multi } = require('univ-lorraine-api')

Multi.login(new Utilisateur('identifiantUL', 'motdepasseUL')).then(async auth => {
 const user = new Multi(auth)

 const timetable = await user.getTimetable('identifiantUL', new Date('2023-03-01'), new Date('2023-03-31'))
 for(const planning of timetable.plannings) {
   console.log('Planning : ' + planning.label)
 }
})
```
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

<a name="decryptData"></a>

## decryptData(s) ⇒ <code>string</code> \| <code>null</code>
Fonction permettant de "décoder" certaines données de l'annuaire: adresse mail et numéro de téléphone

**Kind**: global function  
**Returns**: <code>string</code> \| <code>null</code> - Les données "décodées"  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>string</code> | Les données à "décoder" |

