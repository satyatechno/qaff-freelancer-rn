import { StyleSheet } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultWhite,
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
        fontFamily: fonts.primarySB,
        marginTop: 5
    },
    passwordDetailText: {
        color: colors.appGray,
        fontSize: 12,
        fontFamily: fonts.primary,
        marginTop: 2
    },


});

export default styles;
