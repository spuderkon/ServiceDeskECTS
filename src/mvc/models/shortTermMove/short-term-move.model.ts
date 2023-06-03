import { AccountingUnit } from "../accountingUnit/accounting-unit.model";
import { Place } from "../place/place.model";
import { WorkOnRequest } from "../workOnRequest/work-on-request.model";

export interface ShortTermMove {
    shortTermMoveId: number;
    placeId: number;
    workOnRequestId: number | null;
    dateTimeEndPlan: string | null;
    dateTimeEndFact: string | null;
    unitId: number;
    place: Place;
    unit: AccountingUnit;
    workOnRequest: WorkOnRequest | null;
}