import React, {Component} from 'react';
import {Text, ScrollView, Image, ListView} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getImage} from '../../Actions';
import {Spinner, Card, CardSection} from '../common';



class ShowChallenges extends Component {

    componentWillMount(){
        const{imageId, challenges} = this.props.challenges;
        const challengeList = _.map(challenges, (val, uid) => {
            return {...val, uid}
        });
        this.state = {challengeList};

        this.props.getImage(imageId);
    }

    createDataSource(){
        const {challengeList} = this.state;
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(challengeList)
    }

    renderRow(challenge){
        return (
            <Card>
                <CardSection>
                    <Text style={styles.nameStyle}>{challenge.name}</Text>
                </CardSection>
                <CardSection>
                    <Text style={styles.descriptionStyle}>{challenge.description}</Text>
                </CardSection>
            </Card>
        );
    }

    renderImage() {
        const {url, load} = this.props;
        const {imageStyle} = styles;

        if(load){
            return(
                <Spinner/>
            );

        }
        return(
            <Image
                source={{uri: url}}
                style={imageStyle}
            />
        );

    }


    render() {
        const {name, description} = this.props.challenges;
        const {ContainerStyle,headerCardStyle,headerStyle} = styles;
        this.createDataSource();

        return (
            <ScrollView style={ContainerStyle}>
                <Card style={{margin: 0}}>
                    <CardSection style={{padding: 0}}>
                        {this.renderImage()}
                    </CardSection>
                </Card>
                <Card style={headerCardStyle}>
                    <Text style={headerStyle}>{name}</Text>
                    <Text>{description}</Text>
                </Card>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                />
            </ScrollView>
        );
    }
}

const styles = {
    ContainerStyle: {
        flex: 1,
        marginTop: 65,
        marginBottom: 65

    },
    imageStyle: {
        flex: 1,
        height: 300
    },

    headerCardStyle: {
        alignItems: 'center',
        shadowRadius: 0,
        borderWidth: 0,
    },

    headerStyle: {
        fontSize: 20,
        marginBottom: 10
    },
    nameStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    descriptionStyle: {
        fontSize: 15
    }

};

const mapStateToProps = ({showChallenges}) => {
    const {url, load} = showChallenges;
    return {url, load};

};

export default connect(mapStateToProps, {getImage})(ShowChallenges);