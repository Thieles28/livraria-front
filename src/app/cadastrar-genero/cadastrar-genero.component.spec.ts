import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarGeneroComponent } from './cadastrar-genero.component';

describe('CadastrarGeneroComponent', () => {
  let component: CadastrarGeneroComponent;
  let fixture: ComponentFixture<CadastrarGeneroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarGeneroComponent],
    });
    fixture = TestBed.createComponent(CadastrarGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
