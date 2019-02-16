import React, {Component} from 'react';
import * as Styles from './Map.css';
import {connect} from 'react-redux';
import * as Germany from "../Map/Germany";


class Map extends Component {

    loadData(dispatch) {
        const germanyMap = this.state.germanyMap;
        return fetch('http://localhost:3000/data/kl_b-junioren_niedersachsen_named_distances_big.json').then((data) => {
            return data.json();
        }).then((data) => {
            germanyMap.data = data;
        });
    }

    componentDidMount() {
        const id = '[id="map"]';
        const germanyMap = new Germany.GermanyMap(id);

        this.setState({germanyMap}, () => {
            germanyMap.createMap().then(() => {
                this.loadData(this.props.dispatch);
            });
        });
    }

    render() {
        return (
            <div className={Styles.container}>
                <div id="map"/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {dispatch: state.dispatch};
}
export default connect(mapStateToProps)(Map);
