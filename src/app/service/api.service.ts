import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  key: string = 'DLE4EUM5NE65Q6XATQXMN9UM4M373ILR';
  constructor(public http: HttpClient) { }
  getProducts(){
    return this.http.get(`https://juditp.cat/project/api/products/?display=[id,name,id_default_image]&output_format=JSON&ws_key=${this.key}`);
  }

  getProduct(id: string | null) {
    return this.http.get(`http://juditp.cat/project/api/products/${id}?display=[name,price,description,id_default_image]&output_format=JSON&ws_key=${this.key}`);
  }

  getCountries() {
    return this.http.get(`https://juditp.cat/project/api/countries&output_format=JSON&ws_key=${this.key}&display=[name,id]&language=1`);
  }
  sendAddress(data: any) {
    let url = `https://juditp.cat/project/api/addresses?output_format=JSON&ws_key=${this.key}`;
    return this.http.post(url, data);
  }
}
