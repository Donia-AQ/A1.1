import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AddEmployeeComponent } from './employees/addEmployee/addEmployee.component';
import { ListEmployeeComponent } from './employees/listEmployee/listEmployee.component';
import { AddAppraisalComponent } from './appraisals/addAppraisal/addAppraisal.component';
import { ListAppraisalComponent } from './appraisals/listAppraisal/listAppraisal.component';
import { AddAppraisalFormComponent } from './appraisals/addAppraisalForm/addAppraisalForm.component';
import { ListAppraisalFormComponent } from './appraisals/listAppraisalFrom/listAppraisalForm.component';

const routes: Routes = [

     { path: 'addEmployee', component: AddEmployeeComponent },
     { path: 'editEmployee/:employeeId', component: AddEmployeeComponent },
     { path: 'listEmployee', component: ListEmployeeComponent },
     { path: 'appraisal', component: ListAppraisalComponent },
     { path: 'addAppraisal', component: AddAppraisalComponent },
     { path: 'appraisalForm', component: ListAppraisalFormComponent },
     { path: 'addAppraisalForm', component: AddAppraisalFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
