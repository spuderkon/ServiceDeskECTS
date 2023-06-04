import { Person } from "../person/person.model";
import { RequestUnit } from "../requestUnit/request-unit.model";
import { ShortTermMove } from "../shortTermMove/short-term-move.model";
import { UnitPlace } from "../unitPlace/unit-place.model";
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
    requestUnits: RequestUnit[] | null;
    shortTermMoves: ShortTermMove[] | null;
    unitPlaces: UnitPlace[] | null;
}
