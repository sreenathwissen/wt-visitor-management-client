import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @ViewChild('formRef') formRef!: NgForm;
  constructor(
    private _formBuilder: FormBuilder,
    private imageCompress: NgxImageCompressService
  ) {}
  purposes!: string[];
  locations!: string[];
  visitorTypes!: string[];
  IdProofs!: string[];
  isSubmitted!: boolean;
  formGroup = this._formBuilder.group({
    fullName: ['', Validators.required],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
    ],
    phoneNumber: [
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$'),
      ]),
    ],
    purpose: ['', Validators.required],
    poc: ['', Validators.required],
    pocEmail: [
      '',
      Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ],
    location: ['', Validators.required],
    profilePic: ['', Validators.required],
    visitorType: ['', Validators.required],
    IdProofNo: ['', Validators.required],
    IdProof: ['', Validators.required],
    IdPic: ['', Validators.required],
  });
  get f() {
    return this.formGroup.controls;
  }
  changePurpose(e: any) {
    this.formGroup.controls['purpose'].setValue(e.target.value);
  }
  changeLocation(e: any) {
    this.formGroup.controls['location'].setValue(e.target.value);
  }
  changeVisitorType(e: any) {
    this.formGroup.controls['visitorType'].setValue(e.target.value);
  }
  changeIdProof(e: any) {
    this.formGroup.controls['IdProof'].setValue(e.target.value);
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.formGroup.invalid) false;
    else {
      console.log(this.formGroup.value);
      // this.formGroup.reset();
      // this.formRef.reset();
    }
  }
  compressFile(controlName: string, width: number, height: number) {
    this.formGroup.controls[controlName].setValue('');
    this.formGroup.controls[controlName].markAsTouched();
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      if (image.indexOf('image') === -1) {
        this.formGroup.controls[controlName].setErrors({ notValid: true });
        return;
      }
      console.log(
        'Size in bytes of the uploaded image was:',
        this.imageCompress.byteCount(image)
      );
      this.imageCompress
        .compressFile(image, orientation, 50, 50, width, height) // 50% ratio, 50% quality
        .then((compressedImage) => {
          this.formGroup.controls[controlName].setValue(compressedImage);
          console.log(
            'Size in bytes after compression is now:',
            this.imageCompress.byteCount(compressedImage)
          );
        });
    });
  }
  ngOnInit(): void {
    this.purposes = ['meeting', 'interview', 'vendor', 'others'];
    this.locations = [
      'delhi',
      'banglore',
      'mumbai',
      'pune',
      'hyderabad',
      'chennai',
    ];
    this.visitorTypes = ['walkin', 'invited'];
    this.IdProofs = [
      'aadhaar',
      'voter_id',
      'passport',
      'pan',
      'driving_liscense',
    ];
  }
}
