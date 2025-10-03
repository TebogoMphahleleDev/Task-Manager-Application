import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TaskService, Task } from '../../services/task';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskList],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  tasks: Task[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private taskService: TaskService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTasks();
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        if (event.url === '/dashboard') {
          this.loadTasks();
        }
      });
    }
  }

  ngOnDestroy(): void {
  }

  loadTasks(): void {
    this.isLoading = true;
    this.error = null;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tasks';
        this.isLoading = false;
      }
    });
  }

  getTasksByStatus(status: string): Task[] {
    const filtered = this.tasks.filter(task => task.status === status);
    console.log(`Filtered tasks for status "${status}":`, filtered);
    return filtered;
  }

  onTaskMoved(event: { task: Task; newStatus: string }): void {
    const updatedTask = { ...event.task, status: event.newStatus };
    this.taskService.updateTask(updatedTask.id, updatedTask).subscribe(() => {
      this.loadTasks();
    });
  }

  onAdd(): void {
    this.router.navigate(['/task-form']);
  }

  onEdit(id: number | string): void {
    this.router.navigate(['/task-form', id]);
  }

  onDelete(id: number | string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }
}
