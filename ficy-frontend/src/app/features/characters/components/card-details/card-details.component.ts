import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IsArrayPipe } from '../../../../shared/pipe/isArray.pipe';

@Component({
  selector: 'app-character-card-detail',
  imports: [CommonModule, IsArrayPipe],
  templateUrl: './card-details.component.html',
})
export class CardDetailComponent {
  @Input() property!: string;
  @Input() value: any | undefined;
  @Input() index!: number;
}
