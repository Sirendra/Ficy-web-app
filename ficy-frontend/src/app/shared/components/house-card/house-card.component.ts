import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { House } from '../../../common/interfaces/house.interface';

@Component({
  selector: 'app-house-card',
  imports: [CommonModule],
  templateUrl: './house-card.component.html',
})
export class HouseCardComponent {
  @Input() house!: House;
  @Input() index!: number;
}
