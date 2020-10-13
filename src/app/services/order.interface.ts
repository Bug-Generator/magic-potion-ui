export interface Order {
  firstName: String;
  lastName: String;
  email: String;
  address: Address;
  phone: String;
  quantity: String;
  total: String;
  payment: Payment;
}

export interface Address {
  street1: String;
  street2: String;
  city: String;
  state: String;
  zip: String;
}

export interface Payment {
  ccNum: String;
  exp: String;
}
