import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { mimeType } from '../../mime-type.validator';
import { EmployeesService } from '../employees.service';
import { EmployeeType } from '../employees.model';
// import { JobPositionType } from '../../jobPositions/jobPositions.model';
// import { JobPositionsService } from '../../jobPositions/jobPositions.service';
// import { DepartmentType } from '../../Departments/departments.model';
// import { DepartmentsService } from '../../Departments/departments.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './addEmployee.component.html'
})

export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  private mode = 'AddEmployee';
  private employeeId: string;
  private employee: EmployeeType;
  public nationalities: string[];
  public imagePreview: string;
// public jobPositions: JobPositionType [] = [];
  private jobPositionSub: Subscription;
// public departments: DepartmentType[] = [];
  private departmentsSub: Subscription;
  private employeesSub: Subscription;
  public selectedJob: string;
  public sallaryFrom;
  public sallaryTo;
  public isMarried;
  public selectedBD = new Date();
  public nowDate = new Date();
  public BDyear;
  public nowYear;
  public ageValue;
  public age;
  constructor(
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public EmployeesService: EmployeesService,
    // public JobPositionsService: JobPositionsService,
    // public DepartmentsService: DepartmentsService
  ) { }
  ngOnInit() {
    this.form = new FormGroup({
       firstName: new FormControl(null, { validators: [Validators.required]}),
       lastName: new FormControl(null, { validators: [Validators.required] }),
       birthDate: new FormControl(null, { validators: [Validators.required, Validators.min(18)] }),
      personalEmail: new FormControl(null),
       personalMobile: new FormControl(null),
       workEmail: new FormControl(null),
       workPhone: new FormControl(null),
       nationality: new FormControl(null),
       identificationNo: new FormControl(null),
       passportNo: new FormControl(null),
       address: new FormControl(null),
       gender: new FormControl(null),
       maritalStatus: new FormControl(null),
       image: new FormControl(null),
       jobPosition: new FormControl(null),
       status: new FormControl(null),
       jobType: new FormControl(null),
       salary: new FormControl(null),
       startedDate: new FormControl(null),
       certificateLevel: new FormControl(null),
       fieldsOfStudy: new FormControl(null),
       school: new FormControl(null),
       numOfChildren: new FormControl(0),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('employeeId')) {
        this.mode = 'editEmployee';
        this.employeeId = paramMap.get('employeeId');
        this.EmployeesService.getEmployee(this.employeeId).subscribe(
          employeeData => {
            this.employee = {
              id: employeeData._id,
              firstName: employeeData.firstName,
              lastName: employeeData.lastName,
              birthDate: employeeData.birthDate,
              age: employeeData.age,
              personalEmail: employeeData.personalEmail,
              personalMobile: employeeData.personalMobile,
              workEmail: employeeData.workEmail,
              workPhone: employeeData.workPhone,
              nationality: employeeData.nationality,
              identificationNo: employeeData.identificationNo,
              passportNo: employeeData.passportNo,
              address: employeeData.address,
              gender: employeeData.gender,
              maritalStatus: employeeData.maritalStatus,
              imagePath: employeeData.imagePath,
              jobPosition: employeeData.jobPosition,
              status: employeeData.status,
              jobType: employeeData.jobType,
              salary: employeeData.salary,
              startedDate: employeeData.startedDate,
              certificateLevel: employeeData.certificateLevel,
              fieldsOfStudy: employeeData.fieldsOfStudy,
              school: employeeData.school,
              numOfChildren: employeeData.numOfChildren
            };
            this.form.setValue({
              firstName: this.employee.firstName,
              lastName: this.employee.lastName,
              birthDate: this.employee.birthDate,
              age: this.employee.age,
              personalEmail: this.employee.personalEmail,
              personalMobile: this.employee.personalMobile,
              workEmail: this.employee.workEmail,
              workPhone: this.employee.workPhone,
              nationality: this.employee.nationality,
              identificationNo: this.employee.identificationNo,
              passportNo: this.employee.passportNo,
              address: this.employee.address,
              gender: this.employee.gender,
              maritalStatus: this.employee.maritalStatus,
              image: this.employee.imagePath,
              jobPosition: this.employee.jobPosition,
              status: this.employee.status,
              jobType: this.employee.jobType,
              salary: this.employee.salary,
              startedDate: this.employee.startedDate,
              certificateLevel: this.employee.certificateLevel,
              fieldsOfStudy: this.employee.fieldsOfStudy,
              school: this.employee.school,
              numOfChildren: this.employee.numOfChildren
            });
            this.imagePreview = this.employee.imagePath;
          }
        );
      } else {
        this.mode = 'AddEmployee';
        this.employeeId = null;
      }
    });

    this.nationalities = [
      'Afghan',
      'Albanian',
      'Algerian',
      'American',
      'Andorran',
      'Angolan',
      'Antiguans',
      'Argentinean',
      'Armenian',
      'Australian',
      'Austrian',
      'Azerbaijani',
      'Bahamian',
      'Bahraini',
      'Bangladeshi',
      'Barbadian',
      'Barbudans',
      'Batswana',
      'Belarusian',
      'Belgian',
      'Belizean',
      'Beninese',
      'Bhutanese',
      'Bolivian',
      'Bosnian',
      'Brazilian',
      'British',
      'Bruneian',
      'Bulgarian',
      'Burkinabe',
      'Burmese',
      'Burundian',
      'Cambodian',
      'Cameroonian',
      'Canadian',
      'Cape Verdean',
      'Central African',
      'Chadian',
      'Chilean',
      'Chinese',
      'Colombian',
      'Comoran',
      'Congolese',
      'Costa Rican',
      'Croatian',
      'Cuban',
      'Cypriot',
      'Czech',
      'Danish',
      'Djibouti',
      'Dominican',
      'Dutch',
      'East Timorese',
      'Ecuadorean',
      'Egyptian',
      'Emirian',
      'Equatorial Guinean',
      'Eritrean',
      'Estonian',
      'Ethiopian',
      'Fijian',
      'Filipino',
      'Finnish',
      'French',
      'Gabonese',
      'Gambian',
      'Georgian',
      'German',
      'Ghanaian',
      'Greek',
      'Grenadian',
      'Guatemalan',
      'Guinea - Bissauan',
      'Guinean',
      'Guyanese',
      'Haitian',
      'Herzegovinian',
      'Honduran',
      'Hungarian',
      'I - Kiribati',
      'Icelander',
      'Indian',
      'Indonesian',
      'Iranian',
      'Iraqi',
      'Irish',
      'Italian',
      'Ivorian',
      'Jamaican',
      'Japanese',
      'Jordanian',
      'Kazakhstani',
      'Kenyan',
      'Kittian and Nevisian',
      'Kuwaiti',
      'Kyrgyz',
      'Laotian',
      'Latvian',
      'Lebanese',
      'Liberian',
      'Libyan',
      'Liechtensteiner',
      'Lithuanian',
      'Luxembourger',
      'Macedonian',
      'Malagasy',
      'Malawian',
      'Malaysian',
      'Maldivian',
      'Malian',
      'Maltese',
      'Marshallese',
      'Mauritanian',
      'Mauritian',
      'Mexican',
      'Micronesian',
      'Moldovan',
      'Monacan',
      'Mongolian',
      'Moroccan',
      'Mosotho',
      'Motswana',
      'Mozambican',
      'Namibian',
      'Nauruan',
      'Nepalese',
      'New Zealander',
      'Ni - Vanuatu',
      'Nicaraguan',
      'Nigerian',
      'Nigerien',
      'North Korean',
      'Northern Irish',
      'Norwegian',
      'Omani',
      'Pakistani',
      'Palauan',
      'Palestinian',
      'Panamanian',
      'Papua New Guinean',
      'Paraguayan',
      'Peruvian',
      'Polish',
      'Portuguese',
      'Qatari',
      'Romanian',
      'Russian',
      'Rwandan',
      'Saint Lucian',
      'Salvadoran',
      'Samoan',
      'San Marinese',
      'Sao Tomean',
      'Saudi',
      'Scottish',
      'Senegalese',
      'Serbian',
      'Seychellois',
      'Sierra Leonean',
      'Singaporean',
      'Slovakian',
      'Slovenian',
      'Solomon Islander',
      'Somali',
      'South African',
      'South Korean',
      'Spanish',
      'Sri Lankan',
      'Sudanese',
      'Surinamer',
      'Swazi',
      'Swedish',
      'Swiss',
      'Syrian',
      'Taiwanese',
      'Tajik',
      'Tanzanian',
      'Thai',
      'Togolese',
      'Tongan',
      'Trinidadian or Tobagonian',
      'Tunisian',
      'Turkish',
      'Tuvaluan',
      'Ugandan',
      'Ukrainian',
      'Uruguayan',
      'Uzbekistani',
      'Venezuelan',
      'Vietnamese',
      'Welsh',
      'Yemenite',
      'Zambian',
      'Zimbabwean',
    ];

   /* this.JobPositionsService.getJobPositions();
    this.jobPositionSub = this.JobPositionsService.getJobPositionUpdatedListner().subscribe(
      (jobPositions: JobPositionType[]) => {
        this.jobPositions = jobPositions;
      }
    );*/
    }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

  onAddEmployee() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'AddEmployee') {
      this.EmployeesService.addEmployee(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.birthDate,
        this.age,
        this.form.value.personalEmail,
        this.form.value.personalMobile,
        this.form.value. workEmail,
        this.form.value. workPhone,
        this.form.value.nationality,
        this.form.value.identificationNo,
        this.form.value.passportNo,
        this.form.value.address,
        this.form.value.gender,
        this.form.value.maritalStatus,
        this.form.value.image,
        this.form.value.jobPosition,
        this.form.value.status,
        this.form.value.jobType,
        this.form.value.salary,
        this.form.value.startedDate,
        this.form.value.certificateLevel,
        this.form.value.fieldsOfStudy,
        this.form.value.school,
        this.form.value.numOfChildren
      );
      this.snackBar.open('Employee Added', 'Done', {
        duration: 10000
      });
    } else {
      this.EmployeesService.updateEmployee(
        this.employeeId,
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.birthDate,
        this.age,
        this.form.value.personalEmail,
        this.form.value.personalMobile,
        this.form.value.workEmail,
        this.form.value.workPhone,
        this.form.value.nationality,
        this.form.value.identificationNo,
        this.form.value.passportNo,
        this.form.value.address,
        this.form.value.gender,
        this.form.value.maritalStatus,
        this.form.value.image,
        this.form.value.jobPosition,
        this.form.value.status,
        this.form.value.jobType,
        this.form.value.salary,
        this.form.value.startedDate,
        this.form.value.certificateLevel,
        this.form.value.fieldsOfStudy,
        this.form.value.school,
        this.form.value.numOfChildren
      );
      this.snackBar.open('Employee updated', 'Done', {
        duration: 10000
      });
    }
    this.form.reset();
  }
 /* onSelectJob() {
    this.selectedJob = this.form.value.jobPosition;
    for ( var i = 0; i < this.jobPositions.length; i++) {
      if ((this.jobPositions[i].id === this.selectedJob)) {
            this.sallaryFrom = this.jobPositions[i].salaryFrom;
            this.sallaryTo = this.jobPositions[i].salaryTo;
      }
  }
    this.form.controls.salary.setValidators([Validators.min(this.sallaryFrom),
      Validators.max(this.sallaryTo)]);
  }*/

  onSelectBD() {
    this.selectedBD = new Date( this.form.value.birthDate);
    this.BDyear = this.selectedBD.getFullYear();
    this.nowYear = this.nowDate.getFullYear();
    this.ageValue = this.nowYear - this.BDyear;
    this.age  = this.ageValue;
    return this.age;
  }
}
