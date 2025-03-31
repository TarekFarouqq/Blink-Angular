import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CategoryCardComponent } from "../category-card/category-card.component";
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Discount } from '../../models/discount';
import { DiscountService } from '../../services/discount.service';
@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [FormsModule, CommonModule, ProductCardComponent, CategoryCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  ProductArr!:Product[];
  ParentCategoryArr!:Category[];
  DiscountArr!:Discount[];
  constructor(private productServ:ProductService,private categoryServ:CategoryService,private discountServ:DiscountService) { }
  ngOnInit() {
    this.productServ.getAllProducts().subscribe(res=>{
      this.ProductArr=res;
    })
    this.categoryServ.getAllParentCategory().subscribe(res=>{
      this.ParentCategoryArr=res;
    })
    this.discountServ.getRunningDiscounts().subscribe(res=>{
      this.DiscountArr=res;
    })
  }
}
