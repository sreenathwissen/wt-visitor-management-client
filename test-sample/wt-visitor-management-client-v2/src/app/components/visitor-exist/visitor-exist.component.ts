import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitorService } from 'src/app/service/visitor.service';

@Component({
  selector: 'app-visitor-exist',
  templateUrl: './visitor-exist.component.html',
  styleUrls: ['./visitor-exist.component.scss']
})
export class VisitorExistComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private visitorService: VisitorService, private router: Router) { }


  otpForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      phEmail: ['', Validators.required]
    });

    this.visitorService.otpSubject.subscribe(()=>{
      this.sendOtpToVisitor(this.visitorService.otpQueryParams);
    });

  }

  /** Used for form validation */
  get form(): { [key: string]: AbstractControl } {
    return this.otpForm.controls;
  }


  /** On clicking Submitting visitor form */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.otpForm.invalid) {
      return;
    }

    // display form values on success
    let jsonString = JSON.stringify(this.otpForm.value, null, 4);
    console.log(jsonString);
    //get the form values to send to the api
    let phEmail = this.otpForm.controls['phEmail'].value;
    let inputParams: string = "?phEmail=".concat(phEmail);
    let isOtpSent = this.sendOtpToVisitor(inputParams);
    if (isOtpSent) {
      //successfully OTP sent the rgistered email id 
      this.router.navigateByUrl('/verification', { state: { queryParams: inputParams } });
      this.otpForm.reset();
    }
    //reset form
    this.submitted = false;
  }

  public sendOtpToVisitor(queryParams: string): boolean {
    console.log('successfully sent the otp');
    return true; // Remove post API calling is done
    let response = false;
    this.visitorService.sendOtpToVisitor(queryParams).subscribe(
      (resp: any) => {
        if (resp.responseStatus === 'SUCCESS') {
          //success toaster
          console.log('Successfully Sent!!');
          response = true;
        } else {
          //failure toaster
          console.log('Failed to send OTP!!');
        }
      },
      (err) => {
        //failure toaster
        console.log('Error Occurred');
      }
    ).add(() => {
      console.log('!! - end - !!');
    });
    return response;
  }
}

