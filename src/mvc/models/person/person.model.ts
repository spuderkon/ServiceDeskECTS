import { PostOrDepartment } from "../postOrDepartment/post-or-department.model";
import { Role } from "../role/role.model";
import { UnitRespPerson } from "../unitRespPerson/unit-resp-person.model";
import { WorkOnRequest } from "../workOnRequest/work-on-request.model";

export class Person {
  id: number | null;
  name: string | null;
  surname: string | null;
  lastname: string | null;
  postId: number | null
  post: PostOrDepartment | null;
  departmentId: number | null;
  department: PostOrDepartment;
  email: string | null;
  comment: string | null;
  userName: string | null;
  roleId: number | null
  role: Role | null;
  password: string | null;
  passwordSalt: string | null;
  requests: Request[] | null;
  unitRespPeople: UnitRespPerson[] | null;
  workOnRequests: WorkOnRequest[] | null;

  constructor() {
    this.id = null;
    this.name = null;
    this.surname= null;
    this.lastname = null;
    this.postId = null;
    this.post = new PostOrDepartment();
    this.departmentId = null;
    this.department = new PostOrDepartment();
    this.email = null;
    this.comment = null;
    this.userName = null;
    this.roleId = null;
    this.role = new Role();
    this.password = null;
    this.passwordSalt = null;
    this.requests = new Array<Request>;
    this.unitRespPeople = new Array<UnitRespPerson>;
    this.workOnRequests = new Array<WorkOnRequest>;
  }
}
