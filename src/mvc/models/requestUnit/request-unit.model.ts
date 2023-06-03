import { AccountingUnit } from "../accountingUnit/accounting-unit.model";
import { WorkOnRequest } from "../workOnRequest/work-on-request.model";

export interface RequestUnit {
    id: number;
    unitId: number;
    workOnRequestId: number;
    unit: AccountingUnit;
    workOnRequest: WorkOnRequest;
}