import React, {Component} from 'react';
import './App.css';
import Map from "./Map/Map";
import * as Reducer from "./Actions/Reducer";
import * as Actions from "./Actions/Actions";
import * as Germany from "./Map/Germany";
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';


const store = createStore(Reducer.loadData, composeWithDevTools());
store.subscribe(() => {
    console.log(store.getState());
})
store.dispatch(Actions.loadData([new Germany.Team(
    '12', 'name', 123, 444
)]));
store.dispatch(Actions.loadData([new Germany.Team(
    '12', 'name', 454, 887
)]));


class App extends Component {

    constructor() {
        super()


        this.state = {
            mapData: [],
        };
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Map/>
                </div>
            </Provider>

        );
    }
}

export default App;
