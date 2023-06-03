import { WorkOnRequest } from "../workOnRequest/work-on-request.model";

export class Service {
    id: number | null;
    name: string | null;
    code: string | null;
    workOnRequest: Array<WorkOnRequest>;

    constructor() {
        this.id = null;
        this.name = null;
        this.code = null;
        this.workOnRequest = new Array<WorkOnRequest>;
    }
}
