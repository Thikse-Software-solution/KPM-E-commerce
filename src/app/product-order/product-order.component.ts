import { Component,OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss']
})
export class ProductOrderComponent implements OnInit {
  product: any;

  isFavorite = false;

  toggleFavorite(product: any) {
    this.isFavorite = !this.isFavorite;
  }

 

  buyNow() {
   
    alert('Buy now');
  }
  addToCart(product: any)
    {
  
      this.cartService.addToCart(product);
    }

  constructor(private cartService: CartService, private route: ActivatedRoute, private productService: ProductService) { }
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id === id);
    });

  
    
  }
}
