import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  env = environment;
  http = inject(HttpClient);

  async loadAllCourses(): Promise<Course[]> {
    const courses$ = this.http.get<GetCoursesResponse>(
      `${this.env.apiRoot}/courses`
    );

    const response = await firstValueFrom(courses$);
    return response.courses;
  }
}
