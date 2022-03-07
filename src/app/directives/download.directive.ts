import { Directive, OnDestroy } from '@angular/core';

@Directive({
  selector: '[download]',
  exportAs: 'wmDownload'
})
export class DownloadDirective implements OnDestroy {

  constructor() { }

  ngOnDestroy(): void {
  }
}
