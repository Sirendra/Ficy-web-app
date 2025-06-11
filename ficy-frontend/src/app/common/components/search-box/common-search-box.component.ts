import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-common-search',
  templateUrl: './common-search-box.component.html',
  imports: [CommonModule, FormsModule],
})
export class CommonSearchBoxComponent implements OnDestroy {
  searchTerm = '';
  @Input() placeHolder = 'Search ...';
  @Input() isCoponentDestroyed = false;
  @Output() searchChanged = new EventEmitter<string>();

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm: string) => this.onSearchTermChanged(searchTerm));
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.searchSubject.next(value);
    this.searchTerm = value;
  }

  clearSearch() {
    this.searchSubject.next('');
    this.searchTerm = '';
  }

  onSearchTermChanged(term: string) {
    this.searchChanged.emit(term);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
