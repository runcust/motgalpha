import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Profile } from '../models/profile.model';
import { Observable } from 'rxjs/Observable';//| {}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profilesCollection: AngularFirestoreCollection<Profile>;
  profiles: Observable<Profile[] | {}>;

  constructor(private firestore: AngularFirestore) {
    this.profiles = this.firestore.collection('users').valueChanges();
   }

   getProfiles(){
     return this.profiles;
   }

   getProfile(id:string){
     return this.firestore.collection('users', ref => ref.where('email', '==', id)).valueChanges();
   }
}
