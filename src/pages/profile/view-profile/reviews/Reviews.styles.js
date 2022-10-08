import { Dimensions, StyleSheet } from "react-native";
import colors from "src/styles/texts/colors";
import fonts from "src/styles/texts/fonts";
const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: colors.defaultWhite,
        padding: 10,
        marginHorizontal: 16,
        marginVertical: 10,
        elevation: 5,
    },
    reviewContainer_Top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewerName: {
        color: colors.skyBlue,
        fontSize: 20,
        fontFamily: fonts.primarySB,
    },
    reviewTime: {
        fontSize: 16,
        fontFamily: fonts.primary,
        color: colors.appViolet,
    },
    reviewRatingContainer: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
    },
    ratingText: {
        marginStart: 5,
        textAlign: 'left',
        color: colors.appGray,
        fontWeight: 'bold',
    },
    reviewDescription: {
        color: colors.appBlack,
        fontFamily: fonts.secondary,
        marginTop: 10,
    },

})
export default styles