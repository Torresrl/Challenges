import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Input, CardSection, Card, Button} from './common';
import {emailChange, passwordChange} from '../Actions';



class LoginForm extends Component {

    onEmailChange(text){
        this.props.emailChange(text);
    }

    onPasswordChange(text){
        this.props.passwordChange(text);
    }

    onNewUser(){
        Actions.newUser();
    }

    render () {
        return(
                <Card >

                    <CardSection >
                        <Input
                            placeholder="user@gmail.com"
                            label="Email:"
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                    </CardSection>

                    <CardSection >
                        <Input
                            secureTextEntry
                            placeholder="Password"
                            label="Password:"
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                    </CardSection>

                    <CardSection>
                        <Button>
                            Login
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onNewUser.bind(this)}>
                            New User
                        </Button>
                    </CardSection>

                </Card>

        );

    }
}

const mapStateToProps = ({auth}) => {
    const{email, password } = auth;
    return {email, password};
};

export default connect(mapStateToProps, {
        emailChange,
        passwordChange
    })(LoginForm);

