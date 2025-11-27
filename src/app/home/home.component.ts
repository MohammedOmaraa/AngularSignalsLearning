import { afterNextRender, effect, inject, Injector } from '@angular/core';
import { Component, computed, signal } from '@angular/core';

import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  standalone: true,
  selector: 'home',
  imports: [MatTabGroup, MatTab],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  injector = inject(Injector);
  //  error when create effect at runtime this lead to memory leak
  //  so passing injector to handle memory
  constructor() {
    afterNextRender(() => {
      effect(
        () => {
          console.log(`counter value: ${this.counter()}`);
        },
        { injector: this.injector }
      );
    });
  }

  counter = signal(0);

  increment() {
    this.counter.update((c) => c + 1);
  }
}
