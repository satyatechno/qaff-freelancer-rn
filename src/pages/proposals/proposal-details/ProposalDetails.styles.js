import { StyleSheet } from 'react-native';
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultWhite,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        // padding: 16
    },
    proposedItemContainer: {
        padding: 10,
        borderBottomColor: colors.appGray,
        borderBottomWidth: 0.5
    },
    proposedItemText: {
        color: colors.appViolet,
        fontSize: 18,
        fontFamily: fonts.primarySB,
        textAlign: "left"
    },
    clientBudgetContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomColor: colors.appGray,
        borderBottomWidth: 0.5
    },
    clientbBudgetText: {
        flex: 1,
        color: colors.skyBlue,
        fontSize: 14,
        fontFamily: fonts.secondary
    },
    budgetText: {
        color: colors.appBlack,
        fontSize: 12,
        fontFamily: fonts.secondary
    },
    milestoneContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    milestoneText: {
        flex: 1,
        color: colors.skyBlue,
        fontSize: 14,
        fontFamily: fonts.secondary
    },
    milestone: {
        color: colors.appBlack,
        fontSize: 12,
        fontFamily: fonts.secondary
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    withdrawButton: {
        borderColor: colors.appRed
    },
    withdrawButtonText: {
        color: colors.appRed,
        paddingHorizontal: 20,
        fontSize: 12,
        fontFamily: fonts.primarySB
    },
    changeButton: {
        backgroundColor: colors.appYellow
    },
    changeButtonText: {
        color: colors.defaultWhite,
        paddingHorizontal: 34,
        fontSize: 12,
        fontFamily: fonts.primarySB
    },

});
export default styles;
