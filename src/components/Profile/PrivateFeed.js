import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ListView } from 'react-native';
import ListItem from './ListItem';
import { retrieveChallange } from '../../Actions';

class PrivateFeed extends Component {

  componentWillMount() {
    console.ignoredYellowBox = ['Setting a timer'];
    this.props.retrieveChallange();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ c }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(c);
  }

  renderRow(item) {
    return <ListItem item={item} />;
  }

    render() {
      return (
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      );
  }
}

const mapStateToProps = ({ profile }) => {
  const { retrievedChallenges } = profile;
  const c =
  _.map(retrievedChallenges, (val, uid) => { return { ...val, uid }; });
  console.log(c);

  return { c };
};

export default connect(mapStateToProps, { retrieveChallange })(PrivateFeed);
