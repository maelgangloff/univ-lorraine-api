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

export interface ItemAffectation {
    supannCodeEntite: string;
    description: string;
    udlLibelleAffichage: string;
    affectation: string;
    ord: number;
    idlb: number;
    type: string;
}

export interface Items2 {
    id: string|null;
    simpleId: string|null;
    supannCodeEntite: string|null;
    supannTypeEntite: string|null;
    udlLibelleAffichage: string;
    displayName: any;
    fonctionnaire: {
        displayName: string
        fonction: string
        id: string
        type: string
    }[];
    nbpersonnels: number;
    nbpersprive: number;
    nbperspublic: number;
    nbetu: number;
    udlStructureAffichage: number;
    udlNiveauStructure: number;
    leaf: number;
    udlCodeFonctionnelStructure: any;
    listPersonne: Item[] | ItemAffectation[] | Items2[] | null;
    acronyme: string|null;
    urlImageWeb: string|null;
    urlWebSite: string|null;
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
