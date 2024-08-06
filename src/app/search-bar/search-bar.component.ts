import { Component } from '@angular/core';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
 searchTerm: string = '';

  constructor(private productService: ProductService) {}

  onSearch(): void {
    this.productService.searchProducts(this.searchTerm).subscribe(products => {
      console.log('Search results:', products);
      // Handle the search results as needed
    });
  }
}