import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AppraisalType } from '../appraisals.model';
import { AppraisalsService } from '../appraisals.service';
import { ListAppraisalComponent } from '../listAppraisal/listAppraisal.component';
import { EmployeeType } from '../../employees/employees.model';
import { EmployeesService } from '../../employees/employees.service';
import { AppraisalFormType } from '../appraisalFroms.model';
import { AppraisalFormsService } from '../appraisalForms.service';

@Component({
  selector: 'app-add-appraisal',
  templateUrl: './addAppraisal.component.html'
})
export class AddAppraisalComponent implements OnInit {
  appraisal: AppraisalType;
  private mode = 'appraisal';
  private appraisalId: string;
  appraisalButton = 'Add';
  employees: EmployeeType[] = [];
  private employeeSub: Subscription;
  forms: AppraisalFormType[] = [];
  private formSub: Subscription;

  constructor(
    public AppraisalsService: AppraisalsService,
    public AppraisalFormsService: AppraisalFormsService,
    public EmployeesService: EmployeesService,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ListAppraisalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    if (this.data === null) {
      this.mode = 'appraisal';
      this.appraisalId = null;
    } else {
      this.mode = 'editAppraisal';
      this.appraisalButton = 'Edit';
      this.appraisalId = this.data;
      this.AppraisalsService.getAppraisal(this.appraisalId).subscribe(
        appraisalData => {
          this.appraisal = {
            id: appraisalData._id,
            employee: appraisalData.employee,
            form: appraisalData.form,
            deadline: appraisalData.deadline,
          };
        }
      );
    }
    this.EmployeesService.getEmployees();
    this.employeeSub = this.EmployeesService.getEmployeeUpdatedListner().subscribe(
      (employees: EmployeeType[]) => {
        this.employees = employees;
      }
    );

    this.AppraisalFormsService.getAppraisalForms();
    this.formSub = this.AppraisalFormsService.getAppraisalFormUpdatedListner().subscribe(
      (forms: AppraisalFormType[]) => {
        this.forms = forms;
      }
    );
  }

  onAddAppraisal(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'appraisal') {
      this.AppraisalsService.addAppraisal(
        form.value.employee,
        form.value.form,
        form.value.deadline
      );
      form.resetForm();
      this.snackBar.open('Appraisal Created', 'Done', {
        duration: 7000
      });
    } else {
      this.AppraisalsService.updateAppraisal(
        this.appraisalId,
        form.value.employee,
        form.value.form,
        form.value.deadline
      );
      form.resetForm();
      this.snackBar.open('Appraisal Edited', 'Done', {
        duration: 7000
      });
    }
  }
}
