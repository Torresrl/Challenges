import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Input, CardSection, Card, Button, Spinner} from '../common';
import {newEmailChange, newPasswordChange, createUser} from '../../Actions';

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

    renderContent() {
        const{email, password, load} = this.props;

        if(load){
            return(
                <View style={styles.spinnerStyle}>
                    <Spinner size="large"/>
                </View>
            )
        }

        return (
            <Card style={styles.cardStyle}>
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


    render() {
        return (
            <View>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
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
    }
};

const mapStateToProps = ({register}) => {
    const{email, password, error, load} = register;
    return {email, password, error, load};
};


export default connect(mapStateToProps, {newEmailChange, newPasswordChange, createUser})(NewUser);