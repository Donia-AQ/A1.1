import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AppraisalFormType } from '../appraisalFroms.model';
import { AppraisalFormsService } from '../appraisalForms.service';
import { ListAppraisalFormComponent } from '../listAppraisalFrom/listAppraisalForm.component';

@Component({
  selector: 'app-add-appraisalForm',
  templateUrl: './addAppraisalForm.component.html'
})
export class AddAppraisalFormComponent implements OnInit {
  form: FormGroup;
  questions: FormArray;
  appraisalForm: AppraisalFormType;
  private mode = 'appraisalForm';
  private appraisalFormId: string;
  appraisalFormButton = 'Add';

  constructor(
    public AppraisalFormsService: AppraisalFormsService,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ListAppraisalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      appraisalFormName: '',
      questions: this.formBuilder.array([this.createQuestion()])
    });

    if (this.data === null) {
      this.mode = 'appraisalForm';
      this.appraisalFormId = null;
    } else {
      this.mode = 'editAppraisalForm';
      this.appraisalFormButton = 'Edit';
      this.appraisalFormId = this.data;
      this.AppraisalFormsService.getAppraisalForm(this.appraisalFormId).subscribe(
        appraisalFormData => {
          this.appraisalForm = {
            id: appraisalFormData._id,
            appraisalFormName: appraisalFormData.appraisalFormName,
            questions: appraisalFormData.questions
          };
          this.form.setValue({
            appraisalFormName: this.appraisalForm.appraisalFormName,
            questions: this.appraisalForm.questions
          });
        }
      );
    }
  }

  onAddAppraisalForm() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'appraisalForm') {
      this.AppraisalFormsService.addAppraisalForm(
        this.form.value.appraisalFormName,
        this.form.value.questions
      );
      this.snackBar.open('Appraisal Form Created', 'Done', {
        duration: 7000
      });
    } else {
      this.AppraisalFormsService.updateAppraisalForm(
        this.appraisalFormId,
        this.form.value.appraisalFormName,
        this.form.value.questions
      );
      this.snackBar.open('Appraisal Form Edited', 'Done', {
        duration: 7000
      });
    }
    this.form.reset();
  }
  createQuestion(): FormGroup {
    return this.formBuilder.group({
      name: '',
      type: ''
    });
  }
  addQuestion(): void {
    this.questions = this.form.get('questions') as FormArray;
    this.questions.push(this.createQuestion());
  }
}
