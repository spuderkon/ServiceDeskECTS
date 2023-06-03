import { AccountingUnit } from "../accountingUnit/accounting-unit.model";
import { Person } from "../person/person.model";

export interface UnitRespPerson {
    id: number;
    unitId: number;
    personId: number;
    dateStart: string;
    dateEnd: string | null;
    person: Person;
    unit: AccountingUnit;
}