import React, { useState, useEffect, Component } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Container, Touchable, Text, Pressable, Modal, RefreshCtrl } from "../Themed";
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet } from "react-native";
import Colors from '../../constants/Colors';
import { useColorScheme } from "react-native";
import appStyles from '../../assets/styles/appStyles'
import { useAuthentication } from '../../hooks/useAuthentication';
import { updateUserAccount } from '../../hooks/firebase';

const AccsItem = ({ account, action, colorScheme }) => {
  const bgColor = {
    backgroundColor: account.bankColor ? account.bankColor:Colors[colorScheme].accounts.bg
  }
  const color = {
    color: account.bankTxtColor ? account.bankTxtColor:Colors[colorScheme].accounts.color
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
                  onPress={() => {
                    setShowModal(false)
                    action({
                      action: 'delete',
                      prop: account
                    })
                  }}
                >
                  <Ionicons name="trash-outline" size={20} color="#fff" />
                </Pressable>
              </Container>
            </Container>
          </Container>
        </Touchable>
      </Modal>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[accStyle.bankAccountBtn, bgColor]}
        onPress={(ev) => {
          setShowModal(true)
          handleEventsPosition(ev);
        }}
      >
        <View style={{ position: "absolute", bottom: 8, left: 10, backgroundColor: "transparent", margin: 8, }}>
          <Text style={[color, { fontSize: 25, fontWeight: "600" }]}>{account.name}</Text>
          <Text style={[color, { fontWeight: "700" }]}>Php {account.currentBalance}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const wait = (tm) => {
  return new Promise(resolve => setTimeout(resolve, tm))
}

export default function Accounts(props) {
  const { accounts, re_fresh } = props;
  const user = useAuthentication();
  const [refresh, refreshing] = useState(re_fresh)
  const [isCollapse, setCollapse] = useState(false);
  const [action, setAction] = useState({
    action: null,
    prop: null
  })
  const colorScheme = useColorScheme();
  
  React.useEffect(() => {
    if (refresh) {
      onRefresh()
    }
  }, [refresh])

  React.useEffect(() => {
    switch (action.action) {
      case 'edit':
        
        break;
      case 'delete':
        const newAccounts = accounts.filter(data => data.id !== action.prop.id)
        updateUserAccount(user, newAccounts).then((res) => {
          accounts.splice(0, accounts.length);
          newAccounts.map(data => accounts.push(data))
          setAction({
            action: null, prop: null
          })
          refreshing(true);
        });
        break;
      default:
        break;
    }
  }, [action])

  const onRefresh = React.useCallback(() => {
    refreshing(true),
    wait(200).then(() => refreshing(false));
  }, [])

  return (
    <View style={{ height: "auto", width: "100%", }}>
      <View style={[ accStyle.collapsibleHeader, { elevation: 3 } ]}>
        <Text style={{ fontWeight: "500", fontSize: 18 }}>Accounts</Text>
      </View>
      <SafeAreaView>
        <ScrollView horizontal={true}
          refreshControl={
            <RefreshCtrl
              refreshing={refresh}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={[accStyle.accountsContainer, {backgroundColor: Colors[colorScheme].cardBackground }]}>
            {accounts.map((data, index) => <AccsItem key={index} account={data} action={setAction} colorScheme={colorScheme} />)}
          </View>
        </ScrollView>
      </SafeAreaView>
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
    elevation: 8,
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