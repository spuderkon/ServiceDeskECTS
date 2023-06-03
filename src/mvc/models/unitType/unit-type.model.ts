import { FullNameUnit } from "../fullNameUnit/full-name-unit.model";

export interface UnitType {
    id: number;
    name: string;
    fullNameUnits: FullNameUnit[];
}