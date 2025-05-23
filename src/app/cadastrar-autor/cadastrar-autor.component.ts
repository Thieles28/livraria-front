import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivrariaService } from '../service/livraria.service';
import { Autor } from '../model/autor';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cadastrar-livro',
  templateUrl: './cadastrar-autor.component.html',
  styleUrls: ['./cadastrar-autor.component.scss'],
})
export class CadastrarAutorComponent implements OnInit {
  declare id: number;
  declare autorForm: FormGroup;
  mensagem: boolean = false;
  autores: Autor[] = new Array<Autor>();
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
    this.consultarAutor();
    this.listarAutor();
  }

  initializeForm() {
    this.autorForm = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  cadastrarAutor() {
    this.livrariaService.cadastrarAutor(this.autorForm.value).subscribe({
      next: (autor: Autor) => {
        if (autor) {
          this.showMessage(3000);
          this.resetForm();
        }
      },
      error: (erro) => {
        console.log('Error: ', erro);
        this._snackBar.open(
          'O autor informado já está cadastrado. Por favor, utilize um nome diferente.',
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
    Object.keys(this.autorForm.controls).forEach((key) => {
      const control = this.autorForm.get(key);
      this.resetControl(control);
    });
  }

  atualizarAutor() {
    if (this.autorForm.valid) {
      this.livrariaService.atualizarAutor(this.id, this.autorForm.value).subscribe({
        next: (autor: Autor) => {
          if (autor) {
            this.showMessage(3000);
            this.autorForm.patchValue(autor);
            this.router.navigate(['/autores']);
          }
        },
        error: (erro) => {
          console.log('Error: ', erro);
          this._snackBar.open(
            'O autor informado já está cadastrado. Por favor, utilize um nome diferente.',
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

  private async consultarAutor(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id !== null) {
        this.id = parseInt(id, 10);
        this.autorForm.patchValue(
          await firstValueFrom(this.livrariaService.consultarAutor(this.id))
        );
      }
    });
  }
}
