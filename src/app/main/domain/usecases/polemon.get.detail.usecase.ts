import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { PokemonRepository } from '../repositories/pokemon.repository';
import { Injectable } from '@angular/core';
import { PokemonDetailModel } from '../model/pokemon.detail.model';


@Injectable()
export class GetPokemonsDetailUseCase
  implements UseCase<{ name: string }, PokemonDetailModel>
{
  constructor(private pokemonRepository: PokemonRepository) {}
  execute(params: { name : string }): Observable<PokemonDetailModel> {
    return this.pokemonRepository.getDetail(params);
  }
}
