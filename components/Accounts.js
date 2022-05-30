import React, { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Pressable, List } from "./Themed";
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet } from "react-native";
import bankColors from '../constants/bankColors';
import AccountList from '../hooks/bankList';

const DATA = AccountList();

const getAccount = (data, index) => ({
  id: data[index].id,
  accountName: data[index].name,
  accountBalance: data[index].balance
})

const getAccountCount = (data) => data.length;

const AccsItem = ({ id, accName, accBal }) => (
  <TouchableOpacity
    style={[accStyle.bankAccount, {backgroundColor: bankColors[id]['bg']}]}
  >
    <Text style={{ fontSize: 20, color: bankColors[id].textColor }}>{accName}</Text>
    <Text style={{ color: bankColors[id].textColor }}>Php {accBal}</Text>
  </TouchableOpacity>
);

export default function Accounts({ }) {
  const [isCollapse, setCollapse] = useState(false);
  var myLoop = [];

  DATA.forEach(accounts => {
    myLoop.push(
      <View style={{ height: "auto" }}>
        <List
          style={{ paddingBottom: 10, backgroundColor:"#edf0ee" }}
          data={accounts}
          renderItem={({ item, index }) => <AccsItem key={index} id={item.id} accName={item.accountName} accBal={item.accountBalance} />}
          getItemCount={getAccountCount}
          getItem={getAccount}
        />
      </View>
    );
  });
  return (
    <View style={{ height: "auto", width: "100%" }}>
      <View style={accStyle.collapsibleHeader}>
        <Text style={{ fontWeight: "500", fontSize: 18, color: "white" }}>Accounts</Text>
        <Pressable
          style={{ backgroundColor: "#fc6a53" }}
          onPress={() => setCollapse(isCollapse ? false:true)}
        >
          <Ionicons size={25} name="chevron-down-outline" color="#fff" />
        </Pressable>
      </View>
      <Collapsible collapsed={isCollapse} duration={1000}>
        <SafeAreaView>
          <ScrollView horizontal={true} 
            style={{ paddingTop: 15, backgroundColor: "#edf0ee" }}
          >
            <SafeAreaView style={accStyle.accountsContainer}>
              {myLoop}
            </SafeAreaView>
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
    padding: 10, marginHorizontal: 5, marginBottom: 10,
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
    backgroundColor: "#edf0ee"
  },
  collapsibleHeader: {
    flexDirection: "row", width: "100%", 
    justifyContent: "space-between", 
    backgroundColor: "#fc6a53",
    paddingHorizontal: 10, paddingVertical: 10,
    borderTopLeftRadius: 10, borderTopRightRadius: 10,
  },
  accountsContainer: {
    paddingHorizontal: 15, 
    height: "auto", width: "100%", 
    flexDirection: "row", 
    backgroundColor: "#edf0ee"
  }
})