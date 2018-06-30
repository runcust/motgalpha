import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Profile } from '../core/models/profile.model';
import { ProfileService } from '../core/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../core/services/review.service';
import { Observable } from 'rxjs-compat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit, AfterViewInit {

  profiles: Profile[] | {};
  avgRating: any;
  reviews: Observable<any>;
  reviewCount: number;

  constructor(
    private profileService: ProfileService,
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.profileService.getProfile('seaviewpebbles@gmail.com').subscribe(profile => {
    //   debugger;
    // this.profiles = profile;
    // });
    this.profileService.getProfiles().subscribe(profile => {
     this.profiles = profile;
    });
    const userId = 'seaviewpebbles@gmail.com';
    this.reviews = this.reviewService.getReviews(userId);

    this.avgRating = this.reviews.map(arr => {
      const ratings = arr.map(v => v.rating);
      this.reviewCount = ratings.length;
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed';
    });
  }

  ngAfterViewInit(): void {
    this.numericalRating('.numerical-rating');
    this.starRating('.star-rating');
  }

  numericalRating(ratingElem) {
debugger;
    $(ratingElem).each(function() {
      const dataRating = +$(this).attr('data-rating');

      // Rules
        if (dataRating >= 4.0) {
            $(this).addClass('high');
        } else if (dataRating >= 3.0) {
            $(this).addClass('mid');
        } else if (dataRating < 3.0) {
            $(this).addClass('low');
        }
    });
  }

  starRating(ratingElem) {
    debugger;
   // $(ratingElem).each(function() {
      const dataRating = this.avgRating; // +$(this).attr('data-rating');
      console.log('dataRating: ' + dataRating);
      // Rating Stars Output
      function starsOutput(firstStar, secondStar, thirdStar, fourthStar, fifthStar) {
        return('' +
          '<span class="' + firstStar + '"></span>' +
          '<span class="' + secondStar + '"></span>' +
          '<span class="' + thirdStar + '"></span>' +
          '<span class="' + fourthStar + '"></span>' +
          '<span class="' + fifthStar + '"></span>');
      }

      const fiveStars = starsOutput('star', 'star', 'star', 'star', 'star');

      const fourHalfStars = starsOutput('star', 'star', 'star', 'star', 'star half');
      const fourStars = starsOutput('star', 'star', 'star', 'star', 'star empty');

      const threeHalfStars = starsOutput('star', 'star', 'star', 'star half', 'star empty');
      const threeStars = starsOutput('star', 'star', 'star', 'star empty', 'star empty');

      const twoHalfStars = starsOutput('star', 'star', 'star half', 'star empty', 'star empty');
      const twoStars = starsOutput('star', 'star', 'star empty', 'star empty', 'star empty');

      const oneHalfStar = starsOutput('star', 'star half', 'star empty', 'star empty', 'star empty');
      const oneStar = starsOutput('star', 'star empty', 'star empty', 'star empty', 'star empty');

      // Rules
          if (dataRating >= 4.75) {
              $(this).append(fiveStars);
          } else if (dataRating >= 4.25) {
              $(this).append(fourHalfStars);
          } else if (dataRating >= 3.75) {
              $(this).append(fourStars);
          } else if (dataRating >= 3.25) {
              $(this).append(threeHalfStars);
          } else if (dataRating >= 2.75) {
              $(this).append(threeStars);
          } else if (dataRating >= 2.25) {
              $(this).append(twoHalfStars);
          } else if (dataRating >= 1.75) {
              $(this).append(twoStars);
          } else if (dataRating >= 1.25) {
              $(this).append(oneHalfStar);
          } else if (dataRating < 1.25) {
              $(this).append(oneStar);
          }
    // });
  }
}
