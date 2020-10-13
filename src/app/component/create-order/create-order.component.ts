import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/services/order.interface';
import { MagicPotionLaunchSiteService } from '../../services/magic-potion-launch-site.service'

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  qty: string[] = ['1','2','3'];
  states: string[] = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN',
    'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH',
    'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA',
    'WV', 'WI', 'WY'
  ];
  magicPotionForm: FormGroup;
  newOrder: Order;
  sum: number = 0;
  subscription: Subscription;

  constructor(
    private magicPotionService: MagicPotionLaunchSiteService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.magicPotionForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phone: new FormControl('', Validators.pattern('[0-9]*')),
      address: new FormGroup({
        street1: new FormControl('', Validators.required),
        street2: new FormControl(''),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zip: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ])
      }),
      quantity: new FormControl('', Validators.required),
      total: new FormControl({value: this.sum, disabled: true}, Validators.required),
      payment: new FormGroup({
        ccNum: new FormControl('', Validators.pattern('[0-9]*')),
        exp: new FormControl('', Validators.required)
      })
    });

    this.subscription = this.magicPotionForm.valueChanges.subscribe(
      value => {
        this.sum = value.quantity * 49.99;
      }
    )
}

    createOrder() {
      let data;
      if (this.magicPotionForm.valid) {
        this.newOrder = this.magicPotionForm.value;
        this.newOrder.total = this.sum.toString();
        this.newOrder.address.zip = this.newOrder.address.zip.toString();
        this.newOrder.payment.ccNum = this.newOrder.payment.ccNum.toString();
      } else {
        this.matSnackBar.open("Form is invalid fill all fields and retry", "OK", {
          duration: 3000,
          verticalPosition: 'top'
        });
        return;
      }

      this.magicPotionService.createOrder(this.newOrder).subscribe(
        response => {
          data = response;
          this.matSnackBar.open("Order created successfully ID: "+data.id, "OK", {
            duration: 3000,
            verticalPosition: 'top'

          });
          this.magicPotionForm.reset();
        },
        err =>{
          this.matSnackBar.open("An error occured please try again", "OK", {
            verticalPosition: 'top'
          });
        }
      )};

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
