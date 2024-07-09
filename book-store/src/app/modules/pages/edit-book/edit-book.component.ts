import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute for getting bookId
import { BookModel } from '../../../shared/model/book/book-model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  editBookForm: FormGroup;
  successMessage: string = '';
  bookId: number; // To store the bookId from route params
  originalBook: BookModel; // To store the original book details fetched from server

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.editBookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      bookStock: new FormControl('', [Validators.required, Validators.min(0)]),
      authorName: new FormControl('', [Validators.required]),
      publisherName: new FormControl('', [Validators.required])
    });

    // Get bookId from route params
    this.route.params.subscribe(params => {
      this.bookId = +params['id']; // Convert to number
    });
  }

  ngOnInit(): void {
    // Fetch the existing book details based on bookId
    this.fetchBookDetails();
  }

  fetchBookDetails() {
    // Make HTTP GET request to fetch book details
    this.http.get<BookModel>(`http://localhost:8089/api/books/${this.bookId}`).subscribe(
      (book) => {
        this.originalBook = book; // Store the original book details
        // Set form values with fetched book details
        this.editBookForm.patchValue({
          title: book.title,
          description: book.description,
          price: book.price,
          bookStock: book.bookStock,
          authorName: book.authorName,
          publisherName: book.publisherName
        });
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  onSubmit() {
    if (this.editBookForm.valid) {
      const editedBook: BookModel = this.editBookForm.value;

      // Update the existing book using HTTP PUT request
      this.http.put(`http://localhost:8089/api/books/update/${this.bookId}`, editedBook, { responseType: 'text' }).subscribe(
        (response) => {
          // Show success message
          this.successMessage = 'Book updated successfully!';

          // Hide the success message after 3 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);

          console.log('Book updated successfully:', response);
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }
}
