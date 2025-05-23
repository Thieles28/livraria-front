import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAutorComponent } from './dialog-autor.component';

describe('DialogAutorComponent', () => {
  let component: DialogAutorComponent;
  let fixture: ComponentFixture<DialogAutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAutorComponent],
    });
    fixture = TestBed.createComponent(DialogAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
