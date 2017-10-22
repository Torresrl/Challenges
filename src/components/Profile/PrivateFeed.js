import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import ListItem from './ListItem';
import { retrieveChallange } from '../../Actions';

class PrivateFeed extends Component {

  componentWillMount() {
    console.ignoredYellowBox = ['Setting a timer'];
    this.props.retrieveChallange();
  }

  renderItem({ item }) {
    return <ListItem item={item} />;
  }

    render() {
      return (
          <FlatList
            data={this.props.c}
            //onScroll={() => console.log('here')}
            keyExtractor={item => item.uid}
            renderItem={this.renderItem}
          />
      );
  }
}

const mapStateToProps = ({ profile }) => {
  const { retrievedChallenges } = profile;
  const c =
  _.map(retrievedChallenges, (val, uid) => { return { ...val, uid }; });

  return { retrievedChallenges, c };
};

export default connect(mapStateToProps, { retrieveChallange })(PrivateFeed);
