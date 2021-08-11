import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { ConfigParams } from './../../shared/models/config-params';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;
  config: ConfigParams = {
    pagina: 0,
    limite: 4
  };
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder
  ) { }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));    
  }

  private resetarBusca(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.generos = ['Ação', 'Aventura', 'Ficção científica', 'Romance', 'Terror'];

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((valor: string) => {
      this.config.pesquisa = valor;
      this.resetarBusca();
    });

    this.filtrosListagem.get('genero').valueChanges.subscribe((valor: string) => {
      this.config.campo = { tipo: 'genero', valor };
      this.resetarBusca();
    });

    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }
}
