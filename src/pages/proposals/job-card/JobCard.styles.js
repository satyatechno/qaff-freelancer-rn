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
        justifyContent: "space-between",
        flexDirection: "row",
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
        fontFamily: fonts.secondary,
        fontSize: 12
    },
    nameText: {
        color: colors.appBlack,
        fontFamily: fonts.primary,
        fontSize: 16,
        marginTop: 5,
        textAlign: "left"
    },
    budgetText: {
        color: colors.appViolet,
        fontFamily: fonts.primarySB,
        fontSize: 18
    },
    timeText: {
        color: colors.appGray,
        // fontFamily:fonts.primary,
        fontSize: 12
    },
    description: {
        color: colors.appBlack,
        fontFamily: fonts.secondary,
        fontSize: 14,
        textAlign: "left"
    },
    viewJobText: {
        color: colors.skyBlue,
        fontFamily: fonts.secondary,
        fontSize: 14,
        textAlign: "left"
    },
});
export default styles;
