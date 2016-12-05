import {WebAPI} from './../resources/services/web-api';
import {inject} from 'aurelia-framework';

@inject(WebAPI)
export class AnotherPage{
  msg = 'New Page!';
  public posts;

  constructor(private api: WebAPI) {

    api.getPostList().then((data)=>{
      this.posts = data;
    });

  }
}
