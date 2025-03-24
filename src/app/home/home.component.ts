import { Component } from '@angular/core';
import { ProductSericeService } from '../service/product-serice.service';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [NgClass, CommonModule, FormsModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private _productService: ProductSericeService;
  products: any[] = [];
  addCart: { [key: number]: boolean } = {};
  basket: any[] = [];
  productName = ""
  productPrice = ""
  productImage = "https://paint-center.ru/storage/article/new-product.png"
  error = ""
  modal: boolean = false
  filterProducts: any[] = [];

  constructor(ProductSericeService: ProductSericeService) {
    this._productService = ProductSericeService;
  }

  async ngOnInit() {
    this.products = await this._productService.getProducts();
    this.filterProducts = this.products;
  }

  addProductBasket(product: any) {
    this._productService.addProductBasket(product);
    this.addCart[product.id] = true;
  }
  closeModal(){
    this.modal = false;
    this.clearForm();
  }
  clearForm() {
    throw new Error('Method not implemented.');
  }

  addProduct(){
    if(this.productName && this.productPrice){
      let newProduct = {
        id: Date.now,
        name: this.productName,
        price: this.productPrice,
        image: this.productImage
      }
      this.products.unshift(newProduct)
      this.productName = ""
      this.productPrice = ""
      this.productImage = ""
      this.closeModal();
    }else{
      this.error = "Нужно заполнить все поля"
    }
  }
  setModal() {
    this.modal = true;

  }
  search(event: Event) {
    const searchText = (event?.target as HTMLInputElement).value.toLowerCase();
    if (searchText) {
      this.filterProducts = this.products.filter((product: any) => product.name.toLowerCase().includes(searchText));
    } else {
      this.filterProducts = this.products;
    }
    console.log(this.filterProducts);
  }

}
