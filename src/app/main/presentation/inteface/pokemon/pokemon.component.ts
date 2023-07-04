import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ColumnMode,
  NgxDatatableModule,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageModel } from 'src/app/main/domain/model/pages.model';
import { PokemonDetailModel } from 'src/app/main/domain/model/pokemon.detail.model';
import { PokemonModel } from 'src/app/main/domain/model/pokemon.model';
import { GetPokemonsUseCase } from 'src/app/main/domain/usecases/pokemon.get.usecase';
import { GetPokemonsDetailUseCase } from 'src/app/main/domain/usecases/polemon.get.detail.usecase';
import { DetailListComponent } from '../components/detail-list/detail-list.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    DetailListComponent,
  ],
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent {
  title = 'Frontend test';
  empty = 'No hay información';
  page = new PageModel();
  rows: Array<PokemonModel> = [];
  pokemons: Array<PokemonModel> = [];
  pokemonsBuffer: Array<PokemonModel> = [];
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loadingScroll = false;
  bufferSize = 50;
  details?: any;
  subscription!: Subscription;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  loading = false;
  selected: Array<PokemonModel> = [];
  pokemonList: { letter: string; count: number }[] = [];

  constructor(
    private getpokemons: GetPokemonsUseCase,
    private getpokemonDetail: GetPokemonsDetailUseCase
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit() {
    this.get({ offset: 0 });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get(pageInfo: { offset: number }) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;
    this.subscription = this.getpokemons
      .execute({
        limit: this.page.size,
        offset: this.page.pageNumber * this.page.size,
      })
      .subscribe({
        next: (value) => {
          this.rows = value.results;
          this.page.totalElements = value.count;
          this.loading = false;
          this.getAll();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getAll() {
    this.subscription = this.getpokemons
      .execute({
        limit: this.page.totalElements,
        offset: 0,
      })
      .subscribe({
        next: (value) => {
          this.pokemons = value.results;
          this.pokemonsBuffer = this.pokemons.slice(0, this.bufferSize);
          this.countPokenmons(this.pokemons);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getDetail(name: string) {
    this.subscription = this.getpokemonDetail
      .execute({ name: name })
      .subscribe({
        next: (value) => {
          this.details = value as PokemonDetailModel;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  countPokenmons(pokemons: PokemonModel[]) {
    const letterCount: Record<string, number> = {};

    pokemons.forEach((pokemon) => {
      const firstLetter = pokemon.name.charAt(0).toUpperCase();
      if (letterCount[firstLetter]) {
        letterCount[firstLetter]++;
      } else {
        letterCount[firstLetter] = 1;
      }
    });

    this.pokemonList = Object.keys(letterCount).map((letter) => ({
      letter,
      count: letterCount[letter],
    }));
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll(arg: { start: number; end: number }) {
    if (
      this.loadingScroll ||
      this.pokemons.length <= this.pokemonsBuffer.length
    ) {
      return;
    }

    if (
      arg.end + this.numberOfItemsFromEndBeforeFetchingMore >=
      this.pokemonsBuffer.length
    ) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.pokemonsBuffer.length;
    const more = this.pokemons.slice(len, this.bufferSize + len);
    this.loadingScroll = true;
    setTimeout(() => {
      this.loadingScroll = false;
      this.pokemonsBuffer = this.pokemonsBuffer.concat(more);
    }, 200);
  }

  onSelect() {
    var name = this.selected[0].name;
    this.setDetail(name);
  }
  changeFn(val: any) {
    var name = val.name;
    this.setDetail(name);
  }

  setDetail(name: string) {
    this.empty = 'Cargando...';
    this.details = null;
    this.getDetail(name);
  }
}
