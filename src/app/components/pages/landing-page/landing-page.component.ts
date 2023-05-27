import {Component} from '@angular/core';
import {SearchResultDto} from '../../../dtos/SearchResultDto';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  queryParams: string = '';
  searchResults: SearchResultDto[] = [];

  search(queryParams: string) {
    this.searchResults.push({
      title: queryParams,
    });
  }
}
