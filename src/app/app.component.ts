import {Component, OnInit} from '@angular/core';
import {Employee} from './model/employee';
import {EmployeeService} from './service/employee.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees: Employee[];

  constructor(private employeeService: EmployeeService ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse ) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add' ){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'delete' ){
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if (mode === 'edit' ){
      button.setAttribute('data-target', '#editEmployeeModal');
    }
    container.appendChild(button);
    button.click();

  }
}
