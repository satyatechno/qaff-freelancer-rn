import { StyleSheet } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultWhite,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5
    },
    header: {

        //  height:130,
        padding: 10
    },
    body: {

        padding: 10,
        marginTop: 3
    },

    title: {
        justifyContent: "space-between",
        flexDirection: "row",

    },

    experience: {

        marginVertical: 7
    },


    locationView: {
        flexDirection: "row",
        marginVertical: 3,
    },

    locationText: {
        color: colors.appBlack,
        fontFamily: fonts.primary,
        fontSize: 12,

    },
    headingText: {
        color: colors.skyBlue,
        fontFamily: fonts.primarySB,
        fontSize: 18,
        flex: 0.9,
        textAlign: "left"
    },
    experienceText: {
        color: colors.appGray,
        fontFamily: fonts.secondarySB,
        fontSize: 12,
        textAlign: "left"
    },
    nameText: {
        color: colors.appBlack,
        fontFamily: fonts.primary,
        fontSize: 16,
        marginTop: 5,
        textAlign: "left"
    },

    timeText: {
        color: colors.appGray,
        // fontFamily:fonts.primary,
        fontSize: 12,
        textAlign: "left"
    },
    description: {
        color: colors.appBlack,
        fontFamily: fonts.secondary,
        fontSize: 14,
        textAlign: "left"
    },
    moreText: {
        color: colors.skyBlue,
        fontFamily: fonts.secondary,
        fontSize: 14,
        textAlign: "left"
    },
});
export default styles;
