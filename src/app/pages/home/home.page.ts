import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { BottomMenuComponent } from 'src/app/components/bottom-menu/bottom-menu.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, BottomMenuComponent, RouterLink]
})
export class HomePage implements OnInit {
  apiService: ApiService;
  products: any;
  loading = true;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  ngOnInit() {
    this.getData();
  }
  getData(){
    this.apiService.getProducts().subscribe((response:any) => {
      this.products = response.products;  
      console.log(this.products);
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }
}
