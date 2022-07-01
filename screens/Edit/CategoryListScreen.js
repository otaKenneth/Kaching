import React, { useState } from "react";
import { 
  Container, 
  View, 
  ChangableInput, 
  FlatList, 
  KeyboardAvoidingView, 
  TouchableOpacity,
  Text,
  Checkbox,
} from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { PieChart } from 'react-native-svg-charts';
import { Labels } from "../../components/Charts/chartAdds";

import { StyleSheet, useColorScheme } from "react-native";
import newCategoryVals, { sortCategoriesByAmount, sortCategoriesById } from '../../hooks/categories';
import { Feather } from '@expo/vector-icons';
import { initialSaving } from "../../constants/defaults";
import CreateCategoryModal from "../Create/Modal/CategoryModal";
import { 
  getUserBudgetCategories, 
  updateDefaultCategories, 
  updateUserBudgetCategory, 
  updateUserBudgetInfo 
} from "../../hooks/firebase";
import { useAuthentication } from "../../hooks/useAuthentication";
import Loading, { SuccessToast } from "../../components/Loading";
import Colors from "../../constants/Colors";

export default function CategoryList({ route, navigation }) {
  const colorScheme = useColorScheme();
  const user = useAuthentication();
  const [btnName, setBtnName] = useState("pie-chart");
  const [showModal, setShowModal] = useState(false);
  const [save, saving] = useState(initialSaving)

  const { id, isCategsDefault, categories, headerName, totalBudget } = route.params;
  const [toggle, setToggle] = useState(isCategsDefault);
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

  if (route.params?.from != undefined) {
    navigation.setOptions({ 
      headerLeft: null,
    });
    refetch();
  }
  
  const [categs, setCategs] = useState(sortCategoriesByAmount(categories));
  const [showChart, setShowChart] = useState(false);

  function handleNewValue(data, type, value) {
    setCategs(categs => newCategoryVals(data, type, value, categs, totalBudget));
  }

  const CategoryInput = ({ item }) => {
    const options = [
      item.budgetPlanned.percentage, item.budgetPlanned.amount
    ];
    const [type, setType] = useState(0);
    const editable = item.name == "Balance" ? false : true;
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

  function loading (val, msg = "") {
    saving({
      ...save,
      isLoading: val,
      loadingMsg: msg
    })
  }

  function showToast(toast, msg = "") {
    saving({
      ...save,
      returnToast: toast,
      msg: msg
    })
  }

  function refetch() {
    getUserBudgetCategories(user, id).then(res => {
      setCategs(sortCategoriesByAmount(res))
      navigation.setParams({
        categories: categs
      })
    })
  }

  const handleSubmit = () => {
    loading(true, "Saving changes..."); var processed = 0;
    categs.forEach((d, i, a) => {
      updateUserBudgetCategory(user, id, d).then( () => {
        processed++;
        if (processed == a.length) {
          loading(false);
          showToast("success", "Changes has been saved.");
          setTimeout(() => {
            showToast(false)
            navigation.navigate('DashboardTab')
          }, 1000)
        }
      }).catch(error => {
        loading(false);
        showToast("failed", error.message)
        setTimeout(() => showToast(false), 1000)
      })
    })
  }

  React.useEffect(() => {
    if (toggle && user) {
      loading(true, "Saving changes...")
      updateDefaultCategories(user, categs).then(res => {
        updateUserBudgetInfo(user, id, {isDefaultCategs: toggle}).then(res => {
          loading(false);
        }).catch(error => {
          showToast("failed", error.message)
          setTimeout(() => showToast(false), 1000);
        })
      }).catch(error => {
        showToast("failed", error.message)
        setTimeout(() => showToast(false), 1000);
      })
    }
  }, [toggle])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "flex"}
      style={{ flex: 1 }}
    >
      {save.isLoading &&
        <Loading
          text={save.loadingMsg}
        />
      }
      {save.returnToast &&
        <SuccessToast
          type={save.returnToast}
          text={save.msg}
        />
      }
      <View style={{ flex: 0.08, width: "100%", paddingTop: 10, paddingHorizontal: 10, marginBottom: 10 }}>
        <Container
          style={[styles.others, {
            borderWidth: 1, borderColor: Colors[colorScheme].headerBackgroundColor,
          }]}
        >
          <Text>Amount To Be Budgeted: </Text>
          <Text style={{ fontWeight: "500" }}> Php {totalBudget}</Text>
        </Container>
      </View>
      <View style={{ flex: 0.08, width: "100%", paddingBottom: 10, paddingHorizontal: 10}}>
        <Container
          style={[styles.others, {
            borderWidth: 1, borderColor: Colors[colorScheme].headerBackgroundColor,
            justifyContent: "space-between"
          }]}
        >
          <Text>Set as Default Categories? </Text>
          <Checkbox value={toggle} setValue={setToggle} />
        </Container>
      </View>
      {showChart &&
        <View style={{ flex: 1, padding: 10 }}>
          <PieChart
            style={{ flex: 1 }}
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
        <View style={{ flex: 1, width: "100%", padding: 10, marginBottom: 10 }}>
          <Container style={{ justifyContent: "center" }}>
            <FlatList
              style={{ width: "100%", flexDirection: "column" }}
              data={categs}
              numColumns={2}
              renderItem={({ item }) => <CategoryInput item={item} />}
            />
          </Container>
          <Container style={{ marginVertical: 15, flexDirection: "row", justifyContent: "space-around" }}>
            <SecondaryButton 
              style={{ flex: 0.48 }}
              text="Create New Category" 
              onPress={() => setShowModal(true)} 
              disabled={categs.length == 10}
            />
            <PrimaryButton 
              style={{ flex: 0.48 }}
              text="Save" 
              onPress={() => handleSubmit()}
            />
          </Container>
        </View>
      }
      <CreateCategoryModal 
        modal={showModal} 
        setModal={setShowModal} 
        categs={sortCategoriesById(categs)}
        setCategs={setCategs}
        refetch={refetch}
        budgetId={id}
        totalBudget={totalBudget}
      />
    </KeyboardAvoidingView>
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
  others: {
    height: "100%",
    padding: 10, 
    borderStyle: "solid", 
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
  }
});