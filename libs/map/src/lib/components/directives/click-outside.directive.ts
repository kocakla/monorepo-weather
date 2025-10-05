import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutsideDirective]',
  standalone: true
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef) { }
  /**
   * Listen to global document click events.
   * We receive the full Event and then safely derive the target as a Node.
   */
  @HostListener('document:click', ['$event'])
   public onClick(event: Event): void {
    // event.target is EventTarget | null, cast it to Node for contains() check
    const target = event.target as Node | null;

    // If there is no target (very unlikely), treat it as outside click
    if (!target) {
      this.clickOutside.emit();
      return;
    }
    // Check if the click was inside the element
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.clickOutside.emit(); // Emit event if clicked outside
    }
  }
}
