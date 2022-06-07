import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, Modal } from "./Themed";

import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import appStyles from "../assets/styles/appStyles";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";


export default function CreateButton({ navigation }) {
	const [showModal, setShowModal] = useState(false);
	const colorScheme = useColorScheme();

	const textBackground = {
		backgroundColor: Colors[colorScheme].background
	};

	return (
		<View style={{ backgroundColor: "transparent" }}>
			<Modal
				animationType="fade"
				visible={showModal}
				transparent={true}
				swipeDirection="down"
				style={{ justifyContent: "flex-end" }}
			>
				<View style={[appStyles.modalContainer, { paddingBottom: 60 }]}>

					<View style={styles.floatingBtnsContainer}>
						<View style={styles.floatingBtnsChildContainer}>
							<View style={{ alignItems: "center", backgroundColor: "transparent" }}>
								<Text style={[styles.actionBtnName, textBackground]}>Account</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => {
										setShowModal(false);
										navigation.navigate('Add', {screen: 'CreateAccount'})
									}}
								>
									<Ionicons name="wallet-outline" size={30} title="Account" />
								</TouchableOpacity>
							</View>

							<View style={{ alignItems: "center", backgroundColor: "transparent" }}>
								<Text style={[styles.actionBtnName, textBackground]}>Transfer</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => {
										setShowModal(false);
										navigation.navigate('Add', {screen: 'CreateTransfer'})
									}}
								>
									<Ionicons name="swap-horizontal-outline" size={30} title="Account" />
								</TouchableOpacity>
							</View>
						</View>

						<View style={[styles.floatingBtnsChildContainer, { top: -40, left: -7, }]}>
							<View style={{ alignItems: "center", backgroundColor: "transparent", alignItems: "center", }}>
								<Text style={[styles.actionBtnName, textBackground]}>Budget Record</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => {
										setShowModal(false);
										navigation.navigate('Add', {screen: 'CreateBudget'})
									}}
								>
									<Ionicons name="reader-outline" size={30} />
								</TouchableOpacity>
							</View>
							
							<View style={{ alignItems: "center", backgroundColor: "transparent", alignItems: "center", }}>
								<Text style={[styles.actionBtnName, textBackground]}>Income</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => {
										setShowModal(false);
										navigation.navigate('Add', {screen: 'CreateIncome'});
									}}
								>
									<Ionicons name="arrow-down" size={30} />
								</TouchableOpacity>
							</View>
							
							<View style={{ alignItems: "center", backgroundColor: "transparent", alignItems: "center", }}>
								<Text style={[styles.actionBtnName, textBackground]}>Expense</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => {
										setShowModal(false);
										navigation.navigate('Add', {screen: 'CreateExpense'});
									}}
								>
									<Ionicons name="arrow-up" size={30} />
								</TouchableOpacity>
							</View>
						</View>

						<View style={[styles.floatingBtnsChildContainer, { top: 0, left: -14, }]}>
							<View style={{ alignItems: "center", backgroundColor: "transparent" }}>
								<Text style={[styles.actionBtnName, textBackground]}>Payee</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => {
										setShowModal(false);
										navigation.navigate('Add', {screen: 'CreatePayee'})
									}}
								>
									<Ionicons name="person" size={30} />
								</TouchableOpacity>
							</View>

							<View style={{ alignItems: "center", backgroundColor: "transparent" }}>
								<Text style={[styles.actionBtnName, textBackground]}>Payer</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => {
										setShowModal(false);
										navigation.navigate('Add', {sceen: 'CreatePayer'})
									}}
								>
									<Ionicons name="person-outline" size={30} />
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View style={{ top: 1.3, width: "100%", height: 30, backgroundColor: "transparent", alignItems: "center" }}>
						<TouchableOpacity
							style={[styles.actionBtns, { width: 60, height: 60 }]}
							onPress={() => setShowModal(false)}
						>
							<Ionicons name="close-outline" size={40} />
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<TouchableOpacity
				style={[styles.actionBtns, {
					width: 80, height: 80, borderRadius: 40,
					top: -50, backgroundColor: Colors[colorScheme].tint,
					borderColor: Colors[colorScheme].background, borderWidth: 10, elevation: 1
				}]}
				onPress={() => (
					setShowModal(true)
				)}
			>
				<Ionicons color={Colors[colorScheme].createButtonIcon} name="add" size={40} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	floatingBtnsContainer: {
		width: "80%", height: "30%", top: 23,
		flexDirection: "row", justifyContent: "space-around",
		backgroundColor: "transparent",
		// borderStyle: 'solid', borderWidth: 1, borderColor: '#000'
	},
	floatingBtnsChildContainer: {
		height: "auto", justifyContent: "space-around",
		backgroundColor: "transparent",
		// borderStyle: 'solid', borderWidth: 1, borderColor: '#000'
	},
	actionBtns: {
		// position: "relative",
		width: 50, height: 50,
		justifyContent: "center", alignItems: "center",
		borderRadius: 30, backgroundColor: "#ddd",
	},
	actionBtnName: {
		paddingHorizontal: 10,
		marginBottom: 10, 
		backgroundColor: Colors["dark"].background, 
		textAlign: "center", elevation: 15, borderRadius: 5
	}
})