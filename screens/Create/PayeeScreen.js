import { DatepickerInput, Input, KeyboardAvoidingView, ScrollView, View } from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

export default function CreatePayee({ navigation }) {
	const colorScheme = useColorScheme();
	const containerBG = {
		backgroundColor: Colors[colorScheme].background
	};

	return (
		<ScrollView style={[{ width: "100%", padding: 0 }, containerBG]}>
			<View style={styles.container}>
				<View style={[styles.container, { width: "100%", height: "auto", padding: 0 }]}>
					<Input label="Name" />
					<CalculatorInput label="Initial Balance" />
					<CalculatorInput label="Debt Balance" />
					<DatepickerInput label="Initial Date" />
				</View>
			</View>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
			>
				<View style={[styles.container, { width: "100%", padding: 0 }]}>
					<PrimaryButton />
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: "#2e78b7",
	},
});