import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text } from "../Themed";

import { StyleSheet } from "react-native";
import Colors from '../../constants/Colors';
import { useColorScheme } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const AccsItem = ({ account, colorScheme }) => {
  const bgColor = {
    backgroundColor: account.bankColor ? account.bankColor:Colors[colorScheme].gradient.from
  }
  const color = {
    color: account.bankTxtColor ? account.bankTxtColor:Colors[colorScheme].accounts.color
  }

  return (
    <LinearGradient
      colors={[bgColor.backgroundColor, '#fff']}
      style={accStyle.bankAccount}
      start={{x: -1, y: 0}}
      end={{x: 1, y: 0}}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={[accStyle.bankAccountBtn, {backgroundColor: "transparent"}]}
      >
        <View style={{ position: "absolute", bottom: 8, left: 10, backgroundColor: "transparent", margin: 8, }}>
          <Text style={[color, { fontSize: 25, fontWeight: "600" }]}>{account.name}</Text>
          <Text style={[color, { fontWeight: "700" }]}>Php {account.currentBalance}</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default function Accounts(props) {
  const { accounts } = props;
  const colorScheme = useColorScheme();

  return (
    <View style={{ height: "auto", width: "100%", }}>
      <View style={[ accStyle.collapsibleHeader, { elevation: 3 } ]}>
        <Text style={{ fontWeight: "500", fontSize: 18 }}>Accounts</Text>
      </View>
      <SafeAreaView>
        <ScrollView horizontal={true}>
          {accounts !== undefined &&
            <View style={[accStyle.accountsContainer]}>
              {accounts.map((data, index) => <AccsItem key={index} account={data} colorScheme={colorScheme} />)}
            </View>
          }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const accStyle = StyleSheet.create({
  bankAccount: {
    // backgroundColor: "#ddd", 
    width: 200, height: 100,
    marginBottom: 20, marginHorizontal: 10, 
    // alignItems: "baseline",
    // justifyContent: "flex-end",
    // borderStyle: "solid", 
    // borderWidth: 0.5,
    borderRadius: 20,
    // elevation: 10,
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
    maxHeight: 265, minWidth: 220, width: "auto",
    flexDirection: "column", 
    flexDirection: "column",
    flexWrap: "wrap", 
  }
})