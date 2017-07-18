import React, {Component} from 'react';
import {ListView} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {challengesFetch} from '../../../Actions';
import ChallengesListItem from './ChallengesListItem';

class ChallengesList extends Component{

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
                <ListView
                    enableEmptySections={true}
                    dataSource={this.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                />
        );
    }

}

const mapStateToProps = state => {
    const challengesList = _.map(state.challengesList, (val, uid) => {
        return {...val, uid};
    });
    return {challengesList};
};

export default connect(mapStateToProps, {challengesFetch})(ChallengesList);