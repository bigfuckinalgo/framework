import * as d3 from 'd3';
import {FeatureCollection} from "geojson";

export class Team {
    constructor(public uid: string,
                public name: string,
                public latitude: number,
                public longitude: number) {

    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const colors: string[] = [];
for (let i = 0; i <= 26; i++) {
    colors.push(getRandomColor());
}


export class GermanyMap {

    private _mapSvg: any;
    private _g: any;
    private _geoPath: any;
    private _projection;

    constructor(public selector: string,
                private width: number = 1920,
                private height: number = 1000) {
        this._createContainerElements(selector, width, height);
    }

    private _getDivisionColor(division: number): string {
        return colors[division];
    }

    private _createContainerElements(selector: string,
                                     width: number,
                                     height: number) {
        this._mapSvg = d3.select(selector)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        this._mapSvg.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height);

        this._g = this._mapSvg.append("g")
            .append("g")
            .attr("id", "states");

    }


    public createMap() {
        return d3.json("./data/map.json").then((collection: FeatureCollection) => {

            const bounds: [[number, number], [number, number]] = d3.geoBounds(collection);
            const bottomLeft = bounds[0];
            const topRight = bounds[1];
            const rotLong = -(topRight[0] + bottomLeft[0]) / 2;

            const center: [number, number] = [(topRight[0] + bottomLeft[0]) / 2 + rotLong, (topRight[1] + bottomLeft[1]) / 2];
            let projection = d3.geoAlbers()
                .parallels([bottomLeft[1], topRight[1]])
                .rotate([rotLong, 0, 0])
                .translate([this.width / 2, this.height / 2])
                .center(center);

            const bottomLeftPx = projection(bottomLeft);
            const topRightPx = projection(topRight);
            const scaleFactor = 1.00 * Math.min(this.width / (topRightPx[0] - bottomLeftPx[0]), this.height / (-topRightPx[1] + bottomLeftPx[1]));

            this._projection = projection = d3.geoAlbers()
                .parallels([bottomLeft[1], topRight[1]])
                .rotate([rotLong, 0, 0])
                .translate([this.width / 2, this.height / 2])
                .scale(scaleFactor * 0.975 * 1000)
                .center(center);

            this._geoPath = d3.geoPath().projection(projection);

            const graticule = d3.geoGraticule()
                .step([0.5, 0.5]);

            this._g.append("path")
                .datum(graticule)
                .attr("class", "graticuleLine")
                .attr("d", this._geoPath);

            this._g.selectAll("path.feature")
                .data(collection.features)
                .enter()
                .append("path")
                .attr("class", "feature")
                .attr("d", this._geoPath);

            this._g.selectAll("image")
                .data([[0, 0]]).enter()
                .append("image")
                .attr("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/archive/d/d8/20060904222108%21Compass_card_%28de%29.svg")
                .attr("width", 200)
                .attr("height", 200)
                .attr("x", 400)
                .attr("y", 100)
        });
    }

    public set data(data: any[]) {
        const positions: any[] = [];
        data.forEach((team) => {
            positions.push([team.lng, team.lat]);
        });
        // add circles to svg


        this._g.selectAll("circle")
            .data(data).enter()
            .append("circle")
            .attr("cx", (team) => {
                return this._projection([team.lng, team.lat])[0] - 1;
            })
            .attr("cy", (team) => {
                return this._projection([team.lng, team.lat])[1] - 1;
            })
            .attr("r", "2px")
            .attr('stroke-width', 0)
            .attr("fill", (team) => {
                return this._getDivisionColor(team.division)
            })
    }


}

