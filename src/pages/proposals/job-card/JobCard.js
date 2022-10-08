import React, { Component } from 'react'
import { Text, View, } from 'react-native'
import CustomButton from 'src/components/button/CustomButton'
import { Icon } from 'src/Icon'
import colors from 'src/styles/texts/colors'
import styles from './JobCard.styles'
import moment from "moment";
import { withTranslation } from 'react-i18next'
export class JobCard extends Component {
    render() {
        const { navigation, title, budget, discription, name, time, location, id, t } = this.props
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <Text style={styles.headingText}>{title}</Text>
                        <Text style={styles.budgetText}>{budget}</Text>
                    </View>
                    <View style={styles.experience}>
                        <Text style={styles.experienceText}>{t("proposalDetails.experience")}</Text>
                        <Text style={styles.timeText}>{moment.unix(time).fromNow()}</Text>
                    </View>
                    <Text style={styles.nameText}>{name}</Text>
                    {location ? <View style={styles.locationView}>
                        <Icon
                            name="location"
                            color={colors.appBlack}
                            size={14}
                            style={{ marginTop: 2 }}
                        />
                        <Text style={styles.locationText}>{location}</Text>
                    </View> : null}

                </View>
                <View style={{ height: 1, backgroundColor: colors.appGray1 }} />
                <View style={styles.body}>
                    <Text style={styles.description} numberOfLines={3}>
                        {discription}
                        {/* {discription?.length > 200 &&
                            <CustomButton
                                handlePress={() => { alert("Coming Soon...") }}
                            >
                                <Text style={styles.viewJobText}> more...</Text>
                            </CustomButton>} */}
                    </Text>
                    <CustomButton handlePress={() => { navigation.navigate("ProjectDtails", { id: id }) }}>
                        <Text style={styles.viewJobText}>{t("proposalDetails.viewJobPosting")}</Text>
                    </CustomButton>
                </View>
            </View>

        )
    }
}

export default withTranslation()(JobCard)
