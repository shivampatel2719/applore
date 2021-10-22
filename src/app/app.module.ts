import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './components/users/users.component';
import { ConfirmationComponentComponent } from './dialogs/confirmation-component/confirmation-component.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthGaurd } from './components/login/auth.gaurd';
import { AdminGaurd } from './components/login/admin.gaurd';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const appRouters: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'blogs', 
    canActivate: [AuthGaurd],
    component: BlogComponent 
  },
  { 
    path: 'users', 
    canActivate: [AuthGaurd, AdminGaurd],
    component: UsersComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlogComponent,
    UsersComponent,
    ConfirmationComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouters),
    FormsModule,
    MatInputModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
