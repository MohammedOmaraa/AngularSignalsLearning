import { Component, signal } from '@angular/core';

import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  standalone: true,
  selector: 'home',
  imports: [MatTabGroup, MatTab],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  counter = signal(10);
  counterSignalReadonly = signal(10).asReadonly();
  increment() {
    this.counter.set(this.counter());
    this.counter.update((current) => current + 1);

    // Error
    // this.counterSignalReadonly.set(this.counter())
    // this.counterSignalReadonly.update((current) => current + 1);
  }
}
