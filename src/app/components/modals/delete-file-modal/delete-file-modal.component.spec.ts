import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteFileModalComponent } from './delete-file-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

describe('DeleteFileModalComponent', () => {
  let component: DeleteFileModalComponent;
  let fixture: ComponentFixture<DeleteFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFileModalComponent ],
      providers: [ { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
