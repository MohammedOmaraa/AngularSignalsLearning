import { Component, signal } from '@angular/core';

import { MatTab, MatTabGroup } from '@angular/material/tabs';

type Counter = {
  value: number;
};
@Component({
  standalone: true,
  selector: 'home',
  imports: [MatTabGroup, MatTab],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  counter = signal<Counter>({ value: 10 });

  increment() {
    // use default change detection
    // ❌ this work successfully but don't use this
    this.counter().value++;

    console.log(this.counter().value);

    // ✅ use signal-based change detection (Better Way)
    this.counter.update((counter) => {
      return { ...counter, value: counter.value + 1 };
    });
  }
}
