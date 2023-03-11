export const CROUS_MENU_GRAPHQL_QUERY = `query crous {
    restos {
      title
      thumbnail_url
      image_url
      short_desc
      lat
      lon
      menus {
        date
        meal {
          name
          foodcategory {
            name
            dishes {
              name
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

export interface Menu {
    date: string;
    meal: {
        name: 'midi' | 'soir';
        foodcategory: {
            name: string;
            dishes: {
                name: string;
                __typename: 'Dishes';
            }[];
            __typename: 'FoodCategory';
        }[];
        __typename: 'Meal';
    }[];
    __typename: 'Menu';
}

export interface Resto {
    title: string;
    thumbnail_url: string;
    image_url: string;
    short_desc: string;
    lat: number;
    lon: number;
    menus: Menu[];
    __typename: 'Resto';
}
