import React, { useState, Component } from "react";
import { Container, Text, View, Pressable, SafeAreaView, ScrollView } from "../../components/Themed";
import { StyleSheet, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import appStyles from "../../assets/styles/appStyles";

export default function CategoryList({ route, navigation }) {
  const colorScheme = useColorScheme();
  
  const { categories, headerName } = route.params;
  navigation.setOptions({ headerTitle: headerName });

  return (
    <View style={{ height: "auto", width: "100%", padding: 10, backgroundColor: "transparent" }}>
      <SafeAreaView style={{ backgroundColor: "transparent" }}>
        <ScrollView style={{ backgroundColor: "transparent" }}>
          <Container>
          </Container>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});