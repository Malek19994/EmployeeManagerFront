import {Component, OnInit} from '@angular/core';
import {Employee} from './model/employee';
import {EmployeeService} from './service/employee.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

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
      // tslint:disable-next-line:no-shadowed-variable
      (error: HttpErrorResponse ) => {
        alert(error.message);
      }
    );
  }
  // search

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(employee);
        }
      }
    this.employees = results;
    if (results.length === 0 || !key){
      this.getEmployees();
      }
    }


// add
  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response: Employee ) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      // tslint:disable-next-line:no-shadowed-variable
    ( error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
// apdate
  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployees(employee).subscribe(
      (response: Employee ) => {
        console.log(response);
        this.getEmployees();
      },
      // tslint:disable-next-line:no-shadowed-variable
      ( error: HttpErrorResponse) => {
        alert(error.message); }
    );
  }
// delete
  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployees(employeeId).subscribe(
      (response: void ) => {
        console.log(response);
        this.getEmployees();
      },
      // tslint:disable-next-line:no-shadowed-variable
      ( error: HttpErrorResponse) => {
        alert(error.message); }
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
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if (mode === 'edit' ){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    container.appendChild(button);
    button.click();

  }
}
