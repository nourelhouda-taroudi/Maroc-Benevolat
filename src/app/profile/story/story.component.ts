import { UploadsService } from './../../core/services/uploads.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { associations } from 'src/app/models/associations';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from 'src/app/core/services/story.service';
import { PostService } from 'src/app/core/services/Services';
import { Story } from 'src/app/models/story';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  story?: Story;
  stories: Story[] = [];
  addblogform: any;
  islogIn:boolean=false;
  EmailVerfication!:string;
  registerForm3: FormGroup = new FormGroup({
    image: new FormControl(null),
  });
  imageError: string = '';
  selectedImg: File | undefined;
  imagePath: string = '';
  imgURL: any;
  total?: number;
  page: number = 1;
  edite = false;
  idAssociation!:number;
  @Input('association') association!: associations;
  showForm = true;
  mystory: Story = {
    text: '',
    image: '',
    like: true,
    commentaire: '',
    likeNum: 0,
    createdAt: new Date(),
    associationId: undefined,
  };

  constructor(
    private storyService: StoryService,
    private router: Router,
    private route: ActivatedRoute,
    private asso: PostService,
    public uploadsService: UploadsService,
    private tokenService:TokenService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterMap) => {
      this.idAssociation = Number(parameterMap.get('id'));
      this.getStories(this.idAssociation);
      this.getAssoci(this.idAssociation);
      this.isLoggedIn();
    });
  }
  getStories(idAssociation: number) {
    this.storyService
      .getAssociationStories(idAssociation)
      .subscribe((stories) => {
        this.stories = stories;
        this.total = this.stories.length;
      });
    
  }
  deletestory(id: any) {
    this.storyService.delete(id).subscribe(() => {
      this.stories = this.stories.filter((story) => story.id != id);
    });
  }
  persiststory() {
    this.mystory.image = this.registerForm3.getRawValue().image;
    this.mystory.associationId=this.idAssociation;
    this.storyService.persist(this.mystory).subscribe((story) => {
      this.stories = [story, ...this.stories];
      this.resetstory();
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
    console.log(this.uploadsService.uploadImage(data));
    this.uploadsService.uploadImage(data).subscribe(
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

  resetstory() {
    this.mystory = {
      text: '',
      image: '',
      like: false,
      commentaire: '',
      likeNum: 0,
      createdAt: new Date(),
    };
  }
  tolike(story: any) {
    this.storyService.likes(story.id, story.like).subscribe(() => {
      story.like = !story.like;
      if (!story.like) {
        story.likeNum++;
      } else story.likeNum--;
    });
  }
  editestory(story: any) {
    this.mystory = story;
    this.edite = true;
  }
  updatestory() {
    this.mystory.image = this.registerForm3.getRawValue().image;
    this.storyService.update(this.mystory).subscribe((story) => {
      this.resetstory();
      this.edite = false;
      this.showForm = false;
    });
  }
  close(story: any) {
    this.edite = false;
    this.mystory = story;
    this.resetstory();
    this.router.navigate(['profile', this.mystory.id]);
  }

  getAssoci(id: number) {
    return this.asso.getAssociationById(id).subscribe(
      (response) => {
        this.association = response;
        this.association.logo = this.uploadsService.getImage(response.logo);
        // console.log(this.association);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  isLoggedIn(){
    this.islogIn=this.tokenService.loggedIn();
    this.EmailVerfication=this.tokenService.getInfos().email;
  }
}
