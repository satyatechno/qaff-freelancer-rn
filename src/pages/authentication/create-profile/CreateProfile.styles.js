import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.appBackground,
    },
    upperHalf: {
        backgroundColor: colors.appBlue,
        height: height * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createAccountImage: {
        height: 130,
        width: 130,
    },
    becomeText: {
        color: colors.defaultWhite,
        fontFamily: fonts.primarySB,
        fontSize: 18,
        textAlign: 'center',
        width: '65%',
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        position: 'absolute',
        bottom: -40,
    },
    createAccountText: {
        color: colors.appBlack,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: fonts.primarySB,
        marginTop: 50,
        marginBottom: 10,
    },
    nameContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    fnameText: {
        fontSize: 14,
        color: colors.appGray,
        marginBottom: 5,
        fontFamily: fonts.primarySB,
        textAlign: 'left',
    },
    genderText: {
        marginStart: 20,
        fontSize: 14,
        color: colors.appGray,
        marginBottom: 5,
        fontFamily: fonts.primarySB,
        textAlign: 'left',
        marginTop: 15,
    },
    genderTypeContainer: {
        flexDirection: 'row',
        marginStart: 20,
    },
    genderBox: {
        borderWidth: 1,
        borderColor: colors.skyBlue,
        borderRadius: 10,

        marginEnd: 25,
        marginBottom: 10,
    },
    genderImage: {
        width: 57,
        height: 45,

        resizeMode: 'contain',
    },
    checkIcon: {
        backgroundColor: colors.appYellow,
        width: 30,
        height: 30,
        padding: 3,
        borderRadius: 15,
        position: 'absolute',
        top: 30,
        start: 45,
    },
    emailText: {
        fontSize: 14,
        color: colors.appGray,
        marginBottom: 5,
        marginStart: 20,
        fontFamily: fonts.primarySB,
        textAlign: 'left',
    },
    emailInput: {
        marginHorizontal: 20,
        fontSize: 16,

        fontFamily: fonts.secondary,
        padding: 2,
        color: colors.appBlack,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    nextButton: {
        marginTop: 30,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: 16,
        fontFamily: fonts.secondarySB,
        color: colors.defaultWhite,
        marginEnd: 5,
    },
    footer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 20,
    },
    footerLeftText: {
        color: colors.appGray,
        marginEnd: 5,
        fontFamily: fonts.primary,
    },
    footerRightText: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        marginBottom: 20,
        fontFamily: fonts.primary,
        color: colors.appViolet,
    },
    input: {
        fontSize: 16,

        fontFamily: fonts.secondary,
        padding: 2,
        color: colors.appBlack,
    },
});

export default styles;
