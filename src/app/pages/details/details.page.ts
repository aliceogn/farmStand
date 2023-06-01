import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { StorageService } from 'src/services/storage.service';
import { BottomMenuComponent } from 'src/app/components/bottom-menu/bottom-menu.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BottomMenuComponent]
})
export class DetailsPage implements OnInit {
  id;
  apiService: ApiService;
  storage: StorageService;
  product: any;
  loadedProduct = false;
  quantity = 0;
  constructor(
    private route: ActivatedRoute, 
    apiService: ApiService,
    storage: StorageService
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.apiService = apiService;
    this.storage = storage;
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    this.apiService.getProduct(this.id).subscribe((response:any) => {
      this.product = response.products[0]; 
      this.product.price = parseFloat(response.products[0].price).toFixed(2);
      console.log(this.product);
      this.loadedProduct = true;
    });
  }

  async addProductToCart() {
    let productsInStorage = await this.storage.get('products');
    if (productsInStorage) {
      //check if this product is already present
      let index = this.productInArrayIndex(productsInStorage);
      if (index === -1) {
        //if no push the new one
        let product = { id: this.id, quantity: this.quantity}
        productsInStorage.push(product);
      } else { //update quantity
        productsInStorage[index].quantity = parseInt(productsInStorage[index].quantity) + this.quantity;
      }
    } else {
      productsInStorage = [{ id: this.id, quantity: this.quantity }];
    }
    await this.storage.clear();
    await this.storage.set('products', productsInStorage);
    console.log('added product to cart');
  }

  productInArrayIndex(array: []) {
    return array.findIndex((object: {id: string; quantity: number}) => {
      return object.id == this.id;
    });
  }
}