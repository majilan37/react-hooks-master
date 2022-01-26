export interface Pokemon {
    id: number;
    name: string;
    type: string[];
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
}

export async function getAll():Promise<Pokemon[]> {
    return fetch('/pokemon.json').then((res) => res.json())
}

export async function getByName(search: string):Promise<Pokemon[]>{
    const lcSearch = search.toLocaleLowerCase()

    return fetch('/pokemon.json')
                .then((res) => res.json())
                .then((pokemon : Pokemon[]) => 
                    pokemon.filter(({name}) => name.toLowerCase().includes(lcSearch))    
                )
}