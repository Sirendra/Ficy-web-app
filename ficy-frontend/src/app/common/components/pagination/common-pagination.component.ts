import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-pagination.component.html',
})
export class CommonPaginationComponent {
  @Input() totalPages = 1;
  @Input() currentPage = 1;

  @Output() pageChange = new EventEmitter<number>();

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
