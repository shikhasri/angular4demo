import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit,OnChanges {

  comments: Observable<any[]>;
    pcomments=[];
  constructor(private dataService:DataService) { }
  @Input() data;
  ngOnInit() {

  }
  ngOnChanges()
  {
    console.log(this.data);
    //this.dataService.getPostcomments(this.data).subscribe(result=>console.log(result));

     this.comments=this.dataService.getPostcomments(this.data);
        this.comments.subscribe(result=>{
           this.pcomments=result;
         });
 	  }
  }

