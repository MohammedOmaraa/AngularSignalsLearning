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
  counter = signal(0);

  tenXCounter = computed(() => {
    const value = this.counter();
    // this line make error as infinity loop
    // weird situation 100 x counter depends on ten x counter, but ten x counter also depends on 100 x counter.
    //❌ this.hundredXCounter();
    return value * 10;
  });

  hundredXCounter = computed(() => {
    const value = this.tenXCounter();
    return value * 10;
  });

  increment() {
    this.counter.update((c) => c + 1);
  }
}
