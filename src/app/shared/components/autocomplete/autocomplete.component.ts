import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { cloneDeep } from "lodash"
import { debounceTime, Subscription } from 'rxjs';
import { createPopper } from '@popperjs/core';
import { Options } from '../../models/auto-complete-model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnDestroy, AfterViewInit {

  searchInput: FormControl = new FormControl();
  subscription: Subscription = new Subscription();
  suggestionList: any[] = [];
  selectedItems: any[] = [];
  isDisplaySuggestions: boolean = false;
  cursorIndex: number = -1;

  @Input() isLoading: boolean = false;
  
  @Input() options: Options = {
    label_field: '',
    description_field: '',
    value_field: '',
    check_field: '',
    placeholder: ''
  };

  @Input() set suggestions(value: any[]) {
    if (value) {
      this.suggestionList = cloneDeep(value);
    }
  }

  private ASYNC: boolean = false;
  @Input() set async(value: boolean) {
    if (value) {
      this.ASYNC = value;
      this.asyncSearch();
    }
  }

  get async() {
    return this.ASYNC;
  }

  @Output() completeMethod: EventEmitter<string> = new EventEmitter();
  @Output() results: EventEmitter<any[]> = new EventEmitter();
  @ViewChild('ref') private ref: any;

  @HostListener('document:click', ['$event'])
  clickCheck(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.isDisplaySuggestions = true;
    } else {
      this.cursorIndex = -1;
      this.isDisplaySuggestions = false;
    }
  }

  constructor(private eRef: ElementRef) {
    eRef = this.ref;
  }

  ngAfterViewInit(): void {
    // set the drop-down positions
    const reference = document.querySelector('#search') as HTMLElement;
    const popper = document.querySelector('#drop-down') as HTMLElement;

    createPopper(reference, popper, {
      placement: 'bottom',
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top', 'bottom'],
          },
        },
      ],
    });
  }

  ngOnInit(): void { }

  /**
   * This function use to get the selected items from the list
   * @param item : selected item
   * @param isChecked : checkbox value
   */
  getSelectedItems(item: any, isChecked: boolean) {
    const index = this.selectedItems.findIndex(value => JSON.stringify(item) === JSON.stringify(value));
    if (isChecked) {
      if (index === -1) {
        this.selectedItems.push(item);
      }
    } else {
      this.selectedItems.splice(index, 1);
    }
    this.results.emit(this.selectedItems);
  }

  /**
   * This function will handle keyboard interaction 
   * @param event : key events
   */
  selectByKeys(event: any) {
    switch (event.code) {
      case 'ArrowUp':
        this.isDisplaySuggestions = true;
        if (this.cursorIndex > 0) {
          this.cursorIndex--;
        }
        break;
      case 'ArrowDown':
        this.isDisplaySuggestions = true;
        if (this.cursorIndex < (this.suggestionList.length - 1)) {
          this.cursorIndex++;
        }
        break;
      case 'Enter':
        if (this.cursorIndex > -1 && this.suggestionList[this.cursorIndex][this.options.check_field]) {
          this.suggestionList[this.cursorIndex].selected = !this.suggestionList[this.cursorIndex].selected;
          this.getSelectedItems(this.suggestionList[this.cursorIndex], this.suggestionList[this.cursorIndex].selected);
        }
        break;
      case 'Escape':
        this.cursorIndex = -1;
        this.isDisplaySuggestions = false;
        break;
      default:
        break;
    }
  }

  /**
   * This function will debounce and emit the searched keyword
   */
  asyncSearch() {
    this.isLoading = true;
    this.subscription = this.searchInput.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((value) => {
      this.completeMethod.emit(value);
    });
  }

  ngOnDestroy(): void {
    // unsubscribe subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
