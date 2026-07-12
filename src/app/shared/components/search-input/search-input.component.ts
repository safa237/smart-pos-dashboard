import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() placeholder = 'Search';

  @Input() suggestions: string[] = [];

  @Output() search = new EventEmitter<string>();

  control = new FormControl('');

  filteredSuggestions: string[] = [];

  recentSearches: string[] = [];

  selectedIndex = -1;

  showDropdown = false;

  ngOnInit(): void {

    this.loadRecentSearches();

    this.control.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {

        const term = value ?? '';

        this.search.emit(term);

        this.filterSuggestions(term);

      });

  }

  filterSuggestions(term: string) {

    if (!term.trim()) {

      this.filteredSuggestions = [];

      this.showDropdown = true;

      return;

    }

    this.filteredSuggestions = this.suggestions
      .filter(x =>
        x.toLowerCase().includes(term.toLowerCase()))
      .slice(0, 6);

    this.showDropdown = true;

  }

  select(value: string) {

    this.control.setValue(value, { emitEvent: false });

    this.search.emit(value);

    this.saveRecentSearch(value);

    this.showDropdown = false;

  }

  onKeyDown(event: KeyboardEvent) {

    const list = this.control.value
      ? this.filteredSuggestions
      : this.recentSearches;

    if (!list.length) return;

    this.showDropdown = true;

    switch (event.key) {

      case 'ArrowDown':

        event.preventDefault();

        this.selectedIndex =
          (this.selectedIndex + 1) % list.length;

        break;

      case 'ArrowUp':

        event.preventDefault();

        this.selectedIndex =
          this.selectedIndex <= 0
            ? list.length - 1
            : this.selectedIndex - 1;

        break;

      case 'Enter':

        event.preventDefault();

        if (this.selectedIndex >= 0) {

          this.select(list[this.selectedIndex]);

        }

        break;

    }

  }

  saveRecentSearch(value: string) {

    this.recentSearches = [

      value,

      ...this.recentSearches.filter(x => x !== value)

    ].slice(0, 5);

    localStorage.setItem(
      'recent-products',
      JSON.stringify(this.recentSearches)
    );

  }

  loadRecentSearches() {

    this.recentSearches =
      JSON.parse(
        localStorage.getItem('recent-products') ?? '[]'
      );

  }

}