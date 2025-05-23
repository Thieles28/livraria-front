import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LivrariaService } from 'src/app/service/livraria.service';
import { Genero } from '../../model/genero';

@Component({
  selector: 'app-dialog-autor',
  templateUrl: './dialog-genero.component.html',
  styleUrls: ['./dialog-genero.component.scss'],
})
export class DialogGeneroComponent implements OnInit {
  declare genero: Genero;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { generoId: number },
    private livrariaService: LivrariaService
  ) {}

  ngOnInit(): void {
    this.consultarGenero();
  }

  consultarGenero() {
    if (this.data.generoId != null) {
      this.livrariaService.consultarGenero(this.data.generoId).subscribe((genero: Genero) => {
        this.genero = genero;
      });
    }
  }
}
