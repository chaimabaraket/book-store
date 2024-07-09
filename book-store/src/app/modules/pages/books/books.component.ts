import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../../core/service/book-service/book.service';
import { BookModel } from '../../../shared/model/book/book-model';
import { CartService } from '../../../core/service/cart-service/cart.service';
import { CartDTO } from '../../../core/service/cart-service/cartDTO';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  books$: Array<BookModel> = [];
  page: number = 1;
  size: number = 6;
  role: string | null = null;

  cartDTO: CartDTO = {
    bookId: 0,
    quantity: 0
  };
  cartForm: FormGroup = new FormGroup({
    quantity: new FormControl(0, [Validators.required]),
  });
  private querySub: Subscription = new Subscription();

  constructor(
    private bookService: BookService,
    private localStorage: LocalStorageService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router // Inject Router for navigation

  ) {}

  ngOnInit(): void {
    this.loadUserDetails();
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
    });
  }

  private loadUserDetails() {
    this.role = this.localStorage.retrieve('role') || null;
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  update() {
    const currentPage = +(this.route.snapshot.queryParamMap.get('page') ?? 1);
    const size = +(this.route.snapshot.queryParamMap.get('size') ?? 6);
    this.getBooks(currentPage, size);
  }

  getBooks(page: number = 1, size: number = 9) {
    this.bookService.getAllBooks(page, size).subscribe(books => {
      this.books$ = books;
      this.page = page;
    });
  }

  addToCart(bookId: number) {
    this.cartDTO.bookId = bookId;
    this.cartDTO.quantity = this.cartForm.get('quantity')!.value;

    if (this.cartDTO.quantity !== 0) {
      this.cartService.addToCart(this.cartDTO).subscribe(data => {
        // Handle success if needed
      }, error => {
        throwError(error);
      });
    }
  }

  isAdmin(): boolean {
    return this.role === 'ROLE_ADMIN';
  }

  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe(() => {
      // Refresh the book list after deletion
      this.update();
    }, error => {
      // Handle error if needed
      console.error('Error deleting book:', error);
    });
  }

  editBook(bookId: number) {
    this.router.navigate(['/edit-books', bookId]);
  }

}
