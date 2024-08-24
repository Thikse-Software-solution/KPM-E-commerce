import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from '../../services/customer.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer?: Customer;
  emailMessage = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data) => this.customers = data,
      (error) => console.error(error)
    );
  }

  viewCustomer(customer: Customer): void {
    this.customerService.getCustomer(customer.id).subscribe(
      (data) => this.selectedCustomer = data,
      (error) => console.error(error)
    );
  }

  deleteCustomer(customer: Customer): void {
    this.customerService.deleteCustomer(customer.id).subscribe(
      () => this.loadCustomers(),
      (error) => console.error(error)
    );
  }

  updateCustomer(customer: Customer): void {
    this.customerService.updateCustomer(customer).subscribe(
      (data) => this.selectedCustomer = data,
      (error) => console.error(error)
    );
  }

  sendEmail(customer: Customer): void {
    if (this.emailMessage.trim()) {
      this.customerService.sendEmail(customer.id, this.emailMessage).subscribe(
        () => alert('Email sent successfully!'),
        (error) => console.error(error)
      );
    }
  }
}
