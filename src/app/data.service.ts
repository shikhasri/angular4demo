import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Headers, Http,RequestOptions } from '@angular/http';
@Injectable()
export class DataService {
private headers = new Headers({ 'Content-Type': 'application/json' });
	options: RequestOptions = new RequestOptions({ headers: this.headers });
  	private userurl='/api/allresult';
  	constructor(private http: Http) { }
	  	
    private extractData(res) {
		let body = res.json();
		console.log("from server-----  "+JSON.stringify(body));
    	return body;
    } 


    postUserData(userdata:any): Observable<String>{
    		
	  	return this.http.post("/api/save",userdata,this.options).map(this.extractData).catch(this.handleErrorObservable);
	   
		}
		

		userLogin(email: String,password: String ): Observable<any[]>{
			var data={'email':email,'password':password};
				return this.http.post("/api/validatelogin",data,this.options).map(this.extractData).catch(this.handleErrorObservable);
		}
	
	  SubmitpostData(postcontent:string): Observable<any>{
    		
	   	return this.http.post("/api/submitpost",postcontent,this.options).map(this.extractData).catch(this.handleErrorObservable);
	  }
	
	  getPosts(): Observable<any[]>{
     return this.http.get('/api/getallpost').map(this.extractData).catch(this.handleErrorObservable);
	  }

	  likePosts(postid: number): Observable<number>{
		 
	 	 return this.http.post('/api/likepost',postid,this.options).map(this.extractData).catch(this.handleErrorObservable);
	  }

	  commentOnPosts(postid: number,commentcontent: String): Observable<number>{
		 var data={'postid':postid,'comentval':commentcontent};
		 return this.http.post('/api/submitcomment',data,this.options).map(this.extractData).catch(this.handleErrorObservable);
	  }
     
    sharePost(postid : number): Observable<number>{
      let data={'postid':postid};
      return this.http.post('/api/sharepost',data,this.options).map(this.extractData).catch(this.handleErrorObservable);
    }
	  getPostcomments(postid:number):Observable<any>{
		
		 return this.http.post('/api/getcomments',postid,this.options).map(this.extractData).catch(this.handleErrorObservable);
	  }

   private handleErrorObservable (error: Response | any) {
    	console.log("error data in service-----    "+error||error);
	    console.error(error|| error);
		return Observable.throw(error || error);
    }
}
