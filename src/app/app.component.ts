import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Options } from './shared/models/auto-complete-model';
import { ProductService } from './shared/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  asyncIsLoading: boolean = false;
  syncIsLoading: boolean = false;
  isAsync_1: boolean = true;
  isAsync_2: boolean = false;
  results: any[] = [];
  subscriptions: Subscription[] = [];
  asyncSuggestions: any[] = [];
  syncSuggestions: any[] = [];

  asyncOptions: Options = {
    label_field: 'title',
    description_field: 'brand',
    value_field: 'data',
    check_field: 'active',
    placeholder: 'Type to begin searching'
  }

  syncOptions: Options = {
    label_field: 'title',
    description_field: '',
    value_field: 'data',
    check_field: 'active',
    placeholder: 'Type to begin searching'
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllProductsOfSyncSearch();
  }

  /**
   * This function will trigger api calls according to the searched key
   * @param searchedKey : input key from the auto-complete
   */
  searchByText(searchedKey: string) {
    if (searchedKey) {
      this.getProductsByName(searchedKey);
    } else {
      this.getAllProducts();
    }
  }

  /**
   * Async related
   * This function will get all the product from the API end-point
   */
  getAllProducts() {
    this.asyncIsLoading = true;
    this.subscriptions.push(this.productService.getAllProducts().subscribe(response => {
      if (response) {
        this.asyncSuggestions = response;
      } else {
        this.asyncSuggestions = []
      }
      this.asyncIsLoading = false;
    }, error => {
      this.asyncSuggestions = [];
      this.asyncIsLoading = false;
      console.error(error);
    }
    ));
  }

  /**
   * Async related
   * This function will get the products from the API end-point using search key
   * @param searchedKey : input key
   */
  getProductsByName(searchedKey: string) {
    this.asyncIsLoading = true;
    this.subscriptions.push(this.productService.getAllProductsByName(searchedKey).subscribe(response => {
      if (response) {
        this.asyncSuggestions = response;
      } else {
        this.asyncSuggestions = []
      }
      this.asyncIsLoading = false;
    }, error => {
      this.asyncSuggestions = [];
      this.asyncIsLoading = false;
      console.error(error);
    }
    ));
  }

  /**
   * Sync related
   * This function will get all the product from the API end-point
   */
  getAllProductsOfSyncSearch() {
    this.syncIsLoading = true;
    this.subscriptions.push(this.productService.getAllProducts().subscribe(response => {
      if (response) {
        this.syncSuggestions = response;
      } else {
        this.syncSuggestions = []
      }
      this.syncIsLoading = false;
    }, error => {
      this.syncSuggestions = [];
      this.syncIsLoading = false;
      console.error(error);
    }
    ));
  }

  /**
   * This function will get the selected search results from the auto-complete
   * @param value : results
   */
  getResults(value: any[]) {
    console.log(value);
  }

  ngOnDestroy(): void {
    // unsubscribe subscription to prevent memory leaks
    if (this.subscriptions.length) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

}
