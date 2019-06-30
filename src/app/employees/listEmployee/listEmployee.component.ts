import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeType } from '../employees.model';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './listEmployee.component.html'
})

export class ListEmployeeComponent implements OnInit, OnDestroy {
  employees: EmployeeType[] = [];
  private employeeSub: Subscription;
  ic = 'delete';

  constructor(public EmployeesService: EmployeesService) { }

  ngOnInit() {
    this.EmployeesService.getEmployees();
    this.employeeSub = this.EmployeesService.getEmployeeUpdatedListner()
      .subscribe((employees: EmployeeType[]) => {
        this.employees = employees;
      });
  }

  onDelete(employeeId: string) {
    this.EmployeesService.deleteEmployee(employeeId);
  }
  ngOnDestroy() {
    this.employeeSub.unsubscribe();
  }

  onMouseOver() {
    this.ic = 'delete_outline';
  }
  onMouseOut() {
    this.ic = 'delete';
  }
}

