import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchTimeline} from '../../../Actions';
import {ListView} from 'react-native';
import TimelineItem from './TimelineItem';


class DoAChallengeTimeline extends Component {

    componentWillMount(){
        const {challengesId, challengeId} = this.props;
        this.props.fetchTimeline(challengesId, challengeId);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps);
    }

    createDataSource({timelineList}){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(timelineList)
    }

    renderRow(timelineItem){
        const {challengesId, challengeId, owner} = this.props;

        return <TimelineItem
            post={timelineItem}
            challengesId={challengesId}
            challengeId={challengeId}
            owner={owner}
        />
    }


    render() {
        const {containerStyle} = styles;

        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
                style={containerStyle}
            />

        );
    }

}

const styles = {
    containerStyle: {
        marginBottom: 65
    }
};



const mapStateToProps = ({doAChallenge}) => {
    const {timeline} = doAChallenge;
    const timelineList = _.map(timeline, (val, uid) => {
        return {...val, uid};
    });

    return {timelineList};
};

export default connect(mapStateToProps, {fetchTimeline}) (DoAChallengeTimeline);