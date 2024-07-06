import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BookModel } from '../../../shared/model/book/book-model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;
  successMessage: string = '';

  constructor(private http: HttpClient) {
    this.addBookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      bookStock: new FormControl('', [Validators.required, Validators.min(0)]),
      authorName: new FormControl('', [Validators.required]),
      publisherName: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addBookForm.valid) {
      const newBook: BookModel = this.addBookForm.value;

      this.http.post('http://localhost:8089/api/books/add', newBook,{ responseType: 'text' }).subscribe(
        (response) => {
          // Clear the form
          this.addBookForm.reset();

          // Show success message
          this.successMessage = 'Book added successfully!';

          // Hide the success message after 3 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);

          console.log('Book added successfully:', response);
        },
        (error) => {
          console.error('Error adding book:', error);
        }
      );
    }
  }
}
