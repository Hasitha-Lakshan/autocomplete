import { Component, OnDestroy, OnInit } from '@angular/core';

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

  asyncOptions = { label_field: 'title', description_field: 'country', value_field: 'value', check_field: 'isActive', placeholder: 'Type to begin searching' };
  syncOptions = { label_field: 'title', description_field: '', value_field: 'value', check_field: 'isActive', placeholder: 'Type to begin searching' };

  asyncSuggestions: any[] = [
    { title: '🇸🇦 Saudi Riyal', country: 'Country: SAR', value: { name: 'SAR', type: 'coin' }, isActive: true },
    { title: 'lk Rupees', country: 'Country: Sri Lanka', value: { name: 'LK', type: 'coin' }, isActive: false },
    { title: 'lk Rupees', country: 'Country: Sri Lanka', value: { name: 'PL', type: 'coin' }, isActive: true }
  ];

  syncSuggestions: any[] = [
    { title: '🇸🇦 Saudi Riyal', country: 'Country: SAR', value: { name: 'SAR', type: 'coin' }, isActive: true },
    { title: 'lk Rupees', country: 'Country: Sri Lanka', value: { name: 'LK', type: 'coin' }, isActive: false },
    { title: 'lk Rupees', country: 'Country: Sri Lanka', value: { name: 'PL', type: 'coin' }, isActive: true },
    { title: '🇸🇦 Saudi Riyal', country: 'Country: SAR', value: { name: 'SAR', type: 'coin' }, isActive: true },
    { title: 'lk Rupees', country: 'Country: Sri Lanka', value: { name: 'LK', type: 'coin' }, isActive: false },
    { title: 'lk Rupees', country: 'Country: Sri Lanka', value: { name: 'PL', type: 'coin' }, isActive: true }
  ];

  constructor() { }

  ngOnInit(): void { }

  searchByText(searchedKey: string) {
    this.asyncIsLoading = true;
    setTimeout(() => {
      this.asyncSuggestions = [{ title: 'lk Rupees', country: 'Country: Sri Lanka', value: { name: 'PL', type: 'coin' }, isActive: true }];
      this.asyncIsLoading = false;
    }, 1000);
  }

  getResults(value: any[]) {
    console.log(value);
  }

  ngOnDestroy(): void {

  }

}
