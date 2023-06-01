import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BottomMenuComponent } from 'src/app/components/bottom-menu/bottom-menu.component';
import { StorageService } from 'src/services/storage.service';
import { ApiService } from 'src/app/service/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule, BottomMenuComponent]
})
export class CartPage implements OnInit {
  public cartItemsNumber: Number = 0;
  storage: StorageService;
  products: any = [];
  apiService: ApiService;
  loadingProducts = true;

  constructor(storage: StorageService, apiService: ApiService) {
    this.storage = storage;
    this.apiService = apiService;
  }

  ngOnInit() {
    this.setProducts();
  }

  public async setProducts() {
    let products = await this.storage.get('products');
    this.cartItemsNumber = products.length;

    if (!products) {
      this.loadingProducts = false;
      return;
    };
    products.forEach((product: { id: string | null; quantity: string }) => {
      this.apiService.getProduct(product.id).subscribe((response: any) => {
        // console.log(response.products);
        const objBuffer = response.products[0];
        objBuffer.quantity = product.quantity;
        objBuffer.price = parseFloat(objBuffer.price).toFixed(2);
        objBuffer.id = product.id;
        this.products.push(objBuffer);
        console.log(this.products);
      })
    });
    this.loadingProducts = false;

    await this.setItemsInCartQuantity();
  }

  public async setItemsInCartQuantity() {

  }

  public async deleteProductFromStorage(id: any) {
    let products = await this.storage.get('products');
    let index = this.productInArrayIndex(products, id);
    let updatedProducts = products.slice();
    updatedProducts.splice(index, 1);
    await this.storage.clear();
    await this.storage.set('products', updatedProducts);
    location.reload();
  }

  productInArrayIndex(array: [], id: any) {
    return array.findIndex((object: {id: string; quantity: number}) => {
      return object.id == id;
    });
  }
}
