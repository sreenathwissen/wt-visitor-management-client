import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goToForms(): void {
    this.router.navigate(['/add']);
  }

}
