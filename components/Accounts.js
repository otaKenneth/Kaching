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
  <View style={accStyle.bankAccount}
  >
    <TouchableOpacity
      style={[accStyle.bankAccountBtn, { backgroundColor: account.bankColor ? account.bankColor:"#77c3f7"}]}
    >
    </TouchableOpacity>
    <View style={{ position: "absolute", bottom: 15, left: 10, backgroundColor: "transparent", margin: 8, }}>
      <Text style={[accStyle.bankAccountBtnTxt, { fontSize: 25, fontWeight: "400" }]}>{account.name}</Text>
      <Text style={[accStyle.bankAccountBtnTxt, { fontWeight: "700" }]}>Php {account.balance}</Text>
    </View>
  </View>
);

export default function Accounts({ }) {
  const colorScheme = useColorScheme();
  const [isCollapse, setCollapse] = useState(false);

  return (
    <View style={{ height: "auto", width: "100%", }}>
      <View style={[
          accStyle.collapsibleHeader,
          {
            backgroundColor: Colors[colorScheme].tint
          }
        ]}
        >
        <Text style={{ fontWeight: "500", fontSize: 18, color: "white" }}>Accounts</Text>
        <Pressable
          style={{ backgroundColor: "transparent" }}
          onPress={() => setCollapse(isCollapse ? false:true)}
        >
          <Ionicons size={25} name="chevron-down-outline" color="#fff" />
        </Pressable>
      </View>
      <Collapsible collapsed={isCollapse} duration={1000}>
        <SafeAreaView>
          <ScrollView horizontal={true} 
            style={{ backgroundColor: "#f7f8fa" }}
          >
            <View style={accStyle.accountsContainer}>
              {DATA.map((data, index) => <AccsItem key={index} account={data} colorScheme={colorScheme} />)}
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
    marginBottom: 20, marginHorizontal: 10, 
    // alignItems: "baseline",
    // justifyContent: "flex-end",
    // borderStyle: "solid", 
    // borderWidth: 0.5,
    borderRadius: 20,
    elevation: 20,
    overflow: "hidden"
  },
  bankAccountBtn: {
    position: "absolute", top: 0, width: "100%", height: "100%",
  },
  bankAccountBtnTxt: {
    color: "#000",
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
    flexDirection: "column",
    flexWrap: "wrap", 
  }
})