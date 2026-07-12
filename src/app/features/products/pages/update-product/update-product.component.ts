import { Component , Input, Output , EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms'; 
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule , ButtonComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {

  @Input({required:true})
product!:Product;

@Input()
isOpen=false;

@Output()
close=new EventEmitter();

@Output()
save=new EventEmitter<number>();

newPrice=0;

ngOnChanges(){
   this.newPrice=this.product.price;
}

savePrice(){
   this.save.emit(this.newPrice);
}
}
