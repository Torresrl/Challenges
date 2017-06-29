import React, {Component} from 'react';
import {Input, CardSection, Card, Button, Container} from './common';
import { Text, View} from 'react-native';

class LoginForm extends Component {
    render () {
        return(

            <View>
                <Card>

                    <CardSection>
                        <Input
                            placeholder="user@gmail.com"
                            label="Email:"
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            secureTextEntry
                            placeholder="Password"
                            label="Password:"
                        />
                    </CardSection>

                    <CardSection>
                        <Button>
                            Login
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button>
                            New User
                        </Button>
                    </CardSection>


                </Card>

                

            </View>


        );

    }
}


export default LoginForm;

