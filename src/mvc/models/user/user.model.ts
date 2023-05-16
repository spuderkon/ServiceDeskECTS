export class User {
    name: string | null;
    surname: string | null;
    lastname: string | null;
    postId: number | null;
    departmentId: number| null;
    email: number| null;
    comment: number| null;
    userName: number| null;
    roleId: number| null;
    password: number| null;
    passwordSalt: number| null;
    department: number| null;
    post: number| null;
    role: number| null;
    requests: number| null;
    unitRespPeople: number| null;
    workOnRequests: number| null;

    constructor(){
        this.name = null;
        this.surname = null;
        this.lastname = null;
        this.email = null;
        this.roleId = null;
    }
}
