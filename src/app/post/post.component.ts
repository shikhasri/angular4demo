import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs';
import { ActivatedRoute, Router,RouterModule } from "@angular/router";
import { CommentsComponent } from '../comments/comments.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
 @ViewChild('childModal') public childModal:ModalDirective;
 posts: Observable<any[]>;
 allpost: any[];
 id:number;
 temp:number;
 commentbox: boolean=false;
 isComments: boolean=false;
  constructor(private dataService:DataService,private router: Router) { }


  likePost(event: any){
    this.temp=event.target.attributes.id.value;
    this.dataService.likePosts(this.temp).subscribe(
       function(result){
          document.getElementById(event.target.attributes.id.value)
          .innerHTML= result==0?' Like(s)':result+' Like(s)';
       });
    }
   commentPost(event :any){
   document.getElementById('commentbox'+event.target.attributes.id.value.split("f")[1]).hidden=this.commentbox;
      
  }


  submitComment(event :any){
    if (event.keyCode == 13)
     {
       this.dataService.commentOnPosts(event.target.attributes.id.value,event.target.value).
       subscribe(function(result){
       document.getElementById('commentof'+event.target.attributes.id.value).innerHTML= result==0?' Comments(s)':result+' Comment(s)'
       console.log(document.getElementById('commentbox'+event.target.attributes.id.value).children.namedItem('input'));
     });
    }
  }

   getPostComments(){
     this.isComments=true;
    // this.id=event.target.attributes.id.value.split('ts')[1];
    // let postid = this.id;
    // this.router.navigate(['postdetails/commentsdetails/',this.id]);

   // this.router.navigate(['postdetails/commentsdetails/',{outlets: {'comments': [this.id]}}]);
  }



  sharePost(event: any){
    this.id=event.target.attributes.id.value.split('on')[1];
    let postid = this.id;
    this.dataService.sharePost(postid).subscribe(function(result){
          document.getElementById(event.target.attributes.id.value)
          .innerHTML= result==0?' Share(s)':result+' Share(s)';
         // console.log(document.getElementById(event.target.attributes.id.value.split('on')[1]));
       });



  //  let dialogref= this.dialog.open(CommentsComponent,{
  //     width:'600px',
  //     data:'test'
  //   })
  //   dialogref.afterClosed().subscribe(result=>{
  //     console.log(`dialog closed: ${result}`);
  //     this.dialogresult=result;
  //   });
  }


  ngOnInit() {
    this.posts=this.dataService.getPosts();
      this.posts.subscribe(result=>{
        this.allpost=result;
      });
  }

}