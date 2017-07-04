import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListView, View, Text} from 'react-native';
import {Card, CardSection} from './common';

class AddChallengeList extends Component {

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        //nextProps are the next set of props that this component
        //will be rendered with
        //this.props is still the old set of props
        this.createDataSource(nextProps);

    }

    createDataSource() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(this.props.challenges)
    }

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

export default connect(mapStateToProps)(AddChallengeList);