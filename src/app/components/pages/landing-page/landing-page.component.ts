import {Component, OnInit} from '@angular/core';
import {SearchResultDto} from '../../../dtos/SearchResultDto';
import {CookiesNoticeService} from '../../../services/cookies-notice/cookies-notice.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  queryParams: string = '';
  searchResults: SearchResultDto[] = [];

  constructor(private cookiesNoticeService: CookiesNoticeService) {
  }


  ngOnInit() {
    this.cookiesNoticeService.triggerIfNotAccepted();
  }

  search(queryParams: string) {
    this.searchResults.push({
      title: queryParams,
    });
  }
}
