import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { UserComponent } from './user/user.component';
import { NewPostComponent } from './new-post/new-post.component';
import { CommentsComponent } from './comments/comments.component';
import { ShareComponent } from './share/share.component';
import { HomeComponent } from './home/home.component';

//----- External plugins-----
import { ModalModule } from 'ngx-bootstrap';


const appRoutes: Routes = [
  { path: 'newpost', component: NewPostComponent },
  { path: 'postdetails', component: PostComponent , 
      children: [{
        path: 'commentsdetails/:id',
        component: CommentsComponent,
        outlet: 'comments'}]},
  { path: 'userdetails', component: UserComponent },
  { path: 'homepage', component: HomeComponent }
 
];
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    UserComponent,
    NewPostComponent,
    CommentsComponent,
    ShareComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
