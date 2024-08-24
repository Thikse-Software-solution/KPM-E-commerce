import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product.model';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  product: Product = {} as Product; // Use object literal instead of new Product()
  products: Product[] = [];
  fileToUpload: File | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  onSubmit(): void {
    if (this.product.id) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.loadProducts();
        this.clearForm();
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.loadProducts();
        this.clearForm();
      });
    }
  }

  editProduct(product: Product): void {
    this.product = { ...product };
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  clearForm(): void {
    this.product = {} as Product; // Use object literal instead of new Product()
  }

  onFileChange(event: any): void {
    this.fileToUpload = event.target.files[0];
  }

  uploadFile(): void {
    if (this.fileToUpload) {
      this.productService.uploadFile(this.fileToUpload).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
