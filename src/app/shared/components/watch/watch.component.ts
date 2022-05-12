import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../products/models/models'

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  @Input() value: Product;
  constructor() { }

  ngOnInit(): void {
  }

}
