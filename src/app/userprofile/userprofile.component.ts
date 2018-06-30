import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';
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
export class UserprofileComponent implements OnInit {

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
    this.profileService.getProfiles().subscribe(profile => {
     this.profiles = profile;
    });
    const userId = 'seaviewpebbles@gmail.com';
    this.reviews = this.reviewService.getReviews(userId);

    this.avgRating = this.reviews.map(arr => {
      var avg;
      const ratings = arr.map(v => v.rating);
      this.reviewCount = ratings.length;
      avg = ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed';
      this.starRating(avg);
      return avg;
    });
  }

  numericalRating(ratingElem) {
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

  starRating(dataRating) {
    console.log('dataRating: ' + dataRating);
    var starRatings = $('.star-rating');
    $('.star-rating .star').remove();
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
              starRatings.append(fiveStars);
          } else if (dataRating >= 4.25) {
              starRatings.append(fourHalfStars);
          } else if (dataRating >= 3.75) {
              starRatings.append(fourStars);
          } else if (dataRating >= 3.25) {
              starRatings.append(threeHalfStars);
          } else if (dataRating >= 2.75) {
              starRatings.append(threeStars);
          } else if (dataRating >= 2.25) {
              starRatings.append(twoHalfStars);
          } else if (dataRating >= 1.75) {
              starRatings.append(twoStars);
          } else if (dataRating >= 1.25) {
              starRatings.append(oneHalfStar);
          } else if (dataRating < 1.25) {
              starRatings.append(oneStar);
          }
  }
}
