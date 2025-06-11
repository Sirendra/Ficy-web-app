import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Character } from '../../../common/interfaces/character.interface';

@Component({
  selector: 'app-character-card',
  imports: [CommonModule],
  templateUrl: './character-card.component.html',
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Input() index!: number;
}
