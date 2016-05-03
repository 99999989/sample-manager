import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  styles: [],
  providers: [],
  directives: [],
  pipes: []
})

export class Home {
  private _router:Router;


  constructor(router:Router) {

    this._router = router;
  }

  ngOnInit() {
  }

  public openOverlay() {
    $('.ripple').addClass("rippling");
    $('.button-wrapper').addClass("clicked").delay(1500).queue(function () {
      $('.layered-content').show();
      $('.layered-content').addClass("active");
    });
  }

  public closeOverlay() {
      $('.button-wrapper').removeClass("clicked");
      $('.ripple').removeClass("rippling");
      $('.layered-content').removeClass("active");
    $('.layered-content').hide();
  }
}
