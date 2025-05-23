import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LivrariaService } from '../service/livraria.service';
import { DialogGeneroComponent } from './dialog-genero/dialog-genero.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Genero } from '../model/genero';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss'],
})
export class GeneroComponent implements AfterViewInit {
  displayedColumns: string[] = ['genero', 'acoes'];
  declare genero: Array<Genero>;
  dataSource = new MatTableDataSource<Genero>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private livrariaService: LivrariaService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.listarGenero();
  }

  listarGenero() {
    this.livrariaService.listarGenero().subscribe({
      next: (genero: Genero[]) => {
        if (genero) {
          this.dataSource.data = genero;
        }
      },
      error: (erro) => {
        console.error('Erro ao retornar generos:', erro);
      },
    });
  }

  visualizarGenero(id: Number) {
    const dialogRef = this.dialog.open(DialogGeneroComponent, {
      data: { generoId: id },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  atualizarGenero(id: Number) {
    this.router.navigate(['/atualizarGenero', id]);
  }

  removerGenero(id: Number) {
    this.livrariaService.removerGenero(id).subscribe({
      next: () => {
        this._snackBar.open('Gênero removido com sucesso!', 'Fechar', {
          panelClass: 'success-snackbar',
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.listarGenero();
      },
      error: (err) => {
        this._snackBar.open(
          'Não é possível remover este gênero, pois há livros associados a ele.',
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
