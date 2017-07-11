import React, {Component} from 'react';
import {ListView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {Button} from '../common';
import {challengesFetch} from '../../Actions';
import ChallengesListItem from './ChallengesListItem';



class Challenges extends Component {
    //Denne kobles opp i router
    static renderRightButton = () =>{
        return(
            <Button style={styles2.styleAddChal} onPress={ () => {Actions.newChallenges()}}>
                +
            </Button>
        );
    };

    componentWillMount() {
        this.props.challengesFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps);
    }

    createDataSource({challengesList}){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(challengesList)
    }

    renderRow(challenges){
        return <ChallengesListItem challenges={challenges}/>
    }


    render() {
        return(
            <View style={styles2.containerStyle}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                />
            </View>
        );
    }
}

styles2 = {
    containerStyle: {
        marginTop: 70
    },
    styleAddChal: {
        alignItems: 'center',
        justifyContent: 'center'
    }

};

const mapStateToProps = state => {
    const challengesList = _.map(state.challengesList, (val, uid) => {
        return {...val, uid};
    });
    return {challengesList};
};

export default connect(mapStateToProps, {challengesFetch})(Challenges);