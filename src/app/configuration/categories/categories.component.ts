import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration.service';
import { Categories } from '../models/categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Categories[]>;

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.categories$ = this.configurationService.getCategories();
  }

}
