import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './order.interface'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MagicPotionLaunchSiteService {

  constructor(private http:HttpClient) { }

  createOrder(newOrder: Order) {
    return this.http
      .post<Order>('/server/api/magic', newOrder);
  }

  getAllOrders() {
    return this.http
      .get('/server/api/magic');
  }
}
