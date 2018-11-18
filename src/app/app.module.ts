import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BaseRequestOptions, RequestOptions, Http, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { fakeBackendProvider } from './services/fake-backend.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { OrdersService } from './services/orders.service';
import { Authguard } from './services/authguard.service';
import { AuthService } from './services/auth.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'Authorization',
        tokenGetter: tokenGetter,
        noJwtError: true
    }), http, options);
}
export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent,
        NotFoundComponent,
        AccessDeniedComponent,
    ],
    imports: [
        HttpModule,
        FormsModule,
        BrowserModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            {
                path: 'admin',
                component: AdminComponent,
                canActivate: [Authguard, AdminAuthGuard]
            },
            { path: 'login', component: LoginComponent },
            { path: 'access-denied', component: AccessDeniedComponent },
            { path: '**', component: NotFoundComponent }
        ])
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        Authguard,
        AuthService,
        MockBackend,
        OrdersService,
        AdminAuthGuard,
        BaseRequestOptions,
        fakeBackendProvider,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
