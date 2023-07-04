import { Observable } from 'rxjs';
// import { UserModel } from '../models/user.model';
import { PokemonModel } from '../model/pokemon.model';
import { ResponseModel } from '../model/response.model';
import { PokemonDetailModel } from '../model/pokemon.detail.model';
export abstract class PokemonRepository {
  abstract getDetail(params : {name : string}): Observable<PokemonDetailModel>;
  abstract get(params: {
    offset: number;
    limit: number;
  }): Observable<ResponseModel>;
}
