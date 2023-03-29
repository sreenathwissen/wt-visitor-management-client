import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @ViewChild('formRef') formRef!: NgForm;
  constructor(
    private _formBuilder: FormBuilder,
    private imageCompress: NgxImageCompressService,
    private toastr: ToastrService
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
    purposeOfVisit: ['', Validators.required],
    pointOfContact: ['', Validators.required],
    pointOfContactEmail: [
      '',
      Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ],
    location: ['', Validators.required],
    visitorImage: ['', Validators.required],
    visitorType: ['', Validators.required],
    idProofNumber: ['', Validators.required],
    idProofType: ['', Validators.required],
    idProofImage: ['', Validators.required],
  });
  get f() {
    return this.formGroup.controls;
  }
  changePurposeOfVisit(e: any) {
    this.formGroup.controls['purposeOfVisit'].setValue(e.target.value);
  }
  changeLocation(e: any) {
    this.formGroup.controls['location'].setValue(e.target.value);
  }
  changeVisitorType(e: any) {
    this.formGroup.controls['visitorType'].setValue(e.target.value);
  }
  changeIdProofType(e: any) {
    this.formGroup.controls['idProofType'].setValue(e.target.value);
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Please give valid form values', 'Invalid');
      false;
    } else {
      console.log(this.formGroup.value);
      this.toastr.success('Visitor Added Successfully', 'Success');
      this.formRef.resetForm();
      this.formGroup.reset();
      this.formGroup.markAsUntouched();
      this.isSubmitted = false;
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
