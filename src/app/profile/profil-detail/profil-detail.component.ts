import { Component, OnInit, Pipe } from '@angular/core';  
import { Post } from '../models/post';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrls: ['./profil-detail.component.css']
})

export class ProfilDetailComponent implements OnInit {
  edite = false;
  showForm = true;
  mypost:Post ={
    text:'',
    visualisation:'',
    image:'',
    like:true,
    commentaire:'',
    likeNum:0,
    createdAt:new Date()
  }
  posts: Post[]=[];
  addblogform: any;
  constructor(private postservice:PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts(){
    this.postservice.findAll().subscribe(posts => this.posts = posts)
  }
  deletepost(id: any){
    this.postservice.delete(id).subscribe(() =>{
      this.posts =this.posts.filter(post => post.id !=id)
    })
  }
  persistpost(){
    this.postservice.persist(this.mypost).subscribe((post) =>{
      this.posts=[post, ...this.posts]
      this.resetpost();
      this.showForm = false;
    })
  }
  onFileSelected(event: any){
    if(event.target.files.lenght>0){
      const file=event.target.files[0];
      this.addblogform.get('image').setValue(file);
    }
  }
  resetpost(){
    this.mypost={
      text:'',
    visualisation:'',
    image:'',
    like:false,
    commentaire:'',
    likeNum:0,
    createdAt:new Date()
    }
  }
  tolike(post:any){
    this.postservice.likes(post.id,post.like).subscribe(() => {
      post.like= !post.like;
      if(!post.like){
        post.likeNum++;
      }
      else post.likeNum--;
    })
  }
  editepost(post:any){
     this.mypost=post
     this.edite=true;
  }
  updatepost(){
    this.postservice.update(this.mypost).subscribe(post => {
      this.resetpost();
      this.edite = false;
      this.showForm =  false;
    })
  }
  close(){
      this.edite = false; 
      this.resetpost();
  }
}
