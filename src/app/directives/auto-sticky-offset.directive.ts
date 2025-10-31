import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[appAutoStickyOffset]'
})
export class AutoStickyOffsetDirective implements AfterViewInit, OnDestroy {
  private observer!: MutationObserver;
  private resizeListener!: () => void;
  private rafId: number | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.applyStickyStyles();
    this.updateOffset();

    // Watch the top toolbar for any height change (filters open/close)
    const topToolbar = document.querySelector('#kt_app_toolbar') as HTMLElement | null;
    if (topToolbar) {
      this.observer = new MutationObserver(() => this.updateOffset());
      this.observer.observe(topToolbar, { childList: true, subtree: true, attributes: true });
    }

    // Also respond to window resizes
    this.resizeListener = this.renderer.listen('window', 'resize', () => this.updateOffset());
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
    if (this.resizeListener) this.resizeListener();
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private applyStickyStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'sticky');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '1055');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'top 0.25s ease');
    this.renderer.setStyle(this.el.nativeElement, 'background', '#fff');
  }

  /** Measure toolbar height and apply it as top offset */
  private updateOffset(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => {
      const toolbar = document.querySelector('#kt_app_toolbar') as HTMLElement | null;
      const toolbarHeight = toolbar ? toolbar.getBoundingClientRect().height : 0;

      this.renderer.setStyle(this.el.nativeElement, 'top', `${toolbarHeight}px`);
    });
  }
}
