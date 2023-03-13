export interface Item {
    id: number|string;
    etuid: any;
    empid: string;
    displayName: string;
    nom: string;
    cn: string;
    prenom: string;
    telephone: string;
    mail: string;
    affectation: string;
    fonction: string;
    mobile: any;
    faxSimileTel: any;
    autreTel: any;
    affectations: string;
    affectationPrincipale: string;
    bcShortLabel: string;
    affectationEtendue: string;
    udlFonction: string;
    supannListeRouge: boolean;
    enActivite: boolean;
    vetDescription: any;
    urlLink: string;
}

export interface Items2 {
    id: any;
    simpleId: any;
    supannCodeEntite: string;
    supannTypeEntite: any;
    udlLibelleAffichage: string;
    displayName: any;
    fonctionnaire: any;
    nbpersonnels: number;
    nbpersprive: number;
    nbperspublic: number;
    nbetu: number;
    udlStructureAffichage: number;
    udlNiveauStructure: number;
    leaf: number;
    udlCodeFonctionnelStructure: any;
    listPersonne: any;
    acronyme: any;
    urlImageWeb: any;
    urlWebSite: any;
}

export interface ItemAffectation {
    supannCodeEntite: string;
    description: string;
    udlLibelleAffichage: string;
    affectation: string;
    ord: number;
    idlb: number;
    type: string;
}

export interface Fonction {
    id: string;
    fonction: string;
    type: string;
    ord: number;
    structure: any;
    garant: any;
    nbpersprive: number;
    nbperspublic: number;
}

export interface ItemDomainesFonction {
    id: string;
    description: string;
    urlImageWeb: string;
    couleur: string;
    fonctions: Fonction[];
}

export interface PhotoResponse {
    total_count: number
    code_result: string
    url: string
}

export interface AnnuaireResponse {
    total_count: number;
    code_result: string;
    nb_result_max: boolean;
    text: string|null;
    items: Item[] | ItemAffectation[] | Items2[] | ItemDomainesFonction[] | null;
    items2: Items2[] | null;
    logged: boolean;
}
