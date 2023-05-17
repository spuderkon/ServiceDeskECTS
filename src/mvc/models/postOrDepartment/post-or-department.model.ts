export class PostOrDepartment {
    id: number | null;
    name: string | null;
    people: string[] | null;

    constructor(){
        this.id = null;
        this.name = null;
        this.people = new Array<string>;
    }
}
