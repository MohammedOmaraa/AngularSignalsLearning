import { inject } from '@angular/core';
import { Component, signal } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

@Component({
  standalone: true,
  selector: 'home',
  imports: [MatTabGroup, MatTab],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  courses = signal<Course[]>([]);

  coursesService = inject(CoursesService);

  constructor() {
    this.loadCourses().then(() =>
      console.log(`All courses loaded:`, this.courses())
    );
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.courses.set(courses);
    } catch (err) {
      alert(`Error loading Courses!`);
      console.error(err);
    }
  }
}
