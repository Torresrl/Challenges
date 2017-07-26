import React, {Component} from 'react';
import {ScrollView, View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Input, CardSection, Card, Button, Spinner} from '../common';
import ImagePicker from 'react-native-image-picker';
import {addProfilePic} from '../../Actions';

/* README
profile pic har local state
*/


class AddProfilePicture extends Component {

  constructor(){
    super();
    this.state = {profile_pic_url : ""};
  }

  onAddImage(text){
    this.props.addProfilePic(text);
  }

  renderContent() {
    const{spinnerStyle, cardStyle, errorTextStyle, styleButton} = styles;
    return (
      <ScrollView>
        {this.renderPicture()}
      </ScrollView>
    );
  }

  renderPicture(){
    const{styleFirstCard, imageStyle} = styles;
    if(this.props.render_profile_pic){
      return(
        <View>
          <Card>
            <CardSection>
              <Image source={{uri: this.state.profile_pic_url}}
               style={imageStyle}/>
            </CardSection>
          </Card>
        </View>
      );
    }else{
      return (
        <Card style={styleFirstCard}>
          <CardSection>
            <Button onPress={() => {this.chooseImage()}}>
              Add Picture
            </Button>
          </CardSection>
        </Card>
      );
    }
  }

  chooseImage() {
    ImagePicker.showImagePicker(null, (response) => {
      console.log('Response = ', response)
      if( response.didCancel ){
        console.log('Cancel by user');
      }
      else if( response.error ){
        console.log('ImagePicker error: ', response.error );
      }
      else if( response.customButton ) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({profile_pic_url : response.uri})
        this.onAddImage(response.uri)
      }
    });
  }




  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  styleFirstCard: {
      marginTop: 70
  },

  imageStyle: {
      height: 300,
      flex:1,
      width: null
  },

      errorTextStyle: {
          color: 'red',
          fontSize: 12,
          alignSelf: 'center'
      },

      spinnerStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 250

      },
      cardStyle: {
          marginTop: 70
      },
      styleButton: {
          borderWidth: 1
      }
  };

const mapStateToProps = ({addProfilePicture}) => {
  const{render_profile_pic} = addProfilePicture;
  return {render_profile_pic};
}

export default connect(mapStateToProps, {addProfilePic})(AddProfilePicture);
