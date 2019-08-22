import { Component, OnInit } from '@angular/core';

/* Facebook Plugin */
import { Facebook } from '@ionic-native/facebook/ngx';

/* Firebase Angular */
import * as firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private firebaseAuth: AngularFireAuth, private facebook: Facebook) { 
    this.firebaseAuth.authState.subscribe((user: firebase.User) => {
      if(user){
        console.log('User is logged in', user);
      } else {
        console.log('No logged in')
      }
    });
  }

  ngOnInit() {
  }

  async facebookLogin() {
    try {
      const fbResponse = await this.facebook.login(['public_profile', 'user_friends', 'email']);
      console.log(fbResponse);
      const fbCredential = firebase.auth.FacebookAuthProvider.credential(fbResponse.authResponse.accessToken);
      const fireResponse = await firebase.auth().signInWithCredential(fbCredential);
      console.log(fireResponse);
    } catch (err) {
      console.log('Error login Facebook', err);
    }
  }

}
