import { RenderMode, ServerRoute } from '@angular/ssr';
import * as fs from 'fs';
import * as path from 'path';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'task-form/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      try {
        const dbPath = path.join(process.cwd(), 'db.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        return db.tasks.map((task: any) => ({ id: task.id.toString() }));
      } catch {
        return [];
      }
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
