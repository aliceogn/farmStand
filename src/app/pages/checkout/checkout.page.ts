import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CheckoutPage implements OnInit {
  countries: any;
  service: ApiService;
  countryId: any;
  alias: any;
  address1: any;
  city: any;
  dni: any;

  constructor(apiService: ApiService) {
    this.service = apiService;
   }

  ngOnInit() {
    this.setCountries();
  }

  public async setCountries() {
    this.service.getCountries().subscribe((response: any) => {this.countries = response.countries})
  }

  public async submit() {
    console.log('hihihihi');
    if (this.countryId && this.alias && this.address1 && this.city) 
    {
      const custumerAddress = this.createXml(this.countryId, this.alias, this.address1, this.city, this.dni);
      this.service.sendAddress(custumerAddress).subscribe((response: any) => {
        console.log(response);
      })
    } else {
      //error, can't submit
      console.log('error, can\'t submit');
    }
  }

  public createXml(country: number, alias: string, address: string, city: string, dni: string | null) {
    if (dni) {
      return `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
      <address>
        <id_customer>1</id_customer>
        <id_country>${country}</id_country>
        <alias>${alias}</alias>
        <lastname>Anonymous</lastname>
        <firstname>Anonymous</firstname>
        <address1>${address}</address1>
        <city>${city}</city>
        <dni>${dni}</dni>  
      </address>
    </prestashop>`;
    } 
    return `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
      <address>
        <id_customer>1</id_customer>
        <id_country>${country}</id_country>
        <alias>${alias}</alias>
        <lastname>Anonymous</lastname>
        <firstname>Anonymous</firstname>
        <address1>${address}</address1>
        <city>${city}</city>
      </address>
    </prestashop>`;

  }

}
