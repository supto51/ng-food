import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appLottiePlayer]',
})
export class LottiePlayerDirective implements OnInit {
  public observe = {} as IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.animateIcon();
  }

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: {
    target: Element;
  }) {
    const player: any = event.target.querySelector('lottie-player');
    player.play();
  }

  animateIcon() {
    this.observe = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const child = this.el.nativeElement.querySelectorAll('lottie-player');
          child.forEach((player: any) => {
            player.play(true);
          });
        }
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0,
      }
    );

    this.observe.observe(this.el.nativeElement.querySelector('lottie-player'));
  }
}
