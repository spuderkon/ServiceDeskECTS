import { Person } from "../person/person.model";
import { Place } from "../place/place.model";
import { WorkOnRequest } from "../workOnRequest/work-on-request.model";

export class Request {
    id: number | null;
    declarantId: number | null;
    dateTimeStart: Date | null;
    description: string | null;
    dateTimeEnd: Date | null;
    placeId: number | null;
    isComplete: boolean | null;
    declarant: Person | null;
    place: Place | null;
    workOnRequests: WorkOnRequest[] | WorkOnRequest | null;

    constructor() {
        this.id = null;
        this.declarantId = null;
        this.dateTimeStart = null;
        this.description = null;
        this.dateTimeEnd = null;
        this.placeId = null;
        this.isComplete = null;
        this.declarant = null;
        this.place = null;
        this.workOnRequests = new Array<WorkOnRequest>;
    }
}
