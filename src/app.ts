import {Router, RouterConfiguration} from 'aurelia-router';
import {inject, computedFrom} from 'aurelia-framework';
import {WebAPI} from './resources/services/web-api';

@inject(WebAPI)
export class App {
  router: Router;

  constructor(public api: WebAPI) {}

  @computedFrom('router.currentInstruction.config.title')
  get routeClassName(): string{
    if(this.router.currentInstruction) {
      let className;

      if(this.router.currentInstruction.config.settings.routeClass){
        className = this.router.currentInstruction.config.settings.routeClass;
      }else if(this.router.currentInstruction.config.title){
        className = this.router.currentInstruction.config.title;
      }

      if(className){
        className = className
          .toLowerCase()
          .replace(/&/g, 'and')
          .replace(/\s+/g, '-');

        className = className + '-route';

        return className;
      }

    }
  }

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: '', moduleId: './pages/no-selection', title: 'Select', nav:true, settings: {routeClass: 'Home Page'}},
      { route: 'contacts/:id',  moduleId: './pages/contact-detail', name:'contacts' },
      { route: 'another-page', moduleId: './pages/another-page', title:'Another Page', nav:true}
    ]);

    this.router = router;


  }
}
