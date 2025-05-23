import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrariaService } from '../service/livraria.service';
import { Autor } from '../model/autor';
import { Genero } from '../model/genero';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cadastrar-livro',
  templateUrl: './cadastrar-genero.component.html',
  styleUrls: ['./cadastrar-genero.component.scss'],
})
export class CadastrarGeneroComponent implements OnInit {
  declare id: number;
  declare generoForm: FormGroup;
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

  ngOnInit(): void {
    this.initializeForm();
    this.consultarGenero();
    this.listarGenero();
  }

  initializeForm() {
    this.generoForm = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  cadastrarGenero() {
    this.livrariaService.cadastrarGenero(this.generoForm.value).subscribe({
      next: (genero: Genero) => {
        if (genero) {
          this.showMessage(3000);
          this.resetForm();
        }
      },
      error: (erro) => {
        this._snackBar.open(
          'O gênero informado já está cadastrado. Por favor, utilize um nome diferente.',
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
    Object.keys(this.generoForm.controls).forEach((key) => {
      const control = this.generoForm.get(key);
      this.resetControl(control);
    });
  }

  atualizarGenero() {
    if (this.generoForm.valid) {
      this.livrariaService.atualizarGenero(this.id, this.generoForm.value).subscribe({
        next: (genero: Genero) => {
          if (genero) {
            this.showMessage(3000);
            this.generoForm.patchValue(genero);
            this.router.navigate(['/livros']);
          }
        },
        error: (erro) => {
          this._snackBar.open(
            'O gênero informado já está cadastrado. Por favor, utilize um nome diferente.',
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
  }

  showMessage(duration: number): void {
    this.mensagem = true;

    setTimeout(() => {
      this.mensagem = false;
    }, duration);
  }

  listarGenero() {
    this.livrariaService.listarGenero().subscribe({
      next: (genero: Genero[]) => {
        if (genero) {
          this.generos = genero;
        }
      },
      error: (erro) => {
        console.error('Erro ao retornar generos:', erro);
      },
    });
  }

  private async consultarGenero(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id !== null) {
        this.id = parseInt(id, 10);
        this.generoForm.patchValue(
          await firstValueFrom(this.livrariaService.consultarGenero(this.id))
        );
      }
    });
  }
}
