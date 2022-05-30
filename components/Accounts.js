import React, { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text } from "./Themed";
import { StyleSheet } from "react-native";


export default function Accounts({ }) {
  const [bankColors] = useState(["#fc3903","#fcba03","#fcf403","#88fc03","#0bfc03","#03fc77"]); 
  
  return (
    <SafeAreaView style={{height: "auto", width: "100%"}}>
      <ScrollView horizontal={true} style={{ paddingVertical: 15, backgroundColor: "#ddd" }}>
        <View style={accStyle.controlSpace}>
          <TouchableOpacity
            style={[accStyle.bankAccount, {backgroundColor: bankColors[0]}]}
          >
            <Text style={{ fontSize: 20, }}>Bank 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[accStyle.bankAccount, {backgroundColor: bankColors[1]}]}
          >
            <Text style={{ fontSize: 20, }}>Bank 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[accStyle.bankAccount, {backgroundColor: bankColors[2]}]}
          >
            <Text style={{ fontSize: 20, }}>Bank 3</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const accStyle = StyleSheet.create({
  bankAccount: {
    backgroundColor: "#ddd", 
    width: 200, height: 100,
    padding: 10,
    alignItems: "baseline",
    justifyContent: "flex-end",
    borderStyle: "solid", 
    borderWidth: 2,
    borderRadius: 20
  },
  controlSpace: {
    flexDirection: "row", 
    width: 680, paddingHorizontal: 10,
    flexWrap: "wrap", 
    justifyContent: "space-around", 
    backgroundColor: "#ddd"
  }
})