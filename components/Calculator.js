import { Ionicons } from "@expo/vector-icons";
import React, {useState} from "react";
import { StyleSheet } from "react-native";
import { Input, Text, Pressable, View } from "./Themed";
import calculator, { initialState, handleNumber, handleEqual } from "../hooks/calculator"

export default function Calculator({ myVal, currentValue, onPress }) {
	const [calcVal, setCalcVal] = useState({
		...initialState,
		currentValue: currentValue
	});
	
	const handleTap = (type, value) => {
		setCalcVal(calcVal => calculator(type, value, calcVal));
  };

	return (
		<View style={{ width: "100%", height: 350 }}>
			<View style={{ height: "15%" }}>
				<Text style={styles.value}>
					{calcVal.currentValue.toLocaleString()}
				</Text>
				{/* <Input 
					noLabel={true}
					style={{ textAlign: 'right', color: "#000" }} value={parseFloat(calcVal).toLocaleString()} 
					containerStyle={{ width: "100%" }} 
					keyboardType="number-pad" 
					editable={false} 
				/> */}
			</View>
			<View style={{height: "80%", flexDirection: "column" }}>
				<View style={{ height: "22%", flexDirection: "row" }}>
					{onPress && 
						<Pressable
							style={[styles.number, {backgroundColor: "red"}]}
							onPress={onPress}
						>
							<Ionicons name="close-outline" size={20} />
						</Pressable>
					}
					
					<Pressable
						style={styles.number}
						onPress={() => handleTap("clear")}
					>
						<Text>C</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("back")}
					>
						<Ionicons name="chevron-back-outline" size={20} />
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("operator", "/")}
					>
						<Text>/</Text>
					</Pressable>
				</View>
				
				<View style={{ height: "22%", flexDirection: "row" }}>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("number", 7)}
					>
						<Text>7</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("number", 8)}
					>
						<Text>8</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("number", 9)}
					>
						<Text>9</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("operator", "*")}
					>
						<Text>*</Text>
					</Pressable>
				</View>
				
				<View style={{ height: "22%", flexDirection: "row" }}>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("number", 4)}
					>
						<Text>4</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("number", 5)}
					>
						<Text>5</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("number", 6)}
					>
						<Text>6</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("operator", "-")}
					>
						<Text>-</Text>
					</Pressable>
				</View>
				
				<View style={{ height: "22%", flexDirection: "row" }}>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("number", 1)}
					>
						<Text>1</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("number", 2)}
					>
						<Text>2</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("number", 3)}
					>
						<Text>3</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap('operator', "+")}
					>
						<Text>+</Text>
					</Pressable>
				</View>
				
				<View style={{ height: "22%", flexDirection: "row" }}>
					<Pressable
						style={styles.number}
						onPress={() => handleTap("dot")}
					>
						<Text>.</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap('number', 0)}
					>
						<Text>0</Text>
					</Pressable>
					<Pressable
						style={styles.number}
						onPress={() => handleTap('equal')}
					>
						<Text>=</Text>
					</Pressable>
					<Pressable
						style={[styles.number, {backgroundColor: "lightgreen"}]}
						onPress={() => {myVal(calcVal.currentValue.toLocaleString()); onPress()}}
					>
						<Ionicons name="checkmark-outline" size={20} />
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	number: {
		width: "22%", height: "80%",
		marginHorizontal: 5, 
		backgroundColor: "#2f95dc",
		alignItems: "center", justifyContent: "center",
	},
	value: {
		textAlign: 'right', fontSize: 20, 
		width: "100%", height: "90%", 
		borderStyle: 'solid', borderWidth: 1, borderRadius: 10, 
		paddingHorizontal: 5, paddingVertical: 10
	}
})