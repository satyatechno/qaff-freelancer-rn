import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Header from "src/components/header/Header";
import styles from "./Accessibility.styles";

export class Accessibility extends Component {
    render() {
        return (
            <>
                <Header
                    title="Accessibility"
                    backButton={true}
                    navigation={this.props.navigation}
                />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                    <View style={styles.container}>

                        <View style={{}}>
                            <Text style={styles.passwordText}>Qaff Digital Accessibility Statement </Text>
                            <Text style={styles.passwordDetailText}>
                                Qaff is committed to providing an accessible experience to our customers and the public, regardless of background, nationality, race, ethnicity, gender, gender identity, sexual orientation, disability status, veteran status, or other similarly protected characteristics. This Qaff Digital Accessibility Statement concerns our commitment to providing access to persons with disabilities. Please also see our Nondiscrimination Statement.{"\n"}

Please contact our Accessibility Coordinator at accessibilitycoordinator@upwork.com or send a letter addressed to: Attn: Accessibility Coordinator, 2625 Augustine Drive, Suite 601, Santa Clara, CA 95054, USA, to learn more about accessibility support services Qaff.
                            </Text>
                            <Text style={styles.passwordText}>Reasonable Accommodations</Text>
                            <Text style={styles.passwordDetailText}>
                                Individuals who need a reasonable accommodation to access Qaff services and information should send an email to accessibilitycoordinator@Qaff.com or send a letter addressed to: Attn: Accessibility Coordinator, 2625 Augustine Drive, Suite 601, Santa Clara, CA 95054, USA to provide information about the nature of the requested accommodation. Requesters must include contact information such as an email address or telephone number at which they can be reached. Depending on the nature of the request, Qaff may need sufficient notice to provide a reasonable accommodation.
                            </Text>
                            <Text style={styles.passwordText}>Online Accessibility</Text>
                            <Text style={styles.passwordDetailText}>
                                Qaff strives to provide an accessible digital experience for our users. In the event that a user with a disability experiences accessibility issues with our website or mobile application, please notify us by sending an email to
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

export default Accessibility
