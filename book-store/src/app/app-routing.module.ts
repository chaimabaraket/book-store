import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/pages/page-not-found/page-not-found.component';
import { OrdersComponent } from './modules/pages/orders/orders.component';
import { CheckoutComponent } from './modules/pages/checkout/checkout.component';
import { UserpageComponent } from './modules/pages/userpage/userpage.component';
import { CartComponent } from './modules/pages/cart/cart.component';
import { BooksComponent } from './modules/pages/books/books.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { ContactComponent } from './modules/pages/contact/contact.component';
import { AddBookComponent } from './modules/pages/add-book/add-book.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { SignupComponent } from './modules/pages/signup/signup.component';
import { SearchComponent } from './modules/pages/search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'books', component: BooksComponent},
  {path: 'add-books', component: AddBookComponent},
  {path: 'cart', component: CartComponent},
  {path: 'user', component: UserpageComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchComponent},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
