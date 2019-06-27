import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AppraisalFormType } from './appraisalFroms.model';

@Injectable({ providedIn: 'root' })

export class AppraisalFormsService {
  private appraisalForms: AppraisalFormType[] = [];
  private appraisalFormsUpdated = new Subject<AppraisalFormType[]>();

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  getAppraisalForms() {
    this.http.get<{ message: string, appraisalForms: any }>('http://localhost:3100/appraisalForms')
      .pipe(map((appraisalFormData) => {
        return appraisalFormData.appraisalForms.map(appraisalForm => {
          return {
            id: appraisalForm._id,
            appraisalFormName: appraisalForm.appraisalFormName,
            questions: appraisalForm.questions
          };
        });
      }))
      .subscribe((transformedAppraisalForms) => {
        this.appraisalForms = transformedAppraisalForms;
        this.appraisalFormsUpdated.next([...this.appraisalForms]);
      });
  }

  getAppraisalFormUpdatedListner() {
    return this.appraisalFormsUpdated.asObservable();
  }

  getAppraisalForm(id: string) {
    return this.http.get<{
      _id: string,
      appraisalFormName: string,
      questions: [];
    }>
      ('http://localhost:3100/appraisalForms/' + id);
  }

  addAppraisalForm(
    appraisalFormName: string,
    questions: []
  ) {
    const appraisalForm: AppraisalFormType = {
      id: null,
      appraisalFormName: appraisalFormName,
      questions: questions
    };
    this.http.post<{ message: string, appraisalFormId: string }>("http://localhost:3100/appraisalForms", appraisalForm)
      .subscribe((responseData) => {
        const id = responseData.appraisalFormId;
        appraisalForm.id = id;
        this.appraisalForms.push(appraisalForm);
        this.appraisalFormsUpdated.next([...this.appraisalForms]);
        // this.dialog.closeAll();
      });
  }

  updateAppraisalForm(
    id: string,
    appraisalFormName: string,
    questions: []
  ) {
    const appraisalForm: AppraisalFormType = {
      id: id,
      appraisalFormName: appraisalFormName,
      questions: questions
    };
    this.http.put("http://localhost:3100/appraisalForms/" + id, appraisalForm)
      .subscribe(response => {
        const updatedAppraisalForms = [...this.appraisalForms];
        const oldAppraisalFormIndex = updatedAppraisalForms.findIndex(a => a.id === appraisalForm.id);
        updatedAppraisalForms[oldAppraisalFormIndex] = appraisalForm;
        this.appraisalForms = updatedAppraisalForms;
        this.appraisalFormsUpdated.next([...this.appraisalForms]);
        this.dialog.closeAll();
      });
  }

 deleteAppraisalForm(appraisalFormId: string) {
  this.http.delete('http://localhost:3100/appraisalForms/' + appraisalFormId)
      .subscribe(() => {
        const updatedAppraisalForms = this.appraisalForms.filter(appraisalForm => appraisalForm.id !== appraisalFormId);
        this.appraisalForms = updatedAppraisalForms;
        this.appraisalFormsUpdated.next([...this.appraisalForms]);
      });
  }
}
