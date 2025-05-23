import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAutorComponent } from './cadastrar-autor.component';

describe('CadastrarAutorComponent', () => {
  let component: CadastrarAutorComponent;
  let fixture: ComponentFixture<CadastrarAutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarAutorComponent],
    });
    fixture = TestBed.createComponent(CadastrarAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
