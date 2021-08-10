import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener, Inject,
  Output,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DOCUMENT } from "@angular/common";

@Directive({
  selector:
    '[contenteditable][formControlName],' +
    '[contenteditable][formControl],' +
    '[contenteditable][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContenteditableDirective),
      multi: true,
    },
  ],
})
export class ContenteditableDirective implements ControlValueAccessor, AfterViewInit {

  @Output() focusChange = new EventEmitter<boolean>();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private doc: Document
  ) {
  }

  ngAfterViewInit() {
  }

  @HostListener('focus')
  onFocus() {
    this.focusChange.emit(true);
  }

  @HostListener('input')
  onInput() {
    this.onChange(this.elementRef.nativeElement.innerHTML);
  }

  @HostListener('blur')
  onBlur() {
    this.focusChange.emit(false);
    this.onTouched();
  }

  setDisabledState(disabled: boolean) {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'contenteditable',
      String(!disabled),
    );
  }

  writeValue(value: string) {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      ContenteditableDirective.normalizeValue(value),
    );
  }

  private static normalizeValue(value: string | null): string {
    return value || '';
  }

  private onTouched = () => {
  };

  private onChange: (value: string) => void = () => {
  };

  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

}
