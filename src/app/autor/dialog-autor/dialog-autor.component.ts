import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LivrariaService } from 'src/app/service/livraria.service';
import { Autor } from '../../model/autor';

@Component({
  selector: 'app-dialog-autor',
  templateUrl: './dialog-autor.component.html',
  styleUrls: ['./dialog-autor.component.scss'],
})
export class DialogAutorComponent implements OnInit {
  declare autor: Autor;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { generoId: number },
    private livrariaService: LivrariaService
  ) {}

  ngOnInit(): void {
    this.consultarAutor();
  }

  consultarAutor() {
    if (this.data.generoId != null) {
      this.livrariaService.consultarAutor(this.data.generoId).subscribe((autor: Autor) => {
        this.autor = autor;
      });
    }
  }
}
