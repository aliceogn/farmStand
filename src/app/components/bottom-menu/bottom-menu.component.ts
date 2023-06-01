import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CartPage } from 'src/app/pages/cart/cart.page';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CartPage]
})
export class BottomMenuComponent  implements OnInit {

  @Input() cartItemsNumber: any;

  constructor() { }

  ngOnInit() {}

}
