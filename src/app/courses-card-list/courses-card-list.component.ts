import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../models/course.model';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'courses-card-list',
  imports: [RouterLink],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
  courses = input.required<Course[]>({ alias: 'data' });

  courseUpdated = output<Course>();

  courseDeleted = output<string>();

  dialog = inject(MatDialog);

  async onEditCourse(course: Course) {
    if (!course) {
      return;
    }

    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'update',
      title: 'Update Existing Course',
      course,
    });

    console.log(`Course edited:`, newCourse);
    this.courseUpdated.emit(newCourse);
  }

  onDeleteCourse(course: Course) {
    this.courseDeleted.emit(course.id);
  }
}
