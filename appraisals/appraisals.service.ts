import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AppraisalType } from './appraisals.model';

@Injectable({ providedIn: 'root' })

export class AppraisalsService {
  private appraisals: AppraisalType[] = [];
  private appraisalsUpdated = new Subject<AppraisalType[]>();

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  getAppraisals() {
    this.http.get<{ message: string, appraisals: any }>('http://localhost:3100/appraisals')
      .pipe(map((appraisalData) => {
        return appraisalData.appraisals.map(appraisal => {
          return {
            id: appraisal._id,
            employee: appraisal.employee,
            form: appraisal.form,
            deadline: appraisal.deadline,
          };
        });
      }))
      .subscribe((transformedAppraisals) => {
        this.appraisals = transformedAppraisals;
        this.appraisalsUpdated.next([...this.appraisals]);
      });
  }

  getAppraisalUpdatedListner() {
    return this.appraisalsUpdated.asObservable();
  }

  getAppraisal(id: string) {
    return this.http.get<{
      _id: string,
      employee: string,
      form: string,
      deadline: Date,
    }>
      ('http://localhost:3100/appraisals/' + id);
  }

  addAppraisal(employee: string, form: string, deadline: Date) {
    const appraisal: AppraisalType = {
      id: null,
      employee: employee,
      form: form,
      deadline: deadline,
    };
    this.http.post<{ message: string, appraisalId: string }>('http://localhost:3100/appraisals', appraisal)
      .subscribe((responseData) => {
        const id = responseData.appraisalId;
        appraisal.id = id;
        this.appraisals.push(appraisal);
        this.appraisalsUpdated.next([...this.appraisals]);
        // this.dialog.closeAll();
      });
  }

  updateAppraisal(id: string, employee: string, form: string, deadline: Date) {
    const appraisal: AppraisalType = {
      id: id,
      employee: employee,
      form: form,
      deadline: deadline,
    };
    this.http.put('http://localhost:3100/appraisal/' + id, appraisal)
      .subscribe(response => {
        const updatedAppraisals = [...this.appraisals];
        const oldAppraisalIndex = updatedAppraisals.findIndex(a => a.id === appraisal.id);
        updatedAppraisals[oldAppraisalIndex] = appraisal;
        this.appraisals = updatedAppraisals;
        this.appraisalsUpdated.next([...this.appraisals]);
        this.dialog.closeAll();
      });
  }

  deleteAppraisal(appraisalId: string) {
    this.http.delete('http://localhost:3100/appraisals/' + appraisalId)
      .subscribe(() => {
        const updatedAppraisals = this.appraisals.filter(appraisal => appraisal.id !== appraisalId);
        this.appraisals = updatedAppraisals;
        this.appraisalsUpdated.next([...this.appraisals]);
      });
  }
}
