import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGeneroComponent } from './dialog-genero.component';

describe('DialogGeneroComponent', () => {
  let component: DialogGeneroComponent;
  let fixture: ComponentFixture<DialogGeneroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogGeneroComponent],
    });
    fixture = TestBed.createComponent(DialogGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
