import { DatepickerInput, Input, KeyboardAvoidingView, ScrollView, SubmitButton, View } from "../../components/Themed";
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet } from "react-native";

export default function CreateBudget({ navigation }) {

	return (
		<ScrollView style={[{ width: "100%", padding: 0 }]}>
			<View style={styles.container}>
				<View style={[styles.container, { width: "100%", height: "auto", padding: 0 }]}>
					<DatepickerInput label="Start Date" />
					<DatepickerInput label="End Date" />
					<CalculatorInput label="Initial Balance" />
					<Input label="Budget Name" />
				</View>
			</View>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
			>
				<View style={[styles.container, { width: "100%", padding: 0 }]}>
					<SubmitButton />
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
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