import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, Modal } from "./Themed";

import { StyleSheet } from "react-native";
import appStyles from "../assets/styles/appStyles";

export default function CreateButton({ navigation }) {
	const [showModal, setShowModal] = useState(false);
	return (
		<View>
			<Modal
				animationType="fade"
				visible={showModal}
				transparent={true}
				swipeDirection="down"
				style={{ justifyContent: "flex-end"}}
			>
				<View style={appStyles.modalContainer}>

					<View style={{ width: "90%", height: "30%", flexDirection: "row", justifyContent: "space-around", backgroundColor: "transparent"}}>
						<View style={{height: "auto", justifyContent: "space-around", backgroundColor: "transparent"}}>
							<View style={{ alignItems: "center", backgroundColor: "transparent"}}>
								<Text style={styles.actionBtnName}>Account</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => {
										setShowModal(false);
										navigation.navigate('CreateAccount')
									}}
								>
									<Ionicons name="wallet-outline" size={30} title="Account"/>
								</TouchableOpacity>
							</View>
							
							<View style={{ alignItems: "center", backgroundColor: "transparent"}}>
								<Text style={styles.actionBtnName}>Transfer</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => {
										setShowModal(false);
										navigation.navigate('NotFound')
									}}
								>
									<Ionicons name="swap-horizontal-outline" size={30} title="Account"/>
								</TouchableOpacity>
							</View>
						</View>
						
						<View style={{height: "auto", justifyContent: "space-around", backgroundColor: "transparent"}}>
							<View style={{ alignItems: "center", backgroundColor: "transparent", alignItems: "center"}}>
								<Text style={styles.actionBtnName}>Budget Record</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => setShowModal(false)}
								>
									<Ionicons name="reader-outline" size={30}/>
								</TouchableOpacity>
							</View>
						</View>
						
						<View style={{height: "auto", justifyContent: "space-around", backgroundColor: "transparent"}}>
							<View style={{ alignItems: "center", backgroundColor: "transparent"}}>
								<Text style={styles.actionBtnName}>Payee</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => setShowModal(false)}
								>
									<Ionicons name="person" size={30}/>
								</TouchableOpacity>
							</View>

							<View style={{ alignItems: "center", backgroundColor: "transparent"}}>
								<Text style={styles.actionBtnName}>Payer</Text>
								<TouchableOpacity
									style={styles.actionBtns}
									onPress={() => setShowModal(false)}
								>
									<Ionicons name="person-outline" size={30}/>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View style={{ top: -20, backgroundColor: "transparent"}}>
						<TouchableOpacity
							style={[styles.actionBtns, {width: 60, height: 60}]}
							onPress={() => setShowModal(false)}
						>
							<Ionicons name="close-outline" size={40}/>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			
			<TouchableOpacity
				style={[styles.actionBtns, {
					width: 60, height: 60,
					top: -30
				}]}
				onPress={() => (
					setShowModal(true)
				)}
			>
				<Text>
					<Ionicons name="add" size={40}/>
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	actionBtns: {
		position: "relative",
		width: 50, height: 50,
		justifyContent: "center", alignItems: "center",
		borderRadius: 30, backgroundColor: "#ddd",
	},
	actionBtnName: {
		paddingHorizontal: 10,
		marginBottom: 10, backgroundColor: "#ddd", textAlign: "center", elevation: 15, borderRadius: 5
	}
})