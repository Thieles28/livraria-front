import { ComponentFixture, TestBed } from '@angular/core/testing';

import { livrosComponent } from './livros.component';

describe('autorComponent', () => {
  let component: livrosComponent;
  let fixture: ComponentFixture<livrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [livrosComponent],
    });
    fixture = TestBed.createComponent(livrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
