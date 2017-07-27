import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import firebase from 'firebase';
import {Card, Spinner, CardSection, Button} from '../../common';

/*
Read me:

Denne bruker ikke redux, så allt som skjer er inni denne filen.
Grunnen er at jeg ikke vil at staten skal være like i alle list items.


for gjenbruk trenger den propsene:
chellengeId,
challengesId
owner
post = {alle propsene i en challenge}
 */


class TimelineItem extends Component {

    constructor(){
        super();
        this.state = {
            imageUrl: ''
        };
    }

    componentWillMount(){
        const {image} = this.props.post;

        firebase.storage()
            .ref(image).getDownloadURL()
            .then((url) => {
                this.setState({imageUrl: url});
            });


    }


    //Database funskjoner:
    updateVotes(upVote){
        const {challengesId} = this.props;

        let votes = parseInt(this.props.post.votes);
        const database = firebase.database();
        let followers = {};

        if(upVote){
            votes = votes + 1;
        } else {
            votes = votes - 1;
        }

        database
            .ref('/challenges/' + challengesId + '/followers')
            .on('value', (snap) => followers = snap.val());



        let fanoutObj = this.fanoutPost({
            followersSnapshot: followers,
            votes: votes
        });

        database.ref().update(fanoutObj);

    }

    //lager fanout object, gjør sånn du får atmoic update
  fanoutPost = ({followersSnapshot, votes}) => {
      const {currentUser} = firebase.auth();
      const {challengesId, challengeId, owner} = this.props;
      const {userId} = this.props.post;

      let fanoutObj = {};

      if(followersSnapshot && followersSnapshot !== 'null' && followersSnapshot !== 'undefined') {
          let followers = Object.keys(followersSnapshot);
          followers.forEach((key) => fanoutObj[
          '/Users/' + key +
          '/myChallenges/' + challengesId +
          '/challenges/' + challengeId +
          '/timeline/' + userId +
          '/votes'] = votes);
      }

      fanoutObj['/Users/' + currentUser.uid +
      '/myChallenges/' + challengesId +
      '/challenges/' + challengeId +
      '/timeline/' + userId +
      '/voted'] = true;

      fanoutObj[
      '/Users/' + owner +
      '/myChallenges/' + challengesId +
      '/challenges/' +challengeId +
      '/timeline/' + userId +
      '/votes'] = votes;

      fanoutObj[
      '/challenges/' + challengesId +
      '/challenges/' +challengeId +
      '/timeline/' + userId +
      '/votes'] = votes;



      return fanoutObj;

  };


    getWeekDay(dayInWeek){
        switch (dayInWeek) {
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            case 7:
                return 'Sunday';
            default:
                return '------';
        }
    }

    getMonth(month){
        switch (month) {
            case 1:
                return 'January';
            case 2:
                return 'Februar';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
        }
    }

    renderImage(){
        const {imageUrl} = this.state;
        const {imageStyle} = styles;
        if(imageUrl.length == null || imageUrl.length === 0){
            return (
                <Spinner
                    size="small"
                    style={imageStyle}
                />
            )
        } else {
            return (
                <Image
                    source={{uri: this.state.imageUrl}}
                    style={imageStyle}
                />

            )
        }

    }



    render(){
        const {comment, userName, postedAt} = this.props.post;
        const {buttonContainer, commentContainer, styleDate} = styles;

        //datoene er i millisekunder
        const postDate = parseInt(postedAt);

        //dagen i dag i millisekunder
        let todaysDate = new Date().getTime();

        //datoen som skal vises
        let postDateString = '';
        const postDateObject = new Date(postDate);

        //sjekker om posten ble laget innen en dag
        if(postDate + 86400< todaysDate){
            postDateString = postDateObject.getHours()
                + '.' + postDateObject.getMinutes();

            //sjekker om posten ble laget innen en uke
        } else if (postDate + 604800000 < todaysDate){
            postDateString = this.getWeekDay(postDateObject.getDay())
                + ' ' + postDateObject.getHours()
                + '.' + postDateObject.getMinutes();

            //sjekker om posten ble laget i år
        } else if(postDate + 31536000000 < todaysDate) {
            postDateString = postDateObject.getDay() + ' ' + this.getMonth(postDateObject.getMonth());

        } else {
            postDateString = postDateObject.getDay() + '/' +
                postDateObject.getMonth() + '/' +
                postDateObject.getYear();
        }


        return (
            <Card>
                <CardSection>
                    <Text>
                        {userName}
                    </Text>
                </CardSection>
                <CardSection>
                    <Text style={styleDate}>
                        {postDateString}
                    </Text>
                </CardSection>
                {this.renderImage()}
                <CardSection>
                    <Text
                        style={commentContainer}
                    >
                        {comment}
                    </Text>
                </CardSection>
                <CardSection>
                    <View style={buttonContainer}>
                        <Button>
                            comment
                        </Button>
                    </View>
                    <View style={buttonContainer}>
                        <Button onPress={() => {this.updateVotes(true)}}>
                            Up
                        </Button>
                        <Button onPress={() => {this.updateVotes(false)}}>
                            Down
                        </Button>
                    </View>
                </CardSection>

            </Card>
        )
    }
}

const styles = {
    imageStyle: {
        flex: 1,
        height: 300
    },

    commentContainer: {
      marginBottom: 5
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row'

    },

    styleDate: {
        fontSize: 12,
        fontStyle: 'italic'
    }

};



export default TimelineItem;