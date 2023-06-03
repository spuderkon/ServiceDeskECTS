import { Person } from "../person/person.model";
import { Service } from "../workOnRequsetServiceType/service.model";

export class WorkOnRequest {
    id: number | null;
    requestId: number | null;
    serviceId: number | null;
    dateTime: Date | null;
    comment: string | null;
    implementerId: number | null;
    implementer: Person | null;
    service: Service | null;
    requestUnits: any[] | null;
    shortTermMoves: any[] | null;
    unitPlaces: any[] | null;
}
