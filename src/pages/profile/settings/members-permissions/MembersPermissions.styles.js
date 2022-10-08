import { StyleSheet } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appBackground,
    },
    card1: {
        backgroundColor: colors.defaultWhite,
        margin: 10,
        borderRadius: 2,
        elevation: 2
    },
    passwordText: {
        color: colors.appBlack,
        fontSize: 18,
        fontFamily: fonts.primarySB
    },
    passwordSetText: {
        color: colors.appBlack,
        fontSize: 14,
        fontFamily: fonts.primarySB
    },
    passwordDetailText: {
        color: colors.appGray,
        fontSize: 12,
        fontFamily: fonts.primary,
        marginTop: 2
    },
    checkIcon: {
        backgroundColor: colors.skyBlue,
        width: 25,
        height: 25,
        padding: 1,
        borderRadius: 13,
        marginEnd: 15,
    },
    button: {
        backgroundColor: colors.skyBlue,
        borderRadius: 10,
        height: 45,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: colors.defaultWhite,
        fontSize: 16,
        fontFamily: fonts.secondarySB,
    },
    learnMoreText: {
        color: colors.skyBlue,
        fontSize: 12,
        fontFamily: fonts.secondary,
        textDecorationLine: "underline",
        marginTop: 5
    },
    memberfees: {

    },
});

export default styles;
