import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  env = environment;

  private readonly userSignal = signal<User | null>(null);

  user = this.userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  http = inject(HttpClient);

  async login(email: string, password: string): Promise<User> {
    const login$ = this.http.post<User>(`${this.env.apiRoot}/login`, {
      email,
      password,
    });
    const user = await firstValueFrom(login$);
    this.userSignal.set(user);
    return user;
  }
}
