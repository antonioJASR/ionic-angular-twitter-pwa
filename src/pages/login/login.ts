import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { TwitterProvider } from '../../providers/twitter/twitter';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isAuth$: Observable<boolean>;
  platforms: string[];
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public twitter: TwitterProvider,
    public platform: Platform,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.isAuth$ = this.twitter.isAuthenticated();
    this.platforms = this.platform.platforms();
  }

  ionViewCanLeave(): boolean {
    let canLeave = false;
    this.isAuth$.first().subscribe(isAuth => canLeave = isAuth);
    return canLeave;
  }

  login() {
    this.twitter.login().then(() => this.dismiss());
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}