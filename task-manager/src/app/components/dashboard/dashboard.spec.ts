import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TaskService, Task } from '../../services/task';
import { Router } from '@angular/router';
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
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private taskService: TaskService, 
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.isLoading = true;
    this.error = null;
    
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('Tasks loaded:', tasks);
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.error = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onTaskMoved(event: { task: Task; newStatus: string }): void {
    const updatedTask = { ...event.task, status: event.newStatus };
    this.taskService.updateTask(updatedTask.id, updatedTask).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error updating task:', error);
        this.error = 'Failed to update task. Please try again.';
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['/task-form']);
  }

  onEdit(id: number | string): void {
    this.router.navigate(['/task-form', id]);
  }

  onDelete(id: number | string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.error = 'Failed to delete task. Please try again.';
        }
      });
    }
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  getStatusCount(status: string): number {
    return this.getTasksByStatus(status).length;
  }
}