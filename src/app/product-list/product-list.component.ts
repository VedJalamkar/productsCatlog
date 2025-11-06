import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ProductDetailsComponent } from '../product-details/product-details.component';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductDetailsComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  filtered: Product[] = [];
  query = '';
  selectedProduct: Product | null = null;
  loading = true;
  error: string | null = null;
  constructor(private productService: ProductService) {
    this.load();
}

trackById(index: number, item: Product): number {
  return item.id;
}


load() {
  this.loading = true;
  this.productService.getProducts().subscribe({
    next: (data) => {
      this.products = data;
      this.filtered = data;
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Failed to load products';
      console.error(err);
      this.loading = false;
    }
});
}
onSearchChange(){
  const q = this.query.toLowerCase();
  if(!q){
    this.filtered = this.products;
    return;
  }
  this.filtered = this.products.filter(p => p.name.toLowerCase().includes(q));
}
openDetails(p: Product){
  this.selectedProduct = p;
}
closeDetails(){
  this.selectedProduct = null;
}

}
