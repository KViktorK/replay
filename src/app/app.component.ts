import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { bids, IBid } from './bid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private datePipe: DatePipe) {}
  bidToShow: IBid = bids[0];
  CURRENT_INDEX: number = 0;
  LAST_INDEX: number = bids.length - 1;
  secondsCounter = interval(Math.random()*4000);

  convertDate(mil: number) {
    const convertedDate = this.datePipe.transform(mil, 'MMM d, y, h:mm:ss a');
    return convertedDate;
  }
  ngOnInit() {
    const subscription = this.secondsCounter.subscribe((n) => {
      this.CURRENT_INDEX += 1;
      this.bidToShow = bids[this.CURRENT_INDEX];
      if (this.CURRENT_INDEX === this.LAST_INDEX) {
        console.log('UNSUBSCRIBED EVENT');
        subscription.unsubscribe();
      }
    });
  }
}
