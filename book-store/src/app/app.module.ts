import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/components/header/header.component';
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { BooksComponent } from './modules/pages/books/books.component';
import { FooterComponent } from './modules/components/footer/footer.component';
import { CartComponent } from './modules/pages/cart/cart.component';
import { UserpageComponent } from './modules/pages/userpage/userpage.component';
import { PageNotFoundComponent } from './modules/pages/page-not-found/page-not-found.component';
import { CheckoutComponent } from './modules/pages/checkout/checkout.component';
import { OrdersComponent } from './modules/pages/orders/orders.component';
import { NgbCarouselModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LocalStorageService, provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';
import { ContactComponent } from './modules/pages/contact/contact.component';
import { AddBookComponent } from './modules/pages/add-book/add-book.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './modules/pages/signup/signup.component';
import { SearchComponent } from './modules/pages/search/search.component';
import { MatSliderModule } from '@angular/material/slider'; // Import MatSliderModule
import { EditBookComponent } from './modules/pages/edit-book/edit-book.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    BooksComponent,
    FooterComponent,
    CartComponent,
    UserpageComponent,
    PageNotFoundComponent,
    CheckoutComponent,
    OrdersComponent,
    ContactComponent,
    AddBookComponent,
    EditBookComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([]), // Make sure you have correct routing configuration
    CommonModule,
    FormsModule,
    MatSliderModule


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    LocalStorageService,
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
