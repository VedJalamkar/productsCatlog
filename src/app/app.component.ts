import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'productCatlog';
}
