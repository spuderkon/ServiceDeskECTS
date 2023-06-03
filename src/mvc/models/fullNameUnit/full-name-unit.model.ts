import { AccountingUnit } from "../accountingUnit/accounting-unit.model";
import { Firm } from "../firm/firm.model";
import { UnitType } from "../unitType/unit-type.model";

export interface FullNameUnit {
    id: number;
    firmId: number | null;
    model: string;
    unitTypeId: number;
    modelNo: string | null;
    firm: Firm | null;
    unitType: UnitType;
    accountingUnits: AccountingUnit[];
}