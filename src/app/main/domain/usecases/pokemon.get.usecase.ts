import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { PokemonRepository } from '../repositories/pokemon.repository';
import { ResponseModel } from '../model/response.model';
import { Injectable } from '@angular/core';


@Injectable()
export class GetPokemonsUseCase
  implements UseCase<{ offset: number; limit: number }, ResponseModel>
{
  constructor(private pokemonRepository: PokemonRepository) {}
  execute(params: { offset: number; limit: number }): Observable<ResponseModel> {
    return this.pokemonRepository.get(params);
  }
}
