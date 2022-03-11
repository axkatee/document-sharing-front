import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFileContentComponent } from './text-file-content.component';

describe('TextFileContentComponent', () => {
  let component: TextFileContentComponent;
  let fixture: ComponentFixture<TextFileContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextFileContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFileContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
