import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/core/services/story.service ';
import { Story } from 'src/app/models/story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  total?:number;
  page:number=1;
  edite = false;
  showForm = true;
  mystory:Story ={
    text:'',
    image:'',
    like:true,
    commentaire:'',
    likeNum:0,
    createdAt:new Date()
  }
  stories: Story[]=[];
  addblogform: any;
  constructor(private storyService:StoryService) { }

  ngOnInit(): void {
    this.getStory();
  }
  getStory(){
    this.storyService.findAll().subscribe(stories => this.stories = stories)
    this.total=this.stories.length;
  }
  deletestory(id: any){
    this.storyService.delete(id).subscribe(() =>{
      this.stories =this.stories.filter(story => story.id !=id)
    })
  }
  persiststory(){
    this.storyService.persist(this.mystory).subscribe((story) =>{
      this.stories=[story, ...this.stories]
      this.resetstory();
      this.showForm = false;
    })
  }
  onFileSelected(event: any){
    if(event.target.files.lenght>0){
      const file=event.target.files[0];
      this.addblogform.get('image').setValue(file);
    }
  }
  resetstory(){
    this.mystory={
      text:'',
    image:'',
    like:false,
    commentaire:'',
    likeNum:0,
    createdAt:new Date()
    }
  }
  tolike(story:any){
    this.storyService.likes(story.id,story.like).subscribe(() => {
      story.like= !story.like;
      if(!story.like){
        story.likeNum++;
      }
      else story.likeNum--;
    })
  }
  editestory(story:any){
     this.mystory=story
     this.edite=true;
  }
  updatestory(){
    this.storyService.update(this.mystory).subscribe(story => {
      this.resetstory();
      this.edite = false;
      this.showForm =  false;
    })
  }
  close(){
      this.edite = false; 
      this.resetstory();
  }

}
