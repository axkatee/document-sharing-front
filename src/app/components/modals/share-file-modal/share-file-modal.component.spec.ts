import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareFileModalComponent } from '@modals/share-file-modal/share-file-modal.component';

describe('ShareFileModalComponent', () => {
  let component: ShareFileModalComponent;
  let fixture: ComponentFixture<ShareFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareFileModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
