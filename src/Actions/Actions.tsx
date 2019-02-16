import {Team} from "../Map/Germany";

export enum enumActions {
    LoadData = 'LoadData',
}

export function loadData(data: Team[]) {
    return {data, type: enumActions.LoadData}
}