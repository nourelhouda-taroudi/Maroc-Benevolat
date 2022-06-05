export interface Story {
  id?: number;
  text: string;
  image: string;
  like: boolean;
  commentaire: string;
  likeNum: number;
  createdAt: Date;
  associationId?: number;
}
