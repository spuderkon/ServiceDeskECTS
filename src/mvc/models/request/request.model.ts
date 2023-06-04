import { Person } from "../person/person.model";
import { Place } from "../place/place.model";
import { RequestStatus } from "../requestStatus/request-status.model";
import { WorkOnRequest } from "../workOnRequest/work-on-request.model";

export class Request {
    id: number | null;
    declarantId: number | null;
    dateTimeStart: Date | null;
    description: string | null;
    dateTimeEnd: Date | null;
    placeId: number | null;
    isComplete: boolean | null;
    requestStatusId: number | null;
    declarant: Person | null;
    place: Place;
    requestStatus: RequestStatus;
    workOnRequests: Array<WorkOnRequest>;

    constructor() {
        this.id = null;
        this.declarantId = null;
        this.dateTimeStart = null;
        this.description = null;
        this.dateTimeEnd = null;
        this.placeId = null;
        this.isComplete = null;
        this.requestStatusId = null;
        this.declarant = null;
        this.place = new Place;
        this.requestStatus = new RequestStatus();
        this.workOnRequests = new Array<WorkOnRequest>;
    }
}