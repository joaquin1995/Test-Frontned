import { Mapper } from "src/app/main/base/utils/mapper";
import { PokemonEntity } from "../entities/pokemon.entity";
import { PokemonModel } from "src/app/main/domain/model/pokemon.model";

export class PokemonImplementationRepositoryMapper extends Mapper<PokemonEntity, PokemonModel> {
    mapFrom(param: PokemonEntity): PokemonModel {
        return {
            name : param.name,
            url : param.url
        };
    }
    mapTo(param: PokemonModel): PokemonEntity {
        return {
            name : param.name,
            url : param.url
        }
    }
}