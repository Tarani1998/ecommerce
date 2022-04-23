import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.grid.component.html',
  //templateUrl: './product-list.table.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  searchMode : boolean;

  constructor(private productService : ProductService , 
    private cartService : CartService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
    this.listProducts();
  });
}

  listProducts(){
  
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){

      this.handleSearchProducts();


    }
    else{
      this.handleListProducts();
    }
  
  }
  handleSearchProducts() {
    
    const myKeyword = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(myKeyword).subscribe(
      data =>{
      console.log(data);
      this.products =data;
    })

  }

  handleListProducts(){
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
     this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(data =>{
    console.log(data);
    this.products =data;
    })
  }

  addToCart(product : Product){
    console.log(`Adding to Cart: ${product.name}, ${product.unitPrice}`);

    const cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }

}
