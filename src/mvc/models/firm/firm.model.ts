import { FullNameUnit } from "../fullNameUnit/full-name-unit.model";

export interface Firm {
    id: number;
    name: string;
    fullNameUnits: FullNameUnit[];
}