import {
  afterNextRender,
  effect,
  EffectRef,
  inject,
  Injector,
} from '@angular/core';
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
  effectRef: EffectRef | null = null;

  constructor() {
    this.effectRef = effect((onCleanup) => {
      // ❌ not work
      //   setTimeout(() => {
      //     console.log(`counter value: ${this.counter()}`);
      //   }, 1000);

      // ✅
      const value = this.counter(); // link signal with effect

      const timeout = setTimeout(() => {
        console.log(`counter value: ${value}`);
      }, 1000);

      onCleanup(() => {
        console.log('Calling clean up');
        clearTimeout(timeout);
      });
    });
  }

  counter = signal(0);

  increment() {
    this.counter.update((c) => c + 1);
  }

  cleanup() {
    this.effectRef?.destroy();
  }
}
