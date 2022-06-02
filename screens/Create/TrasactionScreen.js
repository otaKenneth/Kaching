import { DatepickerInput, Input, KeyboardAvoidingView, ScrollView, Select, SubmitButton, View } from "../../components/Themed";
import { CalculatorInput } from "../../components/Calculator";
import { StyleSheet, useColorScheme } from "react-native";
import AccountList from "../../hooks/bankList"
import Colors from "../../constants/Colors";

export default function CreateTransaction({ navigation }) {
  const colorScheme = useColorScheme();
  const containerBG = {
    backgroundColor: Colors[colorScheme].background
  };

	const types = [{
		title: "Select Type",
		data: ["Income", "Expense"]
	}];

	const categories = [{
		title: "Select Category",
		data: ["Daily Living", "Dues/Subscription", "Financial Savings", "Misc"]
	}];

	const accountList = [{
		title: "Select Account",
		data: AccountList().map(data => data.name)
	}];

	const payees = [{
		title: "Select Payee",
		data: AccountList().map(data => `Account: ${data.name}`)
	}];

	return (
		<ScrollView style={[{ width: "100%", padding: 0 }, containerBG]}>
			<View>
				<View style={styles.container}>
					<View style={[styles.container, { width: "100%", height: "auto", padding: 0 }]}>
						<Select label="Type" options={types} />
						<Select label="Category" options={categories} />
						<Input label="Description" />
						<CalculatorInput label="Amount" />
						<DatepickerInput label="Transaction Date" />
						<Select label="From" options={accountList} />
						<Select label="To" options={payees} />
						<Input label="Comment" />
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
			</View>
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