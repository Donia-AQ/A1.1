import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EmployeeType } from './employees.model';
import { MatDialog } from '@angular/material';
// import { ProductCategoryComponent } from './product-category/product-category.component';

@Injectable({ providedIn: 'root' })

export class EmployeesService {
  private employees: EmployeeType[] = [];
  private employeesUpdated = new Subject<EmployeeType[]>();

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  getEmployees() {
    this.http.get<{ message: string, employees: any }>('http://localhost:3100/employees')
      .pipe(map((employeeData) => {
        return employeeData.employees.map(employee => {
          return {
            id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            birthDate: employee.birthDate,
            age: employee.age,
            personalEmail: employee.personalEmail,
            personalMobile: employee.personalMobile,
            workEmail: employee.workEmail,
            workPhone: employee.workPhone,
            nationality: employee.nationality,
            identificationNo: employee.identificationNo,
            passportNo: employee.passportNo,
            address: employee.address,
            gender: employee.gender,
            maritalStatus: employee.maritalStatus,
            imagePath: employee.imagePath,
            jobPosition: employee.jobPosition,
            status: employee.status,
            jobType: employee.jobType,
            salary: employee.salary,
            startedDate: employee.startedDate,
            certificateLevel: employee.certificateLevel,
            fieldsOfStudy: employee.fieldsOfStudy,
            school: employee.school,
            numOfChildren: employee.numOfChildren,
          };
        });
      }))
      .subscribe((transformedEmployees) => {
        this.employees = transformedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }

  getEmployeeUpdatedListner() {
    return this.employeesUpdated.asObservable();
  }

  getEmployee(id: string) {
    return this.http.get<{
      _id: string,
      firstName: string,
      lastName: string,
      birthDate: Date,
      age: number,
      personalEmail: string,
      personalMobile: number,
      workEmail: string,
      workPhone: number,
      nationality: string,
      identificationNo: number,
      passportNo: number,
      address: string,
      gender: string,
      maritalStatus: string,
      imagePath: string;
      jobPosition: string;
      status: string;
      jobType: string;
      salary: number;
      startedDate: Date,
      certificateLevel: string,
      fieldsOfStudy: string,
      school: string,
      numOfChildren: number
    }>
      ('http://localhost:3100/employees/' + id);
  }

  addEmployee(
    firstName: string,
    lastName: string,
    birthDate: Date,
    age: number,
    personalEmail: string,
    personalMobile: number,
    workEmail: string,
    workPhone: number,
    nationality: string,
    identificationNo: number,
    passportNo: number,
    address: string,
    gender: string,
    maritalStatus: string,
    image: File,
    jobPosition: string,
    status: string,
    jobType: string,
    salary: number,
    startedDate: Date,
    certificateLevel: string,
    fieldsOfStudy: string,
    school: string,
    numOfChildren: number
    ) {
    const employeeData = new FormData();
    employeeData.append('firstName', firstName);
    employeeData.append('lastName', lastName);
    employeeData.append('birthDate', birthDate.toString());
    employeeData.append('age', age.toString());
    employeeData.append('personalEmail', personalEmail);
    employeeData.append('personalMobile', personalMobile.toString());
    employeeData.append('workEmail', workEmail);
    employeeData.append('workPhone', workPhone.toString());
    employeeData.append('nationality', nationality);
    employeeData.append('identificationNo', identificationNo.toString());
    employeeData.append('passportNo', passportNo.toString());
    employeeData.append('address', address);
    employeeData.append('gender', gender);
    employeeData.append('maritalStatus', maritalStatus);
    employeeData.append('image', image, lastName);
    employeeData.append('jobPosition', jobPosition);
    employeeData.append('status', status);
    employeeData.append('jobType', jobType);
    employeeData.append('salary', salary.toString());
    employeeData.append('startedDate', startedDate.toString());
    employeeData.append('certificateLevel', certificateLevel);
    employeeData.append('fieldsOfStudy', fieldsOfStudy);
    employeeData.append('school', school);
    employeeData.append('numOfChildren', numOfChildren.toString());
    this.http
      .post<{ message: string; employee: EmployeeType }>(
        'http://localhost:3100/employees',
        employeeData
      )
      .subscribe(responseData => {
        const employee: EmployeeType = {
          id: responseData.employee.id,
          firstName: firstName,
          lastName: lastName,
          birthDate: birthDate,
          age: age,
          personalEmail: personalEmail,
          personalMobile: personalMobile,
          workEmail: workEmail,
          workPhone: workPhone,
          nationality: nationality,
          identificationNo: identificationNo,
          passportNo: passportNo,
          address: address,
          gender: gender,
          maritalStatus: maritalStatus,
          imagePath: responseData.employee.imagePath,
          jobPosition: jobPosition,
          status: status,
          jobType: jobType,
          salary: salary,
          startedDate: startedDate,
          certificateLevel: certificateLevel,
          fieldsOfStudy: fieldsOfStudy,
          school: school,
          numOfChildren: numOfChildren
        };
        this.employees.push(employee);
        this.employeesUpdated.next([...this.employees]);
        this.router.navigate(['/listEmployee']);
      });
  }

  updateEmployee(
    id: string,
    firstName: string,
    lastName: string,
    birthDate: Date,
    age: number,
    personalEmail: string,
    personalMobile: number,
    workEmail: string,
    workPhone: number,
    nationality: string,
    identificationNo: number,
    passportNo: number,
    address: string,
    gender: string,
    maritalStatus: string,
    image: File | string,
    jobPosition: string,
    status: string,
    jobType: string,
    salary: number,
    startedDate: Date,
    certificateLevel: string,
    fieldsOfStudy: string,
    school: string,
    numOfChildren: number
    ) {
    let employeeData: EmployeeType | FormData;
    if (typeof image === 'object') {
      employeeData = new FormData();
      employeeData.append('id', id);
      employeeData.append('firstName', firstName);
      employeeData.append('lastName', lastName);
      employeeData.append('birthDate', birthDate.toString());
      employeeData.append('age', age.toString());
      employeeData.append('personalEmail', personalEmail);
      employeeData.append('personalMobile', personalMobile.toString());
      employeeData.append('workEmail', workEmail);
      employeeData.append('workPhone', workPhone.toString());
      employeeData.append('nationality', nationality);
      employeeData.append('identificationNo', identificationNo.toString());
      employeeData.append('passportNo', passportNo.toString());
      employeeData.append('address', address);
      employeeData.append('gender', gender);
      employeeData.append('maritalStatus', maritalStatus);
      employeeData.append('image', image, lastName);
      employeeData.append('jobPosition', jobPosition);
      employeeData.append('status', status);
      employeeData.append('jobType', jobType);
      employeeData.append('salary', salary.toString());
      employeeData.append('startedDate', startedDate.toString());
      employeeData.append('certificateLevel', certificateLevel);
      employeeData.append('fieldsOfStudy', fieldsOfStudy);
      employeeData.append('school', school);
      employeeData.append('numOfChildren', numOfChildren.toString());
    } else {
      employeeData = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        age:age,
        personalEmail: personalEmail,
        personalMobile: personalMobile,
        workEmail: workEmail,
        workPhone: workPhone,
        nationality: nationality,
        identificationNo: identificationNo,
        passportNo: passportNo,
        address: address,
        gender: gender,
        maritalStatus: maritalStatus,
        imagePath: image,
        jobPosition: jobPosition,
        status: status,
        jobType: jobType,
        salary: salary,
        startedDate: startedDate,
        certificateLevel: certificateLevel,
        fieldsOfStudy: fieldsOfStudy,
        school: school,
        numOfChildren: numOfChildren
      };
    }
    this.http
      .put('http://localhost:3100/employees/' + id, employeeData)
      .subscribe(response => {
        const updatedEmployees = [...this.employees];
        const oldEmployeeIndex = updatedEmployees.findIndex(e => e.id === id);
        const employee: EmployeeType = {
          id: id,
          firstName: firstName,
          lastName: lastName,
          birthDate: birthDate,
          age: age,
          personalEmail: personalEmail,
          personalMobile: personalMobile,
          workEmail: workEmail,
          workPhone: workPhone,
          nationality: nationality,
          identificationNo: identificationNo,
          passportNo: passportNo,
          address: address,
          gender: gender,
          maritalStatus: maritalStatus,
          imagePath: "",
          jobPosition: jobPosition,
          status: status,
          jobType: jobType,
          salary: salary,
          startedDate: startedDate,
          certificateLevel: certificateLevel,
          fieldsOfStudy: fieldsOfStudy,
          school: school,
          numOfChildren: numOfChildren
        };
        updatedEmployees[oldEmployeeIndex] = employee;
        this.employees = updatedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }

  deleteEmployee(employeeId: string) {
    this.http.delete('http://localhost:3100/employees/' + employeeId)
      .subscribe(() => {
        const updatedEmployees = this.employees.filter(employee => employee.id !== employeeId);
        this.employees = updatedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }
}
