import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() productId!: number;
  ProductEntity!: Product;
  cartItem! : CartItem
  
  constructor(private productServ:ProductService, private cartService: CartService, private authService:AuthService) { }
  ngOnInit() {
   this.productServ.getProductWithRunningDiscountByProductId(this.productId).subscribe(res=>{
    this.ProductEntity=res;

   })
  }
 
  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  completeEmptyStart(){
    return Array(5 - Math.round(this.ProductEntity.averageRate)).fill(1);
  }

  addProductToCart() {
    if (this.ProductEntity) {
      this.cartItem = {
        productId: this.ProductEntity.productId,
        quantity: 1,
      }
      this.cartService.addToCart(this.cartItem);
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'success',
        title: 'Product added to cart!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
