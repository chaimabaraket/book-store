import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { BookModel } from '../../../shared/model/book/book-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8089/api/books';


  constructor(private httpClient: HttpClient) {
  }

  getAllBooks(page,size): Observable<any> {
    let params = new HttpParams();
    params = params.append('page',page);
    params = params.append('size',size);
    return this.httpClient.get('http://localhost:8089/api/books/all',{
      params: params
  });
  }

  addBook(book: BookModel): Observable<BookModel> {
    return this.httpClient.post<BookModel>("http://localhost:8089/api/books/add", book);
  }
}
