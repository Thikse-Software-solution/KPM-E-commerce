import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product.model';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  productForm: FormGroup;
  showCategory = false;
  showSubCategory = false; // Add this line
  categoryOptions: string[] = [];
  subCategoryOptions: string[] = [];
  products: Product[] = [];
  editingProductId: number | null = null;

  categorySubCategoryMap: { [key: string]: string[] } = {
    'Baby Care': ['babysope', 'baby wash'],
    'body care': ['sope', 'Shampoo'],
    'Necklace': ['dimand', 'gold'],
    'Ring': ['dimand ring', 'gold ring'],
  };

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      id: [null],
      shine: [false],
      sheShine: [false],
      subCategory: ['', Validators.required],
      category: ['', Validators.required],
      mainImage: [''],
      cardImage: [''],
      cardText: [''],
      cardTitle: [''],
      additionalImages: [''],
      thumbnailImage: [''],
      title: ['', Validators.required],
      name: ['', Validators.required],
      benefits: [''],
      suitableFor: [''],
      description: [''],
      keyBenefits: [''],
      howToUse: [''],
      ingredients: [''],
      productSize: [''],
      mrp: [0, Validators.required],
      price: [0, Validators.required],
      stockQuantity: [0, Validators.required],
      discount: [0],
      threeDImages: [''],
      feature: [false],
      trending: [false],
      special: [false]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.categoryOptions = [];
    this.subCategoryOptions = [];
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => this.products = data,
      error => console.error('Error fetching products', error)
    );
  }

  editProduct(product: Product): void {
    this.productForm.patchValue({
      id: product.id,
      shine: product.shine,
      sheShine: product.sheShine,
      subCategory: product.subCategory,
      category: product.category,
      mainImage: product.mainImage,
      cardImage: product.cardImage,
      cardText: product.cardText,
      cardTitle: product.cardTitle,
      additionalImages: product.additionalImages.join(','),
      thumbnailImage: product.thumbnailImage,
      title: product.title,
      name: product.name,
      benefits: product.benefits,
      suitableFor: product.suitableFor,
      description: product.description,
      keyBenefits: product.keyBenefits,
      howToUse: product.howToUse,
      ingredients: product.ingredients,
      productSize: product.productSize,
      mrp: product.mrp,
      price: product.price,
      stockQuantity: product.stockQuantity,
      discount: product.discount,
      threeDImages: product.threeDImages.join(','),
      feature: product.feature,
      trending: product.trending,
      special: product.special
    });

    this.editingProductId = product.id;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = {
        ...this.productForm.value,
        additionalImages: this.productForm.value.additionalImages.split(','),
        threeDImages: this.productForm.value.threeDImages.split(','),
        mrp: parseFloat(this.productForm.value.mrp),
        price: parseFloat(this.productForm.value.price),
        discount: parseFloat(this.productForm.value.discount),
        stockQuantity: parseInt(this.productForm.value.stockQuantity, 10)
      };

      if (productData.id) {
        this.productService.updateProduct(productData.id, productData).subscribe(
          updatedProduct => {
            const index = this.products.findIndex(p => p.id === updatedProduct.id);
            if (index !== -1) {
              this.products[index] = updatedProduct;
            }
            this.resetForm();
            console.log('Product updated successfully!', updatedProduct);
          },
          error => console.error('Error updating product', error)
        );
      } else {
        this.productService.addProduct(productData).subscribe(
          response => {
            this.resetForm();
            console.log('Product submitted successfully!', response);
          },
          error => console.error('Error submitting product!', error)
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  resetForm(): void {
    this.productForm.reset();
    this.editingProductId = null;
    this.showCategory = false; // Reset category visibility
    this.showSubCategory = false; // Reset subcategory visibility
    this.categoryOptions = [];
    this.subCategoryOptions = [];
  }

  onCheckboxChange(selected: string) {
    if (selected === 'shine') {
      this.productForm.get('sheShine')?.setValue(false);
      this.categoryOptions = ['Baby Care','body care','face care','hair care','new launches','skin care'];
    } else if (selected === 'sheShine') {
      this.productForm.get('shine')?.setValue(false);
      this.categoryOptions = ['Necklace', 'Earrings','Bracelet','Ring','Bangle','Pendant','Brooch','Anklet','Cufflinks','Tiara','Choker','Charm Bracelet','Cameo','Locket','Toe Ring'];
    }

    this.showCategory = this.categoryOptions.length > 0;
    this.showSubCategory = false;
    this.subCategoryOptions = [];
  }

 onCategoryChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedCategory = selectElement.value;

  // Update subCategoryOptions based on selected category
  this.subCategoryOptions = this.categorySubCategoryMap[selectedCategory] || [];
  this.showSubCategory = this.subCategoryOptions.length > 0;
}

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.products = this.products.filter(p => p.id !== id);
          console.log('Product deleted successfully');
        },
        error => console.error('Error deleting product', error)
      );
    }
  }
}
