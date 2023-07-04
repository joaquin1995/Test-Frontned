import { PokemonModel } from "./pokemon.model"

export interface ResponseModel {
    count: number
    next: string
    previous: string
    results: PokemonModel[]
  }