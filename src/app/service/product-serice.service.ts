import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductSericeService {
  private products: any = [];
  private basket: any = [];


  constructor() {}
  async getProducts() {
    try {
      const res = await fetch(
        'https://676f8fc5b353db80c322ff2f.mockapi.io/catalogPC'
      )
        .then((res) => res.json())
        .then((data) => (this.products = data));
    } catch {
      console.error();
    }
    return this.products;
  }

  getBasket(): any[] {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      this.basket = JSON.parse(storedBasket);
    } else {
      this.basket = [];
    }
    return this.basket;
  }

  addProductBasket(product: any) {
    if (!this.basket.some((prod: any) => prod.id == product.id)) {
      let productBasket = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        countBasket: 1,
      };
      this.basket.push(productBasket);
      localStorage.setItem('basket', JSON.stringify(this.basket));
    }
  }
  removeProductBasket(product: any) {
    const index = this.basket.findIndex((prod: any) => prod.id === product.id);
    if (index !== -1) {
      this.basket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.basket));
    }
  }


}
