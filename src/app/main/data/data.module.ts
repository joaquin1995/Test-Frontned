import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonRepository } from '../domain/repositories/pokemon.repository';
import { GetPokemonsUseCase } from '../domain/usecases/pokemon.get.usecase';
import { PokemonImplementationRepository } from './respositories/pokemon/pokemon.implementation.repository';
import { GetPokemonsDetailUseCase } from '../domain/usecases/polemon.get.detail.usecase';


const pokemonUseCaseFactory = 
(pokemonRepo: PokemonRepository) => new GetPokemonsUseCase(pokemonRepo);
export const PokemonUseCaseProvider = {
    provide: GetPokemonsUseCase,
    useFactory: pokemonUseCaseFactory,
    deps: [PokemonRepository],
};

const pokemonDetailUseCaseFactory = 
(pokemonRepo: PokemonRepository) => new GetPokemonsDetailUseCase(pokemonRepo);
export const PokemonDetailUseCaseProvider = {
    provide: GetPokemonsDetailUseCase,
    useFactory: pokemonDetailUseCaseFactory,
    deps: [PokemonRepository],
};

@NgModule({
    providers: [
        PokemonUseCaseProvider,
        PokemonDetailUseCaseProvider,
        { provide: PokemonRepository, useClass: PokemonImplementationRepository},
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
})
export class DataModule { }