import { Directive, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { DownloadService } from "@services/download-service/download.service";

@Directive({
  selector: '[download]',
  exportAs: 'wmDownload'
})
export class DownloadDirective implements OnDestroy {
  public error = false;
  public inProgress = false;

  private blob: string;
  private href: string;
  private readonly sameOrigin = new RegExp(`^data:|^blob:|^http(?:s)?:\/\/${window.location.host}`);

  constructor(
    private readonly downloadService: DownloadService,
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) { }

  @HostBinding('attr.download')
  @Input() download: string;

  @Input('href') set source(href: string) {
    if (this.blob) {
      URL.revokeObjectURL(this.blob);
      this.blob = undefined;
    }
    this.error = false;
    this.href = href;
  }

  @HostBinding('href') get safeHref(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.href);
  }

  @HostListener('click') onClick() {
    if (!this.href || this.inProgress) return false;
    if (this.error || this.sameOrigin.test(this.href)) return true;

    this.downloadService.download(this.href, this.blob).subscribe(url => {
      this.href = url;
      this.inProgress = false;
    });

    this.inProgress = true;
    return false;
  }

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.blob);
  }
}
