import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Person } from '../models/person/person.model';
import { PersonService } from '../services/http/person/person.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { PostOrDepartment } from '../models/postOrDepartment/post-or-department.model';
import { Role } from '../models/role/role.model';
import { PostService } from '../services/http/post/post.service';
import { DepartmentService } from '../services/http/department/department.service';
import { RoleService } from '../services/http/role/role.service';


export interface DialogData {
  person: Person;
}

@Component({
  selector: 'app-crud-persons',
  templateUrl: './crud-persons.component.html',
  styleUrls: ['./crud-persons.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class CrudPersonsComponent implements OnInit, AfterViewInit {

  public persons: Person[];
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private personService: PersonService, private dialog: MatDialog) {
    this.displayedColumns = ['FIO', 'Post', 'Email', 'Edit', 'Delete'];
  }

  ngOnInit(): void {
    this.refreshPersons();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private refreshPersons(): void {
    this.personService.GetAll().subscribe(data => {
      this.persons = data;
      this.dataSource = new MatTableDataSource(this.persons)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public createPerson() {
    const dialogRef = this.dialog.open(EditPersonDialog);
  }

  public editPerson(person: Person) {
    const dialogRef = this.dialog.open(EditPersonDialog, { data: { person } });
  }

  public deletePerson(person: Person) {
    const dialogRef = this.dialog.open(DeletePersonDialog, { data: { person } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.personService.Delete(person.id!).subscribe({
          next: (result) => {
            console.log(result);
          },
          error: (error) => {
            console.log(error.error)
          }
        })
      }
    })
  }
}

@Component({
  selector: 'edit-person-dialog',
  templateUrl: 'edit-person-dialog.html',
})

export class EditPersonDialog implements OnInit {

  public person: Person;

  public name: FormControl;
  public surname: FormControl;
  public lastname: FormControl;
  public email: FormControl;
  public postId: FormControl;
  public comment: FormControl;
  public departmentId: FormControl;
  public userName: FormControl;
  public password: FormControl;
  public roleId: FormControl;

  public posts: PostOrDepartment[];
  public departments: PostOrDepartment[];
  public roles: Role[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private postService: PostService,
              private deparmentService: DepartmentService, private roleService: RoleService) {
    this.name = new FormControl('', [Validators.required]);
    this.surname = new FormControl('', [Validators.required]);
    this.lastname = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.postId = new FormControl('', [Validators.required]);
    this.comment = new FormControl('', [Validators.required]);
    this.departmentId = new FormControl('', [Validators.required]);
    this.userName = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.roleId = new FormControl('', [Validators.required]);
    this.posts = new Array<PostOrDepartment>;
    this.departments = new Array<PostOrDepartment>;
    this.roles = new Array<Role>;

    if (data != null) {
      this.person = data.person;
      this.refreshControlsData()
    }
  }

  ngOnInit(): void {
    this.refreshDepartments();
    this.refreshPosts();
    this.refreshRoles();
  }

  public refreshControlsData(): void {
    this.name = new FormControl(this.person.name, [Validators.required]);
    this.surname = new FormControl(this.person.surname, [Validators.required]);
    this.lastname = new FormControl(this.person.lastname, [Validators.required]);
    this.email = new FormControl(this.person.email, [Validators.required]);
    this.postId = new FormControl(this.person.postId, [Validators.required]);
    this.comment = new FormControl(this.person.comment, [Validators.required]);
    this.departmentId = new FormControl(this.person.departmentId, [Validators.required]);
    this.userName = new FormControl(this.person.userName, [Validators.required]);
    this.password = new FormControl(this.person.password, [Validators.required]);
    this.roleId = new FormControl(this.person.roleId, [Validators.required]);
  }

  public refreshDepartments(): void{
    this.deparmentService.GetAll().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (error) => {
        console.log(error.error)
      }
    });
  }

  public refreshPosts(): void{
    this.postService.GetAll().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.log(error.error)
      }
    });
  }

  public refreshRoles(): void{
    this.roleService.GetAll().subscribe({
      next: (data) => {
        console.log(data);
        this.roles = data;
      },
      error: (error) => {
        console.log(error.error)
      }
    });
  }
}

@Component({
  selector: 'delete-person-dialog',
  templateUrl: 'delete-person-dialog.html',
})

export class DeletePersonDialog implements OnInit {

  public person: Person;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.person = data.person;
  }

  ngOnInit(): void {
  }
}

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Количество:';

  return customPaginatorIntl;
}
