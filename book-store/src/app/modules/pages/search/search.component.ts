import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookModel } from '../../../shared/model/book/book-model'; // Adjust path as per your structure
import { BookService } from '../../../core/service/book-service/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: string = '';
  authorQuery: string = ''; // New property for author search
  books: any[] = [];
  allBooks: any[] = [];
  page: number = 1; // Initialize page number
  size: number = 10; // Initialize page size
  totalBooks: number = 0; // Total number of books
  priceRange: number[] = [0, 1000]; // Default price range

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1; // Convert to number with + operator
      this.size = +params['size'] || 10; // Convert to number with + operator
      this.fetchAllBooks();
    });
  }

  fetchAllBooks(): void {
    this.bookService.getAllBooks(this.page, this.size).subscribe(
      response => {
        this.allBooks = response;
        this.totalBooks = response.length; // Assuming totalBooks is the length of array
        this.filterBooks(); // Apply search filter if query is present
      },
      error => {
        console.error('Error fetching books:', error);
        this.allBooks = []; // Handle error case
      }
    );
  }

  search(): void {
    this.page = 1; // Reset to the first page when searching
    this.fetchAllBooks();
  }

  filterBooks(): void {
    this.books = this.allBooks.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(this.query.toLowerCase());
      const authorMatch = book.author?.name.toLowerCase().includes(this.authorQuery.toLowerCase());
      const priceMatch = book.price >= this.priceRange[0] && book.price <= this.priceRange[1];
      return titleMatch && authorMatch && priceMatch;
    });
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchAllBooks();
  }

  addToCart(bookId: number): void {
    // Implement add to cart functionality here
    console.log('Adding book to cart:', bookId);
    // You can call your cart service here to add the book to the cart
  }
}
