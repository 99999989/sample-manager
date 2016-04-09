import {Component} from 'angular2/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user-service';
import {LoginRequest} from '../../models/login-request';
import {Router} from 'angular2/router';

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  styles: [`
     .parallax-container {
        height: 200px;
      }
    `],
  providers: [UserService],
  directives: [],
  pipes: []
})

export class Home {
  private _userService:UserService;
  private _router:Router;

  public user:User = new User();
  public newUser:User = new User();
  public login:LoginRequest = new LoginRequest();
  public authorized:boolean = false;

  constructor(userService:UserService, router:Router) {
    //$('.slider').slider({full_width: true});
    this._userService = userService;
    this._router = router;
  }

  ngOnInit() {
    this._userService.authorizeUser().subscribe(
      user => {
        this.user = user;
        this.authorized = true;
      },
      error =>  Materialize.toast(error, 2000)
    );
  }

  public registerUser(user:User) {
    this._userService.createUser(user).subscribe(
      user => {
        Materialize.toast('User ' + user.email + 'erfolgreich erstellt!', 4000);
        this.newUser = new User();
      },
        error =>  Materialize.toast(error, 4000)
    );
  }

  public loginUser(login:LoginRequest) {
    this._userService.loginUser(login).subscribe(
      user => {
        Materialize.toast((user.username || user.email) + ' eingeloggt!', 2000);
        this.user = user;
        this.authorized = true;
        this._router.navigate(['Projects']);
      },
      error =>  Materialize.toast(error, 4000)
    );
  }

  public logoutUser() {
    this._userService.logoutUser().subscribe(
      user => {
        Materialize.toast((user.username || user.email) + ' ausgeloggt!!', 2000);
        this.authorized = false;
        this.user = null;
      },
      error =>  Materialize.toast(error, 4000)
    );
  }
}
