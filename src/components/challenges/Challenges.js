import React, {Component} from 'react';
import {ListView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {Button, Spinner} from '../common';
import {challengesFetch} from '../../Actions';
import ChallengesListItem from './ChallengesListItem';
import ChallengesList from './ChallengesList';



class Challenges extends Component {
    //Denne kobles opp i router
    static renderRightButton = () =>{
        return(
            <Button style={styles2.styleAddChal} onPress={ () => {Actions.newChallenges()}}>
                +
            </Button>
        );
    };

    renderContent () {
        if(this.props.load) {
             return (
                 <Spinner/>
             );
        }
        return (
            <ChallengesList/>
        );
    }


    render() {

        return(
            <View style={styles2.containerStyle}>
                {this.renderContent()}
            </View>
        );
    }
}

styles2 = {
    containerStyle: {
        marginTop: 70,
        flex:1
    },
    styleAddChal: {
        alignItems: 'center',
        justifyContent: 'center'
    }

};

const mapStateToProps = ({challenges}) => {
    const {load} = challenges;
    return {load};

};


export default connect (mapStateToProps) (Challenges);