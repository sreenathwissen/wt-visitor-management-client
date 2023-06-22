import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  constructor(private router: Router) { }

  timeLeft: number = 5;
  interval: any;


  ngOnInit(): void {
    this.startTimer();
  }

  /** Timer to dispaly in screen with reducing time for 5 sec to 0 sec */
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.router.navigate(['/']); // will redirect to home page
      }
    }, 1000)
  }

  /** On component destroy */
  ngOnDestroy() {
    clearInterval(this.interval);
    this.timeLeft = 5;
  }

}

