import { computed, effect, inject } from '@angular/core';
import { Component, signal } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';

@Component({
  standalone: true,
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private courses = signal<Course[]>([]);

  biggenerCourses = computed(() =>
    this.courses().filter((c) => c.category == 'BEGINNER')
  );

  advancedCourses = computed(() =>
    this.courses().filter((c) => c.category == 'ADVANCED')
  );

  effectLog = effect(() => {
    console.log(`BeginnerCourses: `, this.biggenerCourses());
    console.log(`AdvancedCourses: `, this.advancedCourses());
  });

  coursesService = inject(CoursesService);

  dialog = inject(MatDialog);

  messagesService = inject(MessagesService);

  constructor() {
    this.loadCourses().then(() =>
      console.log(`All courses loaded:`, this.courses())
    );
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (err) {
      this.messagesService.showMessage(`Error loading Courses!`, 'error');
      console.error(err);
    }
  }

  onCourseUpdated(updatedCourse: Course) {
    const courses = this.courses();

    const newCourses = courses.map((course) =>
      course.id == updatedCourse.id ? updatedCourse : course
    );

    this.courses.set(newCourses);
  }

  async onCourseDeleted(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);
      const courses = this.courses();
      const newCourses = courses.filter((course) => course.id !== courseId);
      this.courses.set(newCourses);
    } catch (err) {
      alert(`Error deleting Courses!`);
      console.error(err);
    }
  }

  async onAddCourse() {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: 'create',
      title: 'Create New Course',
    });

    if (!newCourse) {
      return;
    }

    const newCourses = [...this.courses(), newCourse];
    this.courses.set(newCourses);
  }
}
