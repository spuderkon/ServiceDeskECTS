export class Person {
  id: number | null;
  name: string | null;
  surname: string | null;
  lastname: string | null;
  post: PostOrDepartment | null;
  department: PostOrDepartment | null;
  email: string | null;
  comment: string | null;
  userName: string | null;
  roleId: number | null
  password: string | null;
  passwordSalt: string | null;
  role: string | null;
  requests?: (null)[] | null;
  unitRespPeople?: (null)[] | null;
  workOnRequests?: (null)[] | null;

  constructor() {
    this.id = null;
    this.name = null;
    this.surname= null;
    this.lastname = null;
    this.post = null;
    this.department = null;
    this.email = null;
    this.comment = null;
    this.userName = null;
    this.roleId = null;
    this.password = null;
    this.passwordSalt = null;
    this.role = null;
    this.requests = null;
    this.unitRespPeople = null;
    this.workOnRequests= null;
  }
}

export interface PostOrDepartment {
  id: number;
  name: string;
  people?: (null)[] | null;
}
