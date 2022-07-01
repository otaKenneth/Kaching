import React, { useState } from "react";
import { Container, View, TouchableOpacity, SafeAreaView, ChangableInput, FlatList } from "../../components/Themed";
import { Feather } from '@expo/vector-icons';
import { PieChart } from 'react-native-svg-charts';
import { Labels } from "../../components/Charts/chartAdds";

import { StyleSheet } from "react-native";
import { sortCategoriesByAmount } from '../../hooks/categories';

export default function CategoryList({ route, navigation }) {
  const [btnName, setBtnName] = useState("pie-chart");
  
  const { categories, headerName } = route.params;
  navigation.setOptions({ 
    headerTitle: `${headerName} Categories`,
    headerRight: () => (
      <TouchableOpacity
        activeOpacity={0.4}
        style={{ marginRight: 20, backgroundColor: "rgba(252, 109, 109, 0.4)", padding: 8, borderRadius: 10 }}
        onPress={() => {setShowChart(!showChart); setBtnName(btnName == "list" ? "pie-chart":"list");}}
      >
        <Feather name={btnName} size={20} color="red" />
      </TouchableOpacity>
    ),
  });
  
  const [categs, setCategs] = useState(sortCategoriesByAmount(categories));
  const [showChart, setShowChart] = useState(false);

  const CategoryInput = ({ item }) => {
    const options = Object.values(item.budgetPlanned);
    const [type, setType] = useState(0);

    return (
      <ChangableInput
        containerStyle={{ width: "48%", marginHorizontal: 3 }}
        label={item.name}
        keyboardType="numeric"
        type={setType}
        style={{ backgroundColor: "#c4c4c4"}}
        values={options}
        editable={false}
        changableIconButtons={['percent-outline', 'pound']}
        disableFullscreenUI={false}
      />
    )
  }

  return (
    <View style={{ height: "auto", width: "100%", padding: 10, backgroundColor: "transparent" }}>
      <SafeAreaView style={{ height: "auto", width: "100%", backgroundColor: "transparent" }}>
        {showChart &&
          <PieChart
            style={{ height: 300 }}
            data={getPieChartData(categs)}
            innerRadius={33}
            outerRadius={70}
            labelRadius={120}
          >
            <Labels />
          </PieChart>
        }
        {!showChart &&
          <Container style={{ justifyContent: "center" }}>
            <FlatList
              style={{ width: "100%", height: "auto", flexDirection: "column" }}
              data={categs}
              numColumns={2}
              renderItem={({ item }) => <CategoryInput item={item} />}
            />
          </Container>
        }
      </SafeAreaView>
    </View>
  );
}

const getPieChartData = (data) => {
  const others = {
    name: "Others",
    budgetPlanned: {
      percentage: 0,
      amount: 0
    }
  }
  var newD = data.filter(item => {
    const p = parseFloat(item.budgetPlanned.percentage);
    if (p <= 5) {
      others.budgetPlanned.percentage += p;
    } else {
      return p > 0
    }
  });
  if (others.budgetPlanned.percentage > 0) newD = [...newD, others];
  return newD.map((item, index) => {
    return {
      key: index,
      value: parseFloat(item.budgetPlanned.percentage),
      name: item.name,
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