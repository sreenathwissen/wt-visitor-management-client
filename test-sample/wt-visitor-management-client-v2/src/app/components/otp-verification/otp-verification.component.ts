import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitorService } from 'src/app/service/visitor.service';
import { VisitorExistComponent } from '../visitor-exist/visitor-exist.component';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private visitorService: VisitorService, private router: Router) { }


  otpVerificationForm!: FormGroup;
  submitted = false;
  retryCount = 3;

  ngOnInit(): void {
    console.log(history.state);
    this.otpVerificationForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }

  /** Used for form validation */
  get form(): { [key: string]: AbstractControl } {
    return this.otpVerificationForm.controls;
  }


  /** On clicking Submitting visitor form */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.otpVerificationForm.invalid) {
      return;
    }

    // display form values on success
    let jsonString = JSON.stringify(this.otpVerificationForm.value, null, 4);
    console.log(jsonString);
    this.validateOTP()
  }

  private validateOTP() {

    let phEmail = this.otpVerificationForm.controls['otp'].value;
    let url:string = "?otp=".concat(phEmail);
    console.log(url);

    this.router.navigateByUrl('/thankyou');
  }

  /** Method to resend the otp to the registerd emailId */
  resendOtp(){
    if(this.retryCount>0){
      console.log(history.state);
      this.visitorService.otpQueryParams = history.state;
      this.visitorService.otpSubject.next(true);
      //this.existVisitor.sendOtpToVisitor(history.state);
    }
  }
}
