import { UploadsService } from './../../core/services/uploads.service';
import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/models/post';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { likes } from 'src/app/models/likes';
import { associations } from 'src/app/models/associations';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input('association') association!: associations;
  public demandes!:likes
  ipAddress = '';
  index?:Number;
  imageError:string="";
  selectedImg:File | undefined; 
  imagePath:string="";
  imgURL:any;
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

  data: likes={
  
    id_post:0,
   adresse:''

  }

  posts: Post[]=[];
  addblogform: any;
  constructor(private postservice:PostService,
    private readonly uploadService:UploadsService,
    private http:HttpClient
    ) { }

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
  // onFileSelected(event: any){
  //   if(event.target.files.lenght>0){
  //     const file=event.target.files[0];
  //     this.addblogform.get('image').setValue(file);
  //   }
  // }
  preview(event:any) {
    if (event.target.files.length === 0) return;

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.imageError = 'Vous devez choisir une image!!!';
      return;
    } else {
      this.imageError = '';
      this.selectedImg = <File>event.target.files[0];

      var reader = new FileReader();
      this.imagePath = event.target.files;

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
    let data=new FormData();
    data.append('image',this.selectedImg);
    this.uploadService.uploadImage(data).subscribe((res:any)=>{
      this.posts.push(res.filname);
      // console.log(this.registerForm3.get('logo')?.value);
    },
    err=>{
      // console.log(err);
      if(err.error.statusCode==400){
         this.imageError=err.error.message;
      }
    })
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
  // tolike(post:any){
  //   this.postservice.likes(post.id,post.like).subscribe(() => {
  //     post.like= !post.like;
  //     if(!post.like){
  //       post.likeNum++;
  //     }
  //     else post.likeNum--;
  //   })
  // }
  editepost(post:any){
     this.mypost=post;
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

id!:number
  tolike(post:any,data:any) {

    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    console.log(this.ipAddress)
    console.log(post.id)
    console.log(data.id)
    this.data={
    
      id_post: Number(`${post.id}`),
      adresse:`${this.ipAddress}`,
   }

   console.log(this.data)
    return this.postservice.getAdress(this.data).subscribe(
      
      (response) => {
        
     
       console.log(response)
       if(response === null){
      
           this.postservice.saveAdresse(this.data).subscribe(
            (res) => {
           
            },
           
          );
        
        this.postservice.likes(post.id,post.like).subscribe(() => {
          post.like= !post.like;
          if(!post.like){
            post.likeNum++;
      
          }
     
        })

   
  



       }else{
         
       
        
            post.likeNum--;
       
            this.postservice.deletelike(Object.values(response)[0]).subscribe(() =>{
              
              console.log("deleted")
            })
           
      
          
     
        }
       
      
   
       
      
      },
     
    );
  })

  
  }


  deleteDemande(id: any){
    this.postservice.deletelike(id).subscribe(() =>{
              
      console.log("deleted")
    })
   
  }

}