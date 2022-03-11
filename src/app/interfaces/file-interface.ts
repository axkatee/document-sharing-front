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
  name: string,
  type: string,
  content: ArrayBuffer | string | SafeResourceUrl
}
