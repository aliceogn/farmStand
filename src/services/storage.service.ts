import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:Storage) {
    this.init();
  }
  
  async init(){
    this.storage = await this.storage.create();
  }
   
  public async set(key: string, value: any){
    await this.storage.set(key, value);
  }
   
  public async get(key:string){
    return await this.storage.get(key);
  }
  public async remove(key:string){
    await this.storage.remove(key);
  }

  public async clear(){
    await this.storage.clear();
  }

  
}
