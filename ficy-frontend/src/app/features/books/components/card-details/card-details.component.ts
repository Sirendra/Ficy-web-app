import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-card-detail',
  imports: [CommonModule],
  templateUrl: './card-details.component.html',
})
export class CardDetailComponent {
  @Input() property!: string;
  @Input() value: any | undefined;
  @Input() index!: number;
}
