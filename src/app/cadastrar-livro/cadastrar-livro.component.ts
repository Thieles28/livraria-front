import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrariaService } from '../service/livraria.service';
import { Livro } from '../model/livro';
import { firstValueFrom } from 'rxjs';
import { Autor } from '../model/autor';
import { Genero } from '../model/genero';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-livro',
  templateUrl: './cadastrar-livro.component.html',
  styleUrls: ['./cadastrar-livro.component.scss'],
})
export class CadastrarLivroComponent implements OnInit {
  declare id: number;
  declare livrariaForm: FormGroup;
  mensagem: boolean = false;
  autores: Autor[] = new Array<Autor>();
  generos: Genero[] = new Array<Genero>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private livrariaService: LivrariaService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  get autor(): FormControl {
    return this.livrariaForm.get('autor') as FormControl;
  }

  get genero(): FormControl {
    return this.livrariaForm.get('genero') as FormControl;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.consultarLivro();
    this.listarAutor();
    this.listarGenero();
  }

  initializeForm() {
    this.livrariaForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }

  cadastrarLivro() {
    this.livrariaService.cadastrarLivro(this.mapearLivroParaEnvio()).subscribe({
      next: (livro: Livro) => {
        if (livro) {
          this.showMessage(3000);
          this.resetForm();
        }
      },
      error: (erro) => {
        this._snackBar.open(
          'Já existe um livro com o mesmo título, autor e gênero cadastrado.',
          'Fechar',
          {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          }
        );
      },
    });
  }

  resetControl(control: AbstractControl | null) {
    if (control) {
      control.setValue(null);
      control.clearValidators();
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
  }

  resetForm() {
    Object.keys(this.livrariaForm.controls).forEach((key) => {
      const control = this.livrariaForm.get(key);
      this.resetControl(control);
    });
  }

  atualizarLivro() {
    if (this.livrariaForm.valid) {
      this.livrariaService.atualizarLivro(this.id, this.mapearLivroParaEnvio()).subscribe({
        next: (livro: Livro) => {
          if (livro) {
            this.showMessage(3000);
            this.livrariaForm.patchValue(livro);
            this.router.navigate(['/livros']);
          }
        },
        error: (erro) => {
          this._snackBar.open('Já existe um livro com o mesmo título, autor e gênero.', 'Fechar', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      });
    }
  }

  showMessage(duration: number): void {
    this.mensagem = true;

    setTimeout(() => {
      this.mensagem = false;
    }, duration);
  }

  listarAutor() {
    this.livrariaService.listarAutor().subscribe({
      next: (autor: Autor[]) => {
        if (autor) {
          this.autores = autor;
        }
      },
      error: (erro) => {
        console.error('Erro ao retornar livros:', erro);
      },
    });
  }

  listarGenero() {
    this.livrariaService.listarGenero().subscribe({
      next: (genero: Genero[]) => {
        if (genero) {
          this.generos = genero;
        }
      },
      error: (erro) => {
        console.error('Erro ao retornar livros:', erro);
      },
    });
  }

  private mapearLivroParaEnvio(): Livro {
    const formValue = this.livrariaForm.value;
    return {
      titulo: formValue.titulo,
      autorId: formValue.autor?.id ?? null,
      generoId: formValue.genero?.id ?? null,
    };
  }

  private async consultarLivro(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id !== null) {
        this.id = parseInt(id, 10);

        const [autores, generos] = await Promise.all([
          firstValueFrom(this.livrariaService.listarAutor()),
          firstValueFrom(this.livrariaService.listarGenero()),
        ]);

        this.autores = autores;
        this.generos = generos;

        const livro = await firstValueFrom(this.livrariaService.consultarLivro(this.id));

        const autor = this.autores.find((a) => a.nome === livro.autor) ?? null;
        const genero = this.generos.find((g) => g.nome === livro.genero) ?? null;

        this.livrariaForm.patchValue({
          titulo: livro.titulo,
          autor: autor,
          genero: genero,
        });
      }
    });
  }
}
