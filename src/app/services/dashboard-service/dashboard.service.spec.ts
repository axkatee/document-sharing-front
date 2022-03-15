import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { EMPTY } from "rxjs";
import { DashboardService } from '@services/dashboard-service/dashboard.service';
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "@config";

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientTestingModule, MatSnackBarModule ]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have been called getFolderInfo()', () => {
    const spy = spyOn(service, 'getFolderInfo').and.returnValue(EMPTY);
    service.getFolderInfo(12345);
    expect(spy).toHaveBeenCalled();
  });

  it('should have been called createFolder()', () => {
    const spy = spyOn(service, 'createFolder').and.returnValue(EMPTY);
    service.createFolder('name');
    expect(spy).toHaveBeenCalled();
  });

  it('should have been called editFolderName()', () => {
    const spy = spyOn(service, 'editFolderName').and.returnValue(EMPTY);
    service.editFolderName('name', 12345);
    expect(spy).toHaveBeenCalled();
  });

  it('should have been called deleteFolder()', () => {
    const spy = spyOn(service, 'deleteFolder').and.returnValue(EMPTY);
    service.deleteFolder(12345);
    expect(spy).toHaveBeenCalled();
  });
});
