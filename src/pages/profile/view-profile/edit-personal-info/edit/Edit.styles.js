import { StyleSheet, Dimensions } from "react-native";
import colors from 'src/styles/texts/colors';
import fonts from 'src/styles/texts/fonts';
const { width, height } = Dimensions.get("screen")


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultWhite,
        paddingHorizontal: 10,
        justifyContent: "space-around"
    },

    inputContainer: {
        // marginTop: height * 0.1,
    },
    label: {
        color: colors.appGray,
        fontSize: 14,
        marginBottom: 10,
        fontFamily: fonts.primarySB,
        textAlign: 'left',
    },
})
export default styles
