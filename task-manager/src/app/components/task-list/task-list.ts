import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskList {
  @Input() status!: string;
  @Input() tasks: Task[] = [];
  @Output() taskMoved = new EventEmitter<{task: Task, newStatus: string}>();
  @Output() editTask = new EventEmitter<number | string>();
  @Output() deleteTask = new EventEmitter<number | string>();

  get filteredTasks(): Task[] {
    const filtered = this.tasks.filter(task => task.status === this.status);
    console.log(`Filtered tasks for status "${this.status}":`, filtered);
    return filtered;
  }

  get listId(): string {
    return this.status;
  }

  get connectedTo(): string[] {
    return ['todo', 'in-progress', 'done'].filter(id => id !== this.status);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      this.taskMoved.emit({ task, newStatus: this.status });
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onEdit(id: number | string): void {
    this.editTask.emit(id);
  }

  onDelete(id: number | string): void {
    this.deleteTask.emit(id);
  }
}
