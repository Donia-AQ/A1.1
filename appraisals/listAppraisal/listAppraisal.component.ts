import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AppraisalType } from '../appraisals.model';
import { AppraisalsService } from '../appraisals.service';
import { AddAppraisalComponent } from '../addAppraisal/addAppraisal.component';

@Component({
  selector: 'app-list-appraisal',
  templateUrl: './listAppraisal.component.html'
})
export class ListAppraisalComponent implements OnInit, OnDestroy {
  appraisals: AppraisalType[] = [];
  private appraisalSub: Subscription;
  public toStartArr: AppraisalType[] = [];
  public appraisalSentArr: AppraisalType[] = [];
  public doneArr: AppraisalType[] = [];
  public cancelledArr: AppraisalType[] = [];
  ic = 'delete';

  constructor(
    public AppraisalsService: AppraisalsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.AppraisalsService.getAppraisals();
    this.appraisalSub = this.AppraisalsService.getAppraisalUpdatedListner().subscribe(
      (appraisals: AppraisalType[]) => {
        this.appraisals = appraisals;
        this.toStartArr = this.appraisals;
      }

    );

  }

  onDelete(appraisalId: string) {
    this.AppraisalsService.deleteAppraisal(appraisalId);
  }
  ngOnDestroy() {
    this.appraisalSub.unsubscribe();
  }

  openAppraisalDialog() {
    this.dialog.open(AddAppraisalComponent, {
      width: '600px'
    });
  }

  openAppraisalDialog2(jobPositionId: any) {

    this.dialog.open(AddAppraisalComponent, {
      width: '600px',
      data: jobPositionId
    });
  }

  onMouseOver() {
    this.ic = 'delete_outline';
  }
  onMouseOut() {
    this.ic = 'delete';
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}

