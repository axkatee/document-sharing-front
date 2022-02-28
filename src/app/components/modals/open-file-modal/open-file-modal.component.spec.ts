import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenFileModalComponent } from './open-file-modal.component';

describe('OpenFileModalComponent', () => {
  let component: OpenFileModalComponent;
  let fixture: ComponentFixture<OpenFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenFileModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
