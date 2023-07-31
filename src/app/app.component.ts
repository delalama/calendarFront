import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HttpService} from "./service/http-service.service";
import {Person} from "./interface/Person";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'schedule';
  posts: Person;

  constructor(private translate: TranslateService,
              private httpService: HttpService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
  ngOnInit() {

  }

  loadPersons() {
    this.httpService.get('RandomPersons').subscribe(
        (response) => { this.posts = <Person>response; },
        (error) => { console.log(error); });
  }
}
