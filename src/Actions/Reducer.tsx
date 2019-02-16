import {Team} from "../Map/Germany";
import {enumActions} from "./Actions";

export interface IState {
    data: Team[];
}

export const initialState: IState = {
    data: [],
}

export function loadData(state = initialState, action: any) {
    switch (action.type) {
        case enumActions.LoadData:
            return Object.assign({}, state, {
                data: action.data,
            })
    }
}
