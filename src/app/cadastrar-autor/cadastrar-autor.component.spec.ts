import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarAutorComponent } from './cadastrar-autor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LivrariaService } from '../service/livraria.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CadastrarAutorComponent', () => {
  let component: CadastrarAutorComponent;
  let fixture: ComponentFixture<CadastrarAutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      declarations: [CadastrarAutorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: LivrariaService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(CadastrarAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter o formulário inválido se campo estiver vazio', () => {
    component.autorForm.setValue({ nome: '' });
    expect(component.autorForm.invalid).toBeTrue();
  });
});
