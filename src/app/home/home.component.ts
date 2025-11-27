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
  values = signal<number[]>([10, 20, 30]);

  append() {
    // use default change detection
    // ❌ this work successfully but don't use this
    // const values = this.values();
    // const last = values[values.length - 1];
    // values.push(last + 10);

    //  -----------------------------------------------

    this.values.update((values) => {
      // use default change detection
      // ❌ this work successfully but don't use this

      //   values.push(values[values.length - 1] + 10);
      //   return values;

      // ✅ use signal-based change detection (Better Way)

      return [...values, values[values.length - 1] + 10];
    });
  }
}
