import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFileNameModalComponent } from './edit-file-name-modal.component';

describe('EditFileNameModalComponent', () => {
  let component: EditFileNameModalComponent;
  let fixture: ComponentFixture<EditFileNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFileNameModalComponent ]
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
