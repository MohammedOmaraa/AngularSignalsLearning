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
export class HomeComponent {}
