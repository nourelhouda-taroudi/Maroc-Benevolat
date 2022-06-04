import { UploadsService } from './../../core/services/uploads.service';
import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/models/post';
import { associations } from 'src/app/models/associations';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { likes } from 'src/app/models/likes';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  queryParams!: string;
  numberOfPosts = 3;
  skipPosts = 0;

  statusdata = [{"id":1,"name":"Appels de dons "},{"id":2,"name":"Appel aux volontaires"},{"id":3,"name":"Annonce pour un évènement"}];
  value = this.statusdata[0];

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
  registerForm3: FormGroup = new FormGroup({
    image: new FormControl(null),
  });
  
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
   adresse:'',
   nbr_likes:0

  }

  posts: Post[]=[];
  addblogform: any;
  constructor(private postservice:PostService,
    public readonly uploadService:UploadsService,
    private asso: PostService,
    private route: ActivatedRoute,
    private http:HttpClient) { }

  ngOnInit(): void {
    this.getPosts(false,'');
  }
  // getPosts(){
  //   this.postservice.findAll().subscribe(posts => this.posts = posts)
  // }
  getPosts(isInitialLoad: boolean, event:any) {
    if (this.skipPosts === 3) {
      event.target.disabled = true;
    }
    this.queryParams = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;

    this.postservice
      .findAll(this.queryParams)
      .subscribe((posts: Post[]) => {
        for (let postIndex = 0; postIndex < posts.length; postIndex++) {
          this.posts.push(posts[postIndex]);
        }
        if (isInitialLoad) event.target.complete();
        this.skipPosts = this.skipPosts + 3;
      });
  }
  loadData(event:any) {
    this.getPosts(true, event);
  }
  deletepost(id: any){
    this.postservice.delete(id).subscribe(() =>{
      this.posts =this.posts.filter(post => post.id !=id)
    })
  }
  persistpost(){
    this.mypost.image=this.registerForm3.getRawValue().image; 
    this.postservice.persist(this.mypost).subscribe((post) =>{
      this.posts=[post, ...this.posts]
      this.resetpost();
      this.showForm = false;
      
    })
  }
  preview(event: any) {
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
    let data = new FormData();
    data.append('image', this.selectedImg);
    console.log(  this.uploadService.uploadImage(data));
    this.uploadService.uploadImage(data).subscribe(

      (res: any) => {
        this.registerForm3.get('image')?.setValue(res.filename);
    
      },
      (err) => {
        if (err.error.statusCode == 400) {
          this.imageError = err.error.message;
        }
      }
    );
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
    this.mypost.image=this.registerForm3.getRawValue().image;
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

    this.data={
    
      id_post: Number(`${post.id}`),
      adresse:`${this.ipAddress}`,
      nbr_likes:this.data.nbr_likes
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
