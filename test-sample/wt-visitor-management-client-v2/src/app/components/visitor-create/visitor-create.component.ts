import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { RefdataDto } from 'src/app/model/refdata-dto';
import { RefDataService } from 'src/app/service/refdata.service';
import { VisitorService } from 'src/app/service/visitor.service';
import { AppConstants } from '../constants/app.constants';


@Component({
  selector: 'app-visitor-create',
  templateUrl: './visitor-create.component.html',
  styleUrls: ['./visitor-create.component.scss']
})
export class VisitorCreateComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  @ViewChild('reset') reset!: ElementRef;

  imagePreview: any = AppConstants.defaultProfileImageUrl;
  refdata: RefdataDto = new RefdataDto();


  constructor(private formBuilder: FormBuilder, private visitorService: VisitorService, private refdataService: RefDataService, private imageCompress: NgxImageCompressService) { }

  ngOnInit() {
    this.fetchRefdata();
    //initializing the form
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
      visitorType: ['', Validators.required,],
      proofType: ['', Validators.required,],
      idProofNumber: ['', Validators.required],
      employeeId: ['', Validators.required],
      profileImage: ['', Validators.required],
      tempCardNo: ['',],
      location: ['Bangalore'],
      visitorImageBase64: ['']

    });
  }

  /** Fetch Refdata from the service */
  fetchRefdata() {
    if (this.refdata.visitorsTypes.length == 0) {
      this.refdataService.refdataApiCall().subscribe((data: any) => {
        if (data.responseStatus == 'SUCCESS') {
          this.refdata.proofTypes = data?.responseData?.proofTypes || [];
          this.refdata.visitorsTypes = data?.responseData?.visitorsTypes || [];
        }
      }).add(() => {
        console.log(this.refdata)
      });
    }
  }

  /** Used for form validation */
  get form(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  /** Preview of Imge in the form */
  previewImage(files: any) {
    var reader = new FileReader();
    let imageFile = files[0]; //this will have value insince this method will invoke post image selection
    let imageType = imageFile.type;
    reader.readAsDataURL(imageFile);
    reader.onload = (_event) => {
      this.imagePreview = reader.result;
      this.compressFile(reader.result, imageType);
    }
  }

  /** Compress image and assigne the value to the form with base 64 conversion */
  compressFile(image: any, imageType: string) {
    console.log('Image type selected is :', imageType);
    var orientation = -1;
    let sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.info('Size in bytes is now:', sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        let imgResultAfterCompress = result;
        let sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
        console.info('Size in bytes after compression:', sizeOFCompressedImage);
        let replaceData = 'data:' + imageType + ';base64,';
        let stringImage = result.replace(replaceData, '');
        this.registerForm.controls['visitorImageBase64'].setValue(stringImage);
        /*       // create file from byte
              const imageName = fileName;
              // call method that creates a blob from dataUri
              const imageBlob = this.dataURItoBlob(imgResultAfterCompress.split(',')[1]);
              //imageFile created below is the new compressed file which can be send to API in form data
              const imageFile = new File([result], imageName, { type: 'image/jpeg' }); */
      });
  }


  /** On Reset of Visitor Form */
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    //default image of the form
    this.imagePreview = AppConstants.defaultProfileImageUrl;

    this.registerForm.controls['proofType'].setValue('');//testing for please select
  }


  /** On clicking Submitting visitor form */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    let jsonString = JSON.stringify(this.registerForm.value, null, 4);
    console.log(jsonString);
    this.saveVisitor(jsonString);
  }


  saveVisitor(jsonString: string) {
    this.visitorService.saveVisitor(jsonString).subscribe(
      (resp: any) => {
        if (resp.responseStatus === 'SUCCESS') {
          //success toaster
          console.log('Successfully Saved!!');
          this.onReset();
        } else {
          //failure toaster
          console.log('Failed to Saved!!');
        }
      },
      (err) => {
        //failure toaster
        console.log('Error Occurred');
      }
    ).add(() => {
      console.log('Successfully Saved!! - end');
    });
  }
}




