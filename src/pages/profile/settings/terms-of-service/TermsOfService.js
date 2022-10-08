import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Header from "src/components/header/Header";
import styles from "./TermsOfservice.styles";

export class TermsOfService extends Component {
    render() {
        return (
            <>
                <Header
                    title="Terms Of Service"
                    backButton={true}
                    navigation={this.props.navigation}
                />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                    <View style={styles.container}>

                        <View style={{}}>
                            <Text style={styles.passwordText}>Lorem ipsum dolor </Text>
                            <Text style={styles.passwordDetailText}>
                                sit amet, consectetur adipiscing elit, sed do eiusmod tempor.{"\n"}

                                Incididunt ut labore et Ut enim ad minim veniam, quis nostrud xercitation ullamco. laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.{"\n"}
                            </Text>
                            <Text style={styles.passwordText}>Incididunt ut labore</Text>
                            <Text style={styles.passwordDetailText}>
                                et Ut enim ad minim veniam, quis nostrud xercitation ullamco. laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.{"\n"}
                                Incidiut labore et Ut enim ad minim veniam, quis nostrud xercitation ullamco. laboris nisi ut aliquip ex ea commodo consequat.{"\n"}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.{"\n"}
                            </Text>
                            <Text style={styles.passwordText}>Incididunt</Text>
                            <Text style={styles.passwordDetailText}>
                                ut labore et Ut enim ad minim veniam, quis nostrud xercitation ullamco. laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.{"\n"}

                            </Text>
                            <Text style={styles.passwordText}>Incididunt</Text>
                            <Text style={styles.passwordDetailText}>
                                ut labore et Ut enim ad minim veniam, quis nostrud xercitation ullamco. laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.{"\n"}

                            </Text>
                        </View>

                    </View>
                    <View style={styles.card1}>
                    </View>

                </ScrollView>
            </>
        );
    }
}

export default TermsOfService
