import { TokenService } from '../../core/services/token.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';

import { associations } from 'src/app/models/associations';
import { likes } from 'src/app/models/likes';
import { Post } from 'src/app/models/post';
import { UploadsService } from '../../core/services/uploads.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {

  //param login
  islogIn:boolean=false;
  EmailVerfication!:string;
  statusdata = [
    { id: 1, name: 'Appels de dons ' },
    { id: 2, name: 'Appel aux volontaires' },
    { id: 3, name: 'Annonce pour un évènement' },
  ];
  value = this.statusdata[0];

  @Input('association') association!: associations;
  public demandes!: likes;
  ipAddress = '';
  index?: Number;
  imageError: string = '';
  selectedImg: File | undefined;
  imagePath: string = '';
  imgURL: any;
  edite = false;
  showForm = true;
  registerForm3: FormGroup = new FormGroup({
    image: new FormControl(null),
  });

  mypost: Post = {
    text: '',
    visualisation: '',
    image: '',
    like: true,
    commentaire: '',
    likeNum: 0,
    createdAt: new Date(),
    associationId: undefined
  };

  data: likes = {
    id_post: 0,
    adresse: '',
  };
  idAssociation!: number;

  posts: Post[] = [];
  addblogform: any;
  constructor(
    private postservice: PostService,
    private readonly uploadService: UploadsService,
    private readonly route: ActivatedRoute,
    private http: HttpClient,
    private tokenService:TokenService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterMap) => {
      this.idAssociation = Number(parameterMap.get('id'));
      this.getPosts();
      this.isLoggedIn();
    });
  }
  // Get association posts
  getPosts() {
    this.postservice
      .getAssociationPosts(this.idAssociation)
      .subscribe((posts) =>{
        this.posts = posts;
      });    
  }
 
    deletepost(id: any){
      this.postservice.delete(id).subscribe(() =>{
        this.posts =this.posts.filter(post => post.id !=id)
      })
    }
  persistpost() {
    this.mypost.image = this.registerForm3.getRawValue().image;
    this.mypost.associationId = this.idAssociation;
    this.postservice.persist(this.mypost).subscribe((post) => {
      this.posts = [post, ...this.posts];
      this.resetpost();
      this.showForm = false;
    });
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
    console.log(this.uploadService.uploadImage(data));
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
  resetpost() {
    this.mypost = {
      text: '',
      visualisation: '',
      image: '',
      like: false,
      commentaire: '',
      likeNum: 0,
      createdAt: new Date(),
    };
  }
  editepost(post: any) {
    this.mypost = post;
    this.edite = true;
  }
  updatepost() {
    this.mypost.image = this.registerForm3.getRawValue().image;
    this.postservice.update(this.mypost).subscribe((post) => {
      this.resetpost();
      this.edite = false;
      this.showForm = false;
    });
  }
  close() {
    this.edite = false;
    this.resetpost();
  }

  tolike(post: any) {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.ipAddress = res.ip;
      this.data = {
        id_post: Number(`${post.id}`),
        adresse: `${this.ipAddress}`,
      };

      console.log(this.data);
      return this.postservice.getAdress(this.data).subscribe((response) => {
        console.log(response);
        if (response === null) {
          this.postservice.saveAdresse(this.data).subscribe((res) => {});
              post.likeNum++;
              console.log(post.likeNum)
              this.mypost = post;
              console.log('heree' + post);
              this.postservice.update(post).subscribe((post) => {
                this.resetpost();
              });
            
       
        } else {
          post.likeNum--;
          this.mypost = post;

          this.postservice.update(post).subscribe((post) => {
            this.resetpost();
          });
          this.postservice
            .deletelike(Object.values(response)[0])
            .subscribe(() => {
              console.log('deleted');
            });
        }
      });
    });
  }

  deleteDemande(id: any) {
    this.postservice.deletelike(id).subscribe(() => {
      console.log('deleted');
    });
  }

  getImage(image: string){
    return this.uploadService.getImage(image);
  }
  isLoggedIn(){
    this.islogIn=this.tokenService.loggedIn();
    this.EmailVerfication=this.tokenService.getInfos().email;
  }
}

