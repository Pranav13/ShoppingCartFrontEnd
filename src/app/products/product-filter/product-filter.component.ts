import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories: Category[] = [];
  @Input("category") category;

  constructor(private categoryService:CategoryService) { 
    this.categoryService.getAll().subscribe(categories =>{
      this.categories = categories;
    });

  }

  ngOnInit(): void {
  }

}
