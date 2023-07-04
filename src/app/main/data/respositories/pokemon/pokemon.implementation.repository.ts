import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonRepository } from 'src/app/main/domain/repositories/pokemon.repository';
import { ResponseModel } from 'src/app/main/domain/model/response.model';
import { PokemonEntity } from './entities/pokemon.entity';
import { PokemonImplementationRepositoryMapper } from './mappers/pokemon-repository.mapper';
import { PokemonDetailModel } from 'src/app/main/domain/model/pokemon.detail.model';
// import { UserEntity } from './entities/user-entity';
// import { UserImplementationRepositoryMapper } from './mappers/user-repository.mapper';
// import { UserRepository } from 'src/domain/repositories/user.repository';
// import { UserModel } from 'src/domain/models/user.model';
@Injectable({
  providedIn: 'root',
})
export class PokemonImplementationRepository extends PokemonRepository {

  url = 'https://pokeapi.co/api/v2/pokemon/';
  pokemonMapper = new PokemonImplementationRepositoryMapper();
  constructor(private http: HttpClient) {
    super();
  }

  get(params: { offset: number; limit: number }): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(
      `${this.url}?offset=${params.offset}}&limit=${params.limit}`
    );
  }

  getDetail(params: { name: string; }): Observable<PokemonDetailModel> {
    return this.http.get<PokemonDetailModel>(
      `${this.url}${params.name}`
    );
  }
  // login(params: {username: string, password: string}): Observable<UserModel> {
  //     return this.http
  //         .post<UserEntity>('https://example.com/login', {params})
  //         .pipe(map(this.userMapper.mapFrom));
  // }
  // register(params: {phoneNum: string, password: string}): Observable<UserModel> {
  //    return this.http
  //         .post<UserEntity>('https://example.com/register', {params})
  //         .pipe(map(this.userMapper.mapFrom));
  // }
  // getUserProfile(): Observable<UserModel>{
  //     return this.http.get<UserEntity>('https://example.com/user').pipe(
  //         map(this.userMapper.mapFrom));
  // }
}
