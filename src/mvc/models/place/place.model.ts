import { ShortTermMove } from "../shortTermMove/short-term-move.model";
import { UnitPlace } from "../unitPlace/unit-place.model";

export class Place {
    id: number | null;
    name: string | null;
    description: string | null;
    requests: Request[] | null;
    shortTermMoves: ShortTermMove[] | null;
    unitPlaces: UnitPlace[] | null;

    constructor() {
        this.id = null;
        this.name = null;
        this.description = null;
        this.requests = new Array<Request>;
        this.shortTermMoves = new Array<ShortTermMove>;
        this.unitPlaces = new Array<UnitPlace>;
    }

    // constructor(place: Place) {
    //     this.id = place.id == null ? null : place.id;
    //     this.name = place.name == null ? null : place.name;
    //     this.description = place.description == null ? null : place.description;
    //     this.requests = place.requests == null ? new Array<string> : place.requests;
    //     this.shortTermMoves = place.shortTermMoves == null ? new Array<string> : place.shortTermMoves;
    //     this.unitPlaces = place.unitPlaces == null ? new Array<string> : place.unitPlaces;
    // }
}
