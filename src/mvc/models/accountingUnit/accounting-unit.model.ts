import { FullNameUnit } from "../fullNameUnit/full-name-unit.model";
import { RequestUnit } from "../requestUnit/request-unit.model";
import { ShortTermMove } from "../shortTermMove/short-term-move.model";
import { UnitPlace } from "../unitPlace/unit-place.model";
import { UnitRespPerson } from "../unitRespPerson/unit-resp-person.model";

export interface AccountingUnit {
    id: number | null;
    mac: string | null;
    serNum: string | null;
    netName: string | null;
    manufDate: string | null;
    invNum: string | null;
    fullNameUnitId: number;
    comment: string | null;
    fullNameUnit: FullNameUnit;
    requestUnits: RequestUnit[];
    shortTermMoves: ShortTermMove[];
    unitPlaces: UnitPlace[];
    unitRespPeople: UnitRespPerson[];
}