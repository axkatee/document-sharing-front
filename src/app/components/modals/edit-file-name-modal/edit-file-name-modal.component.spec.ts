import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFileNameModalComponent } from './edit-file-name-modal.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('EditFileNameModalComponent', () => {
  let component: EditFileNameModalComponent;
  let fixture: ComponentFixture<EditFileNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFileNameModalComponent ],
      providers: [ { provide: MatDialogRef, useValue: {} } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFileNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
