export interface Artist {
    id: number,
    name: string,
}

export interface Release {
    id: number,
    title: string,
    artists: Artist[],
    genres: string[],
    released: string
}