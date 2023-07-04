import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone : true,
  imports : [CommonModule],
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css']
})
export class DetailListComponent {
  @Input() details?: any;

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isArray(value: object): boolean {
    return Array.isArray(value);
  }

  isObject(item: any): boolean {
    return typeof item === 'object';
  }
}
