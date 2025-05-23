import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Livro } from '../model/livro';
import { LivrariaService } from '../service/livraria.service';
import { DialogLivrosComponent } from './dialog-livros/dialog-livros.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss'],
})
export class livrosComponent implements AfterViewInit {
  displayedColumns: string[] = ['titulo', 'autor', 'genero', 'acoes'];
  declare livro: Array<Livro>;
  dataSource = new MatTableDataSource<Livro>();

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
    this.listarLivros();
  }

  listarLivros() {
    this.livrariaService.listarLivros().subscribe({
      next: (livros: Livro[]) => {
        if (livros) {
          this.dataSource.data = livros;
        }
      },
      error: (erro) => {
        console.error('Erro ao retornar livros:', erro);
      },
    });
  }

  visualizarLivros(id: Number) {
    const dialogRef = this.dialog.open(DialogLivrosComponent, {
      data: { livroId: id },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  atualizarLivro(id: Number) {
    this.router.navigate(['/atualizar', id]);
  }

  removerLivro(id: Number) {
    this.livrariaService.removerLivro(id).subscribe(() => {
      this._snackBar.open('Livro removido com sucesso!', 'Fechar', {
        panelClass: 'success-snackbar',
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.listarLivros();
    });
  }
}
