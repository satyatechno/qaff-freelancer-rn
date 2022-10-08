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
        textAlign: "left",
        fontSize: 12,

    },
    headingText: {
        color: colors.skyBlue,
        fontFamily: fonts.primarySB,
        textAlign: "left",
        fontSize: 18,
        flex: 0.9
    },
    experienceText: {
        color: colors.appViolet,
        fontFamily: fonts.secondary,
        textAlign: "left",
        fontSize: 14,
    },
    nameText: {
        color: colors.appBlack,
        fontFamily: fonts.primary,
        textAlign: "left",
        fontSize: 16,
        marginTop: 5
    },

    timeText: {
        color: colors.appGray,
        fontFamily: fonts.primary,
        textAlign: "left",
        fontSize: 12,
        textAlignVertical: "center",
        marginStart: 5
    },
    description: {
        color: colors.appBlack,
        fontFamily: fonts.secondary,
        textAlign: "left",
        fontSize: 14
    },
    moreText: {
        color: colors.skyBlue,
        fontFamily: fonts.secondary,
        textAlign: "left",
        fontSize: 14
    },
});
export default styles;
