import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

import { CartItem } from '../models/cartItem';
import { AuthService } from './auth.service';
import { WishList } from '../models/wish-list';
import { WishListItem } from '../models/wish-list-item';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishListUserId: string | null = null;
  
  private apiUrl = environment.apiUrl;

  
  private wishListSubject = new BehaviorSubject<WishList>({
    withListDetails: [],
    userId: '',
    wishListId: 0,
  });
  wishList$ = this.wishListSubject.asObservable(); 


  constructor(
    private _HttpClient: HttpClient,
    private authService: AuthService,
  ) {
    this.wishListUserId = this.authService.getUserId();
    this.loadWishList(); 
    
  }

  loadWishList(): void {
    let wishList: WishList | undefined;
    if (this.wishListUserId) {
      this.getWishListByUserId(this.wishListUserId).subscribe({
        next: (wishList) => {
          this.wishListSubject.next(wishList);
        },
        error: (error) => {
          if (error.status === 404) {
            this.wishListSubject.next({ withListDetails: [], userId: '', wishListId: 0 });
          } else {
            console.error(error);
          }
        },
      });
    }else{
      
    return;
    }

  }

  getWishListByUserId(id: string): Observable<WishList> {
    return this._HttpClient.get<WishList>(`${this.apiUrl}/WishList/GetByUserId/${id}`);
  }
 // In cart.service.ts

deleteWishList(wishListId: number): void {
  if (!this.wishListUserId) return;

  this._HttpClient.delete(`${this.apiUrl}/WishList/ClearWishList/${wishListId}`)
    .subscribe({
      next: () => {
        this.loadWishList(); 
        console.log('WishList Cleared successfully');
      },
      error: (error) => {
        console.error('Error Clearing WishList', error);
      }
    });
}

  addToWishList(wishListItem: WishListItem): void {
    if (!this.wishListUserId) return;

     this._HttpClient.post<WishListItem>(
      `${this.apiUrl}/WishList/AddWishList/${this.wishListUserId}`,
      wishListItem
    ).subscribe({
      next: (response) => {
        this.loadWishList();
        console.log('Item added to WishList', response);
      },
      error: (error) => {
        console.error('Error adding item',error);
      }
    })
  }
}
