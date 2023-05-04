import { FormBuilder, NgForm, Validators } from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { RefdataService } from 'src/app/services/refdata.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @ViewChild('formRef') formRef!: NgForm;
  @Output() closeModal = new EventEmitter();
  constructor(
    private _formBuilder: FormBuilder,
    private imageCompress: NgxImageCompressService,
    private toastr: ToastrService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private refdataService: RefdataService
  ) {}
  purposes!: string[];
  showSpinner!: boolean;
  visitorTypes!: string[];
  timeOut: any;
  IdProofs!: string[];
  isSubmitted!: boolean;
  formGroup = this._formBuilder.group({
    id: [''],
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
    otherPurpose: [''],
    pointOfContact: ['', Validators.required],
    pointOfContactEmail: [
      '',
      Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ],
    location: ['', Validators.required],
    visitorImageBase64: ['', Validators.required],
    visitorType: [''],
    idProofNumber: ['', Validators.required],
    idProofType: ['', Validators.required],
    idProofImageBase64: [''],
    tempCardNo: [''],
    inTime: [''],
  });
  get f() {
    return this.formGroup.controls;
  }
  changePurposeOfVisit(e: any) {
    this.formGroup.controls['purposeOfVisit'].setValue(e.target.value);
    if (e.target.value === 'Others') {
      this.formGroup.controls['otherPurpose'].markAsTouched();
      this.formGroup.controls['otherPurpose'].setValidators(
        Validators.required
      );
    }
    this.formGroup.controls['visitorType'].setValue('');
    this.cdr.detectChanges();
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
  resetForm() {
    this.formGroup.reset();
    this.formRef.reset();
    this.isSubmitted = false;
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.formGroup.invalid) {
      this.toastr.error('Please give valid form values', 'Invalid');
      false;
    } else {
      this.showSpinner = true;
      if (this.f['otherPurpose'].value)
        this.f['purposeOfVisit'].setValue(this.f['otherPurpose'].value);
      this.f['visitorImageBase64'].setValue(
        this.f['visitorImageBase64'].value.replace('data:image/png;base64,', '')
      );
      if (this.f['idProofImageBase64'].value)
        this.f['idProofImageBase64'].setValue(
          this.f['idProofImageBase64'].value.replace(
            'data:image/png;base64,',
            ''
          )
        );
      console.log(this.formGroup.value);
      this.http
        .post('http://localhost:8080/api/visitor', this.formGroup.value)
        .subscribe(
          (resp: any) => {
            if (resp.responseStatus === 'SUCCESS') {
              this.toastr.success(
                'Visitor ' +
                  (this.formGroup.value.inTime ? 'Updated' : 'Added') +
                  ' Successfully',
                'Success'
              );
              //check if it is edit mode
              if (this.f['id'].value) {
                resp.responseData.editMode = true;
              }
              this.formRef.resetForm();
              this.formGroup.reset();
              this.formGroup.markAsUntouched();
              this.isSubmitted = false;
              //TODO: close modal and append resp to rowData
              this.closeModal.emit(resp.responseData);
            } else {
              this.handleFailure();
            }
          },
          (err) => {
            this.handleFailure();
          }
        )
        .add(() => {
          this.showSpinner = false;
        });
    }
  }
  handleFailure() {
    this.toastr.error('Some error occurred', 'Failure');
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
    this.refdataService
      .getRefdata()
      .subscribe((data: any) => {
        this.purposes = data?.responseData?.visitorsPurposes || [];
        this.visitorTypes = data?.responseData?.visitorsTypes || [];
        this.IdProofs = data?.responseData?.visitorsIdTypes || [];
      })
      .add(() => {
        this.refdataService.refDataObj = {
          purposes: this.purposes,
          visitorTypes: this.visitorTypes,
          IdProofs: this.IdProofs,
        };
      });
  }
}
