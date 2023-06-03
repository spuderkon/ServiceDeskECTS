import { AccountingUnit } from "../accountingUnit/accounting-unit.model";
import { Place } from "../place/place.model";
import { WorkOnRequest } from "../workOnRequest/work-on-request.model";

export interface UnitPlace {
    id: number | null;
    unitId: number | null;
    placeId: number | null;
    comment: string | null;
    dateStart: string | null;
    dateEnd: string | null;
    workOnRequestId: number | null;
    place: Place | null;
    unit: AccountingUnit | null;
    workOnRequest: WorkOnRequest | null;
}