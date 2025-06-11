import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from '../../../common/interfaces/book.interface';

@Component({
  selector: 'app-book-card',
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
})
export class BookCardComponent {
  @Input() book!: Book;
  @Input() index!: number;
}
