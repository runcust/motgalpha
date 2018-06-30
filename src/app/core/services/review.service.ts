import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Review } from '../models/review.model';
//import { Observable } from 'rxjs';
import { Observable } from "rxjs-compat";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private firestore: AngularFirestore) { }

   getReviews(id: string){
    return this.firestore.collection('reviews', ref => ref.where('reviewee', '==', id)).valueChanges();
   }
}
