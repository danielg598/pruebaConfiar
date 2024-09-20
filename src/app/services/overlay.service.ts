import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  openOverlay(component:any): void {
    if (!this.overlayRef) {
      const overlayConfig: OverlayConfig = {
        hasBackdrop: true,
        backdropClass: 'custom-overlay-backdrop',
        // positionStrategy: this.overlay.position()
        //   .global()
        //   .top('0')
        //   .right('0'),
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      };


      this.overlayRef = this.overlay.create(overlayConfig);

      // const portal = new ComponentPortal(component);
      this.overlayRef.attach(component);

      this.overlayRef.backdropClick().subscribe(() => {
        this.closeOverlay();
      });
    }
  }

  closeOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }
}