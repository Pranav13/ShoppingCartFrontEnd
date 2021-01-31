import { Injectable, OnInit } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from 'shared/models/user';
import { Role } from 'shared/models/role';
import { Category } from 'shared/models/category';
import { Product } from 'shared/models/product';

// array in local storage for registered users
//localStorage.setItem("users", "{ id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin }");
//localStorage.setItem("users", "{ id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }");

 const users1: User[] = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', roles: [Role.Admin] },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', roles: [Role.User] }
 ];
 const category1: Category[] =[
    {id: 1, categoryname:'Bread'},
    {id: 2, categoryname:'Dairy'},
    {id: 3, categoryname:'Fruits'},
    {id: 3, categoryname:'Seasoning and Spices'},
    {id: 4, categoryname:'Vegetable'},
 ];
//   const product1: Product[] = [
//      {title: "kkjlkjlkj", price: 10, category: category1[0], imageurl: "https://pixnio.com/free-images/2017/08/14/2017-08-14-08-21-38-1000x667.jpg", id: 1}
//   ]

localStorage.setItem('users',JSON.stringify(users1));
//localStorage.setItem('category',JSON.stringify(category1));
//localStorage.setItem('products',JSON.stringify(product1));

let users = JSON.parse(localStorage.getItem('users')) || [];
//let category = JSON.parse(localStorage.getItem('category')) || [];
//let products = JSON.parse(localStorage.getItem('products')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor  {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                //case url.match(/\/users\/\d+$/) && method === 'DELETE':
                  //  return deleteUser();
                //case url.endsWith('/category') && method === 'GET':
                  //  return getCategory();
                //case url.endsWith('/product') && method === 'POST':
                   // return saveProduct();
                //case url.endsWith('/product') && method === 'GET':
                   // return getProduct(); 
                //case url.match(/\/product\/\d+$/) && method ==='GET':
                    //return getProductById();       
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token',
                role: user.role
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        // function saveProduct(){
        //     const product = body;
        //     if(product.id != null  && products.find(x => x.id == product.id)){
        //         localStorage.setItem('products', JSON.stringify(product));
        //     }else{
        //     // product.id = products.length ? Math.max(...products.map(x => x.id)) + 1 : 1;
        //     // products.push(product);
        //     // localStorage.setItem('products', JSON.stringify(products));

        //     product.id = products.length ? Math.max(...products.map(x => x.id)) + 1 : 1;
        //     products.push(product);
        //     localStorage.setItem('products', JSON.stringify(products));
        //     }
        //     return ok();
        // }

        // function getProductById(){
        //     const product = products.find(x => x.id == idFromUrl());
        //     return ok(product);
        // }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // function getCategory() {
        //     return ok(category);
        // }

        // function getProduct(){
        //     return ok(products);
        // }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};