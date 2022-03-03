import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateFolderModalComponent } from '@modals/create-folder-modal/create-folder-modal.component';

describe('CreateFolderModalComponent', () => {
  let component: CreateFolderModalComponent;
  let fixture: ComponentFixture<CreateFolderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFolderModalComponent ],
      providers: [ { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFolderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
