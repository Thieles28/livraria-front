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
import { DialogAutorComponent } from './dialog-autor/dialog-autor.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Autor } from '../model/autor';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss'],
})
export class AutorComponent implements AfterViewInit {
  displayedColumns: string[] = ['autor', 'acoes'];
  declare autor: Array<Autor>;
  dataSource = new MatTableDataSource<Autor>();

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
    this.listarAutor();
  }

  listarAutor() {
    this.livrariaService.listarAutor().subscribe({
      next: (autor: Autor[]) => {
        if (autor) {
          this.dataSource.data = autor;
        }
      },
      error: (erro) => {
        console.error('Erro ao retornar autores:', erro);
      },
    });
  }

  visualizarAutor(id: Number) {
    const dialogRef = this.dialog.open(DialogAutorComponent, {
      data: { autorId: id },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  atualizarAutor(id: Number) {
    this.router.navigate(['/atualizarAutor', id]);
  }

  removerAutor(id: Number) {
    this.livrariaService.removerAutor(id).subscribe({
      next: () => {
        this._snackBar.open('Autor removido com sucesso!', 'Fechar', {
          panelClass: 'success-snackbar',
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.listarAutor();
      },
      error: (err) => {
        this._snackBar.open(
          'Não é possível remover este autor, pois há livros associados a ele.',
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
