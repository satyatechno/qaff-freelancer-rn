import { StyleSheet } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.defaultWhite,
        padding: 15,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
        // paddingHorizontal: 2
    },
    titleText: {
        fontSize: 18,
        color: colors.skyBlue,
        fontFamily: fonts.primarySB
    },
    serialText: {
        fontSize: 16,
        color: colors.appBlack,
        fontFamily: fonts.secondary
    },
});

export default styles;
