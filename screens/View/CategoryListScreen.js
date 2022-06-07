import React, { useState } from "react";
import { Container, View, SafeAreaView, ChangableInput, FlatList } from "../../components/Themed";
import { PieChart } from 'react-native-svg-charts';
import { Labels } from "../../components/Charts/chartAdds";

import { StyleSheet, useColorScheme } from "react-native";
import newCategoryVals from '../../hooks/categories';

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

    return (
      <ChangableInput
        containerStyle={{ width: "48%", marginHorizontal: 3 }}
        label={item.category}
        keyboardType="numeric"
        type={setType}
        style={{ backgroundColor: "#c4c4c4"}}
        values={options}
        editable={inputStyle}
        changableIconButtons={['percent-outline', 'pound']}
        disableFullscreenUI={false}
        onEndEditing={(el) => {
          handleNewValue(item, type, el.nativeEvent.text)
        }}
      />
    )
  }

  return (
    <View style={{ height: "auto", width: "100%", padding: 10, backgroundColor: "transparent" }}>
      <SafeAreaView style={{ height: "auto", width: "100%", backgroundColor: "transparent" }}>
        <PieChart
          style={{ height: 300 }}
          data={getPieChartData(categs)}
          innerRadius={33}
          outerRadius={70}
          labelRadius={120}
        >
          <Labels />
        </PieChart>
        <Container style={{ justifyContent: "center" }}>
          <FlatList
            style={{ width: "100%", height: 300, flexDirection: "column" }}
            data={categs}
            numColumns={2}
            renderItem={({ item }) => <CategoryInput item={item} />}
          />
        </Container>
      </SafeAreaView>
    </View>
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

const colors = ['#547602','#2b72d1', '#13a0a8', '#ee96a8', '#7b738f', '#df3426', '#739246', '#6890ef', '#cd4343', '#12d207', '#ac7c5d', '#4c84e1', '#b316da', ];

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