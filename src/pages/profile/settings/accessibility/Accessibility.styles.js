import { StyleSheet } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultWhite,
    },

    passwordText: {
        color: colors.appBlack,
        fontSize: 18,
        fontFamily: fonts.primarySB,
        padding: 10
    },
    passwordDetailText: {
        color: colors.appBlack,
        fontSize: 14,
        fontFamily: fonts.primary,
        marginTop: 2,
        paddingHorizontal: 10
    },


});

export default styles;
