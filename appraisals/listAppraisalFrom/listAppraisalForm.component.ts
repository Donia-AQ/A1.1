import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AppraisalFormType } from '../appraisalFroms.model';
import { AppraisalFormsService } from '../appraisalForms.service';
import { AddAppraisalFormComponent } from '../addAppraisalForm/addAppraisalForm.component';

@Component({
  selector: 'app-list-appraisalForm',
  templateUrl: './listAppraisalForm.component.html'
})
export class ListAppraisalFormComponent implements OnInit, OnDestroy {
  appraisalForms: AppraisalFormType[] = [];
  private appraisalFormSub: Subscription;
  ic = 'delete';

  constructor(
    public AppraisalFormsService: AppraisalFormsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.AppraisalFormsService.getAppraisalForms();
    this.appraisalFormSub = this.AppraisalFormsService.getAppraisalFormUpdatedListner().subscribe(
      (appraisalForms: AppraisalFormType[]) => {
        this.appraisalForms = appraisalForms;
      }
    );
  }

  onDelete(AppraisalFormId: string) {
    this.AppraisalFormsService.deleteAppraisalForm(AppraisalFormId);
  }
  ngOnDestroy() {
    this.appraisalFormSub.unsubscribe();
  }

  openAppraisalFormDialog() {
    this.dialog.open(AddAppraisalFormComponent, {
      width: '600px'
    });
  }
  openAppraisalFormDialog2(appraisalFormId: any) {
    this.dialog.open(AddAppraisalFormComponent, {
      width: '600px',
      data: appraisalFormId
    });
  }
  onMouseOver() {
    this.ic = 'delete_outline';
  }
  onMouseOut() {
    this.ic = 'delete';
  }
}

