import React, { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Pressable, List } from "./Themed";
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet } from "react-native";
import Colors from '../constants/Colors';
import AccountList from '../hooks/bankList';
import { useColorScheme } from "react-native";

const DATA = AccountList();

const AccsItem = ({ account, colorScheme }) => (
  <TouchableOpacity
    style={[accStyle.bankAccount, {backgroundColor: account.bankColor ? account.bankColor:"#ededeb"}]}
  >
    <View style={{backgroundColor: "transparent", margin: 8,}}>
      <Text style={{ fontSize: 25, fontWeight: "400", color: Colors[colorScheme].text }}>{account.name}</Text>
      <Text style={{ fontWeight: "700", color: Colors[colorScheme].text }}>Php {account.balance}</Text>
    </View>
  </TouchableOpacity>
);

export default function Accounts({ }) {
  const colorScheme = useColorScheme();
  const [isCollapse, setCollapse] = useState(false);

  return (
    <View style={{ height: "auto", width: "100%", }}>
      <View style={[
          accStyle.collapsibleHeader,
          {
            backgroundColor: Colors[colorScheme].headerBackgroundColor
          }
        ]}
        >
        <Text style={{ fontWeight: "500", fontSize: 18, color: "white" }}>Accounts</Text>
        <Pressable
          style={{ backgroundColor: Colors[colorScheme].headerBackgroundColor }}
          onPress={() => setCollapse(isCollapse ? false:true)}
        >
          <Ionicons size={25} name="chevron-down-outline" color="#fff" />
        </Pressable>
      </View>
      <Collapsible collapsed={isCollapse} duration={1000}>
        <SafeAreaView>
          <ScrollView horizontal={true} 
            style={{ backgroundColor: "#edf0ee" }}
          >
            <View style={accStyle.accountsContainer}>
              {DATA.map((data) => <AccsItem account={data} colorScheme={colorScheme} />)}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Collapsible>
    </View>
  );
}

const accStyle = StyleSheet.create({
  bankAccount: {
    backgroundColor: "#ddd", 
    width: 200, height: 100,
    padding: 10, marginHorizontal: 15, marginBottom: 20,
    alignItems: "baseline",
    justifyContent: "flex-end",
    // borderStyle: "solid", 
    // borderWidth: 0.5,
    borderRadius: 20,
    elevation: 15,
  },
  controlSpace: {
    flexDirection: "row", 
    width: 680, paddingHorizontal: 0,
    flexWrap: "wrap", 
    justifyContent: "space-around", 
    backgroundColor: "#edf0ee"
  },
  collapsibleHeader: {
    flexDirection: "row", width: "100%", 
    justifyContent: "space-between", 
    paddingHorizontal: 10, paddingVertical: 10,
    borderTopLeftRadius: 10, borderTopRightRadius: 10,
  },
  accountsContainer: { 
    paddingTop: 15,
    maxHeight: 265, width: "100%", 
    flexDirection: "column", 
    backgroundColor: "#edf0ee",
    flexDirection: "column",
    flexWrap: "wrap", 
  }
})