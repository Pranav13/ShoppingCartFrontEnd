import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Category } from 'shared/models/category';
import { AlertService } from 'shared/service/alert.service';
import { CategoryService } from 'shared/service/category.service';
import { ProductService } from 'shared/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  category: Category[];
  title: string;
  price: number;
  imageurl: string;
  id;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id:this.route.snapshot.paramMap.get('id'),
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['',Validators.required],
      imageurl: ['',Validators.required]
     });

    this.categoryService.getAll().subscribe(category =>{
        this.category = category;
     }); 


     this.id = this.route.snapshot.paramMap.get('id');
     
     if (this.id){
       this.productService.getProductById(this.id)
        .subscribe(product =>{
            this.title = product.title;
            this.price = product.price;
            this.imageurl = product.imageurl;
           this.productForm.controls['category'].setValue(product.category);
        });
     }
  }

  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.productForm.invalid) {
        return;
    }

    //let id = this.route.snapshot.paramMap.get('id');

    if(this.id){
      this.productService.update(this.productForm.value)
          .subscribe(
              data => {
                 // this.alertService.success('Registration successful', true);
                  this.router.navigate(['/admin/products']);
              },
              error => {
                  this.alertService.error(error);
                  //this.loading = false;
              });

    }else{
      this.productService.save(this.productForm.value)
          .subscribe(
              data => {
                 // this.alertService.success('Registration successful', true);
                  this.router.navigate(['/admin/products']);
              },
              error => {
                  this.alertService.error(error);
                  //this.loading = false;
              });
    }

    

}

delete(){
  this.productService.delete(this.id)
                    .subscribe(
                      data => {
                         // this.alertService.success('Registration successful', true);
                          this.router.navigate(['/admin/products']);
                      },
                      error => {
                          this.alertService.error(error);
                          //this.loading = false;
                      });
}

}
