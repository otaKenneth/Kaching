import React, { useState, Component } from "react";
import { Container, Text, View, Pressable, SafeAreaView, ScrollView, Input } from "../../components/Themed";
import { StyleSheet, useColorScheme } from "react-native";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import appStyles from "../../assets/styles/appStyles";

export default function CategoryList({ route, navigation }) {
  const colorScheme = useColorScheme();
  
  const { id, categories, headerName } = route.params;
  navigation.setOptions({ headerTitle: headerName });

  const inputStyle = id == 0;

  const [state, setState] = useState(false);

  return (
    <View style={{ height: "auto", width: "100%", padding: 10, backgroundColor: "transparent" }}>
      <SafeAreaView style={{ backgroundColor: "transparent" }}>
        <ScrollView style={{ backgroundColor: "transparent" }}>
          <PieChartScreen data={categories} />
          <Container style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", width: "100%" }}>
            {categories.map((item, index) => {
              return (
                <Input 
                  key={index} 
                  containerStyle={{ width: "48%" }} 
                  label={item.category} 
                  keyboardType="numeric" 
                  value={item.budgetPlanned.number}
                  editable={inputStyle}
                  IconButton={() => (
                    <Pressable 
                      style={{ position: "absolute", bottom: 12, right: 10, backgroundColor: "transparent" }}
                      onPress={() => {
                        setState(state ? false:true);
                      }}
                    >
                      {state && 
                        <FontAwesome name="percent"/>
                      }
                      {!state &&
                        <MaterialCommunityIcons name="pound"/>
                      }
                    </Pressable>
                  )}
                />
              )
            })}
          </Container>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

import { PieChart } from 'react-native-svg-charts';
import { Labels } from "../../components/Charts/chartAdds";

const getPieChartData = (data) => {
  return data.map((item, index) => {
    return {
      key: index,
      value: item.budgetPlanned.percentage,
      name: item.category,
      svg: { fill: colors[index] },
      arc: { cornerRadius: 5 },
    }
  })
}

const colors = ['#2b72d1','#df3426','#739246','#6890ef','#cd4343','#12d207','#ac7c5d','#ee96a8','#4c84e1','#13a0a8','#b316da','#547602','#7b738f'];

function PieChartScreen({data}) {
  const pieChartData = getPieChartData(data);

  return (
    <PieChart
      style={{ height: 300 }}
      data={pieChartData}
      innerRadius={35}
      outerRadius={70}
      labelRadius={120}
    >
      <Labels  />
    </PieChart>
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