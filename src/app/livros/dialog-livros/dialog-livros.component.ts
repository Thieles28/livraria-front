import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Livro } from 'src/app/model/livro';
import { LivrariaService } from 'src/app/service/livraria.service';

@Component({
  selector: 'app-dialog-autor',
  templateUrl: './dialog-livros.component.html',
  styleUrls: ['./dialog-livros.component.scss'],
})
export class DialogLivrosComponent implements OnInit {
  declare livro: Livro;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { livroId: number },
    private livrariaService: LivrariaService
  ) {}

  ngOnInit(): void {
    this.consultarLivro();
  }

  consultarLivro() {
    if (this.data.livroId != null) {
      this.livrariaService.consultarLivro(this.data.livroId).subscribe((livro: Livro) => {
        this.livro = livro;
      });
    }
  }
}
