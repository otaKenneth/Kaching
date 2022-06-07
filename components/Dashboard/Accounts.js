import React, { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Container, Touchable, Text, Pressable, List, Modal } from "../Themed";
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet } from "react-native";
import Colors from '../../constants/Colors';
import AccountList from '../../hooks/bankList';
import { useColorScheme } from "react-native";
import appStyles from '../../assets/styles/appStyles'

const DATA = AccountList();

const AccsItem = ({ account, colorScheme }) => {
  const bgColor = {
    backgroundColor: account.bankColor ? account.bankColor:Colors[colorScheme].accounts
  }

  const [showModal, setShowModal] = useState(false);

  const handleEventsPosition = (ev) => {
    setShowButtonsIn({
      ...showButtonsIn,
      top: ev.nativeEvent.pageY-ev.nativeEvent.locationY+20,
      left: ev.nativeEvent.pageX-ev.nativeEvent.locationX-45,
    })
  }

  const [showButtonsIn, setShowButtonsIn] = useState({
    position: "absolute",
    top: 0, left: 0
  })

  return (
    <View style={accStyle.bankAccount}>
      <Modal 
        animationType="fade"
				visible={showModal}
				transparent={true}
				swipeDirection="down"
        onRequestClose={() => setShowModal(false)}
      >
        <Touchable
          onPress={() => setShowModal(false)}
        >
          <Container 
            style={[
              appStyles.modalContainer, 
              {
                justifyContent: "center", 
                backgroundColor: "rgba(52, 52, 52, 0.3)"
              }
            ]}
          >
            <Container 
              style={[
                appStyles.modalView, 
                showButtonsIn, 
                {
                  backgroundColor: "transparent", 
                  elevation: 0
                }
              ]}
            >
              <Container
                style={{ width: 180, flexDirection: "row", justifyContent: "space-around" }}
              >
                <Pressable
                  style={{
                    width: 50, height: 50,
                    justifyContent: "center", alignItems: "center",
                    borderRadius: 30, backgroundColor: "#ffeb0a",
                    elevation: 10
                  }}
                  onPress={() => setShowModal(false)}
                >
                  {account.favorite &&
                    <Ionicons name="star" size={20} color="#000" />
                  }
                  {!account.favorite &&
                    <Ionicons name="star-outline" size={20} color="#000" />
                  }
                </Pressable>
                <Pressable
                  style={{
                    width: 50, height: 50, 
                    justifyContent: "center", alignItems: "center",
                    borderRadius: 30, backgroundColor: "#ff9400",
                    elevation: 10
                  }}
                  onPress={() => setShowModal(false)}
                >
                  <Ionicons name="pencil" size={20} color="#fff" />
                </Pressable>
                <Pressable
                  style={{
                    width: 50, height: 50, 
                    justifyContent: "center", alignItems: "center",
                    borderRadius: 30, backgroundColor: "#f70000",
                    elevation: 10
                  }}
                  onPress={() => setShowModal(false)}
                >
                  <Ionicons name="trash-outline" size={20} color="#fff" />
                </Pressable>
              </Container>
            </Container>
          </Container>
        </Touchable>
      </Modal>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[accStyle.bankAccountBtn, bgColor]}
        onPress={(ev) => {
          setShowModal(true)
          handleEventsPosition(ev);
        }}
      >
      </TouchableOpacity>
      <View style={{ position: "absolute", bottom: 15, left: 10, backgroundColor: "transparent", margin: 8, }}>
        <Text style={[accStyle.bankAccountBtnTxt, { color: "#fff", fontSize: 25, fontWeight: "400" }]}>{account.name}</Text>
        <Text style={[accStyle.bankAccountBtnTxt, { color: "#fff", fontWeight: "700" }]}>Php {account.balance}</Text>
      </View>
    </View>
  );
};

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
        <Text style={{ fontWeight: "500", fontSize: 18, color: Colors[colorScheme].headerTextColor }}>Accounts</Text>
        <Pressable
          style={{ backgroundColor: "transparent" }}
          onPress={() => setCollapse(isCollapse ? false:true)}
        >
          {isCollapse && 
            <Ionicons size={25} name="chevron-down-outline" color="#fff" />
          }
          {!isCollapse && 
            <Ionicons size={25} name="chevron-up-outline" color="#fff" />
          }
        </Pressable>
      </View>
      <Collapsible collapsed={isCollapse} duration={1000}>
        <SafeAreaView>
          <ScrollView horizontal={true} >
            <View style={[accStyle.accountsContainer, {backgroundColor: Colors[colorScheme].cardBackground }]}>
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