import { Component, OnInit } from '@angular/core';
import { CustomerService, OfferEmailRequest, CartReminderRequest, Review } from '../../services/customer.service'; // Adjust the path as needed

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  pendingReviews: Review[] = [];
  offerEmailRequest: OfferEmailRequest = { subject: '', body: '', recipientEmails: [], customerId: 0, offerMessage: '' }; // Initialize customerId with 0 or another default value
  cartReminderRequest: CartReminderRequest = { reminderMessage: '', recipientEmails: [] };

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadPendingReviews();
  }

  loadPendingReviews(): void {
    this.customerService.getPendingReviews().subscribe(
      reviews => this.pendingReviews = reviews,
      error => {
        console.error('Error fetching pending reviews:', error);
        // Additional error handling logic here
      }
    );
    
  }

  sendOfferEmail(): void {
    this.customerService.sendOfferEmail(this.offerEmailRequest).subscribe(
      response => console.log(response),
      error => console.error('Error sending offer email:', error)
    );
  }

  sendCartReminder(): void {
    this.customerService.sendCartReminder(this.cartReminderRequest).subscribe(
      response => console.log(response),
      error => console.error('Error sending cart reminder:', error)
    );
  }

  approveReview(id: number): void {
    this.customerService.approveReview(id).subscribe(
      response => {
        console.log(response);
        this.loadPendingReviews(); // Reload reviews after approval
      },
      error => console.error('Error approving review:', error)
    );
  }
}
