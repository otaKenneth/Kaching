import React, { useState } from "react";
import { Container, View, SafeAreaView, ChangableInput, FlatList, PrimaryButton, KeyboardAvoidingView } from "../../components/Themed";
import { PieChart } from 'react-native-svg-charts';
import { Labels } from "../../components/Charts/chartAdds";

import { StyleSheet, useColorScheme } from "react-native";
import newCategoryVals from '../../hooks/categories';
import Collapsible from "react-native-collapsible";

export default function CategoryList({ route, navigation }) {
  const colorScheme = useColorScheme();

  const { id, categories, headerName, totalBudget } = route.params;
  navigation.setOptions({ headerTitle: headerName });

  const [categs, setCategs] = useState(categories);

  const inputStyle = id == 0;

  function handleNewValue(data, type, value) {
    setCategs(categs => newCategoryVals(data, type, value, categs, totalBudget));
  }

  const CategoryInput = ({ item }) => {
    const options = Object.values(item.budgetPlanned);
    const [type, setType] = useState(0);
    const editable = item.category == "Allowance" ? false:inputStyle;
    const bgColor = editable ? "#fff":"#c4c4c4";

    return (
      <ChangableInput
        containerStyle={{ width: "48%", marginHorizontal: 3 }}
        label={item.category}
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
      <View style={{ flex: 1, width: "100%", padding: 10 }}>
        <PieChart
          style={{ flex: 1 }}
          data={getPieChartData(categs)}
          innerRadius={30}
          outerRadius={70}
          labelRadius={100}
        >
          <Labels />
        </PieChart>
        <Container style={{ marginVertical: 20 }}>
          <PrimaryButton text="Create New Category" />
        </Container>
        <Container style={{ justifyContent: "center" }}>
          <FlatList
            style={{ width: "100%", height: 300, flexDirection: "column" }}
            data={categs}
            numColumns={2}
            renderItem={({ item }) => <CategoryInput item={item} />}
          />
        </Container>
      </View>
    </KeyboardAvoidingView>
  );
}

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

const colors = ['#003f5c','#ffa600','#2f4b7c','#ff7c21','#790093','#f30054','#ff4d3c','#d9006c','#b10082','#03169c',"#665191","#a05195",'#d45087','#f95d6a','#ff7c43'];

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