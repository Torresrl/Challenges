import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, CardSection, Card, Button} from './common';
import {newEmailChange, newPasswordChange} from '../Actions';

class NewUser extends Component {

    onEmailChange(text){
        this.props.newEmailChange(text);
    }

    onPasswordChange(text) {
        this.props.newPasswordChange(text);
    }


    render() {
        return (
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
                        Submit
                    </Button>
                </CardSection>

            </Card>
        );
    }
}

const mapStateToProps = ({register}) => {
    const{email, password} = register;
    return {email, password};
};


export default connect(mapStateToProps, {newEmailChange, newPasswordChange})(NewUser);