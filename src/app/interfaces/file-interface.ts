import { SafeResourceUrl } from '@angular/platform-browser';

export interface ITestFile {
  lastModified: number,
  lastModifiedDate: string,
  name: string,
  size: number,
  type: string,
  webkitRelativePath: string
}

export interface IFile {
  id: number,
  creatorId?: number,
  displayName: string,
  type: string,
  content?: ArrayBuffer | string | SafeResourceUrl
}
