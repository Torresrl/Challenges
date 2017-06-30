import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {Input, CardSection, Card, Button} from './common';
import {newEmailChange, newPasswordChange, createUser} from '../Actions';

class NewUser extends Component {

    onEmailChange(text){
        this.props.newEmailChange(text);
    }

    onPasswordChange(text) {
        this.props.newPasswordChange(text);
    }

    onSubmit() {
        const{email, password} = this.props;
        this.props.createUser({email, password});
    }


    render() {

        const{email, password} = this.props;

        return (
            <Card >

                <CardSection >
                    <Input
                        placeholder="user@gmail.com"
                        label="Email:"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={email}
                    />
                </CardSection>

                <CardSection >
                    <Input
                        secureTextEntry
                        placeholder="Password"
                        label="Password:"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={password}
                    />
                </CardSection>

                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>

                <CardSection>
                    <Button onPress={ () => {this.onSubmit()}}>
                        Submit
                    </Button>

                </CardSection>

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center'

    }
};

const mapStateToProps = ({register}) => {
    const{email, password, error} = register;
    return {email, password, error};
};


export default connect(mapStateToProps, {newEmailChange, newPasswordChange, createUser})(NewUser);