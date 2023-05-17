import { PostOrDepartment } from "../postOrDepartment/post-or-department.model";
import { Role } from "../role/role.model";

export class Person {
  id: number | null;
  name: string | null;
  surname: string | null;
  lastname: string | null;
  postId: number | null
  post: PostOrDepartment;
  departmentId: number | null;
  department: PostOrDepartment;
  email: string | null;
  comment: string | null;
  userName: string | null;
  roleId: number | null
  role: Role | null;
  password: string | null;
  passwordSalt: string | null;
  requests: string[] | null;
  unitRespPeople: string[] | null;
  workOnRequests: string[] | null;

  constructor(person: Person) {
    this.id = person.id == null ? null : person.id;
    this.name = person.name == null ? null : person.name;
    this.surname= person.surname == null ? null : person.surname;
    this.lastname = person.lastname == null ? null : person.lastname;
    this.postId = person.postId == null ? null : person.postId;
    this.post = person.post == null ? new PostOrDepartment() : person.post;
    this.departmentId = person.departmentId == null ? null : person.departmentId;
    this.department = person.department == null ? new PostOrDepartment() : person.department;
    this.email = person.email == null ? null : person.email;
    this.comment = person.comment == null ? null : person.comment;
    this.userName = person.userName == null ? null : person.userName;
    this.roleId = person.roleId == null ? null : person.roleId;
    this.role = person.role == null ? new Role() : person.role;
    this.password = person.password == null ? null : person.password;
    this.passwordSalt = person.passwordSalt == null ? null : person.passwordSalt;
    this.requests = person.requests == null ? new Array<string> : person.requests;
    this.unitRespPeople = person.unitRespPeople == null ? new Array<string> : person.unitRespPeople;
    this.workOnRequests = person.workOnRequests == null ? new Array<string> : person.workOnRequests;
  }
}
