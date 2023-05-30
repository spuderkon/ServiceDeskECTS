export class Place {
    id: number | null;
    name: string | null;
    description: string | null;
    requests: string[] | null;
    shortTermMoves: string[] | null;
    unitPlaces: string[] | null;

    constructor() {
        this.id = null;
        this.name = null;
        this.description = null;
        this.requests = new Array<string>;
        this.shortTermMoves = new Array<string>;
        this.unitPlaces = new Array<string>;
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
