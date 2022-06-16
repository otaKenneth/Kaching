import React, { useState } from "react";
import { Container, View, SafeAreaView, ChangableInput, FlatList, PrimaryButton, KeyboardAvoidingView, SubmitButton, TouchableOpacity } from "../../components/Themed";
import { PieChart } from 'react-native-svg-charts';
import { Labels } from "../../components/Charts/chartAdds";

import { StyleSheet, useColorScheme } from "react-native";
import newCategoryVals from '../../hooks/categories';
import { Entypo, Feather } from '@expo/vector-icons';
import Collapsible from "react-native-collapsible";

export default function CategoryList({ route, navigation }) {
  const colorScheme = useColorScheme();
  const [btnName, setBtnName] = useState("pie-chart");

  const { id, categories, headerName, totalBudget } = route.params;
  navigation.setOptions({ 
    headerTitle: headerName,
    headerRight: () => (
      <TouchableOpacity
        activeOpacity={0.4}
        style={{ marginRight: 20, backgroundColor: "rgba(252, 109, 109, 0.4)", padding: 8, borderRadius: 10 }}
        onPress={() => {setShowChart(!showChart); setBtnName(btnName == "list" ? "pie-chart":"list");}}
      >
        <Feather name={btnName} size={20} color="red" />
      </TouchableOpacity>
    )
  });

  const [categs, setCategs] = useState(categories);
  const [showChart, setShowChart] = useState(false);

  const inputStyle = id == 0;

  function handleNewValue(data, type, value) {
    setCategs(categs => newCategoryVals(data, type, value, categs, totalBudget));
  }

  const CategoryInput = ({ item }) => {
    const options = [
      item.budgetPlanned.percentage, item.budgetPlanned.amount
    ];
    const [type, setType] = useState(0);
    const editable = item.category == "Allowance" ? false : inputStyle;
    const bgColor = editable ? "#fff" : "#c4c4c4";

    return (
      <ChangableInput
        containerStyle={{ width: "48%", marginHorizontal: 3 }}
        label={item.name}
        keyboardType="numeric"
        type={setType}
        values={options}
        style={{ backgroundColor: bgColor }}
        editable={editable}
        changableIconButtons={['percent-outline', 'pound']}
        onEndEditing={(el) => {
          handleNewValue(item, type, el.nativeEvent.text)
        }}
      />
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 0.1, width: "100%", padding: 10 }}>
        <Container>
          <PrimaryButton text="Create New Category" />
        </Container>
      </View>
      {showChart &&
        <View style={{ flex: 1, padding: 10 }}>
          <PieChart
            style={{ flex: 0.6 }}
            data={getPieChartData(categs)}
            innerRadius={40}
            outerRadius={90}
            labelRadius={140}
          >
            <Labels />
          </PieChart>
        </View>
      }
      {!showChart &&
        <View style={{ flex: 1, width: "100%", padding: 10 }}>
          <Container style={{ justifyContent: "center" }}>
            <FlatList
              style={{ width: "100%", flexDirection: "column" }}
              data={categs}
              numColumns={2}
              renderItem={({ item }) => <CategoryInput item={item} />}
            />
          </Container>
          <Container style={{ marginVertical: 20 }}>
            <SubmitButton />
          </Container>
        </View>
      }
    </KeyboardAvoidingView>
  );
}

const getPieChartData = (data) => {
  const newD = data.filter(item => {
    const p = parseFloat(item.budgetPlanned.percentage);
    return p > 0
  });
  return newD.map((item, index) => {
    return {
      key: index,
      value: item.budgetPlanned.percentage,
      name: item.name,
      svg: { fill: colors[index] },
      arc: { cornerRadius: 5 },
    }
  })
}

const colors = ['#003f5c', '#ffa600', '#2f4b7c', '#ff7c21', '#790093', '#f30054', '#ff4d3c', '#d9006c', '#b10082', '#03169c', "#665191", "#a05195", '#d45087', '#f95d6a', '#ff7c43'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});