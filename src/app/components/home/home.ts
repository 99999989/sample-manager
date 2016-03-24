import {Component} from 'angular2/core';

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  styles: [`
     .parallax-container {
        height: 200px;
      }
    `],
  providers: [],
  directives: [],
  pipes: []
})

export class Home {

  constructor() {
    $('.slider').slider({full_width: true});
  }

}
