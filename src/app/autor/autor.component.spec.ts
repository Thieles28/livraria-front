import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorComponent } from './autor.component';

describe('AutorComponent', () => {
  let component: AutorComponent;
  let fixture: ComponentFixture<AutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutorComponent],
    });
    fixture = TestBed.createComponent(AutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
