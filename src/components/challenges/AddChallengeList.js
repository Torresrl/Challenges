import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListView, View, Text} from 'react-native';
import {updateListView} from '../../Actions';
import {Card, CardSection} from '../common';

class AddChallengeList extends Component {


    renderRow(rowData){
        return (
            <Card>
                <CardSection>
                    <Text>{rowData.name}</Text>
                </CardSection>
                <CardSection>
                    <Text>{rowData.description}</Text>
                </CardSection>
            </Card>
        );
    }


    render() {

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(this.props.challenges);

        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
            />
        );
    }
}

const mapStateToProps = ({newChallenges}) => {
    const {challenges} = newChallenges;
    return {challenges};

};

export default connect(mapStateToProps, {updateListView})(AddChallengeList);