import React from "react";
import { 
  Modal, 
  Pressable, 
  View, Text,
  Container, 
  TouchableOpacity, 
  ChangableInput, 
  Input 
} from "../../../components/Themed";
import { PrimaryButton } from "../../../components/Buttons";
import { AntDesign } from "@expo/vector-icons";
import { initialCategoryForm, newCategory } from "../../../constants/defaults";
import appStyles from "../../../assets/styles/appStyles";
import validate from "../../../constants/validate";
import newCategoryVals from "../../../hooks/categories";
import { addUserBudgetCategory as create, updateUserBudgetCategory as update } from "../../../hooks/firebase";
import { useAuthentication } from "../../../hooks/useAuthentication";

export default function CreateCategoryModal (props) {
  const { modal, setModal, categs, setCategs, budgetName, refetch, totalBudget } = props;
  const user = useAuthentication();
  const [form, setForm] = React.useState(initialCategoryForm())
  const balanceId = Object.values(categs).find(data => data.name == "Balance").id;
  const [type, setType] = React.useState(0);
  const [cId, setCId] = React.useState(categs[categs.length - 1].id + 1);

  function handleNewCategoryValue(type, value) {
    form.budgetPlanned.type = type;
    form.budgetPlanned.value = value;
    setForm({ ...form });
  }

  const handleNewValue = function (data, type, value) {
    return new Promise(function (resolve, reject) {
      setCategs(categs => newCategoryVals(data, type, value, categs, totalBudget))
      resolve(true);
    })
  }
  
  function processNewCategory () {
    const state = newCategory();
    Object.keys(form).map(key => {
      switch (key) {
        case "budgetPlanned":
          let t = form.budgetPlanned.type == 0 ? "percentage":"amount";
          state[key][t] = form[key].value;
          break;
        default:
          state[key] = form[key].value;
          break;
      }
    })
    state.id = cId;
    return state;
  }

  const addNewCategory = () => {
    const v = validate(form)
    if (Object.values(v).find(data => data.result == false)) {
      setForm(v)
    } else {
      const state = processNewCategory();
      handleNewValue(state, form.budgetPlanned.type, form.budgetPlanned.value).then(res => {
        const balData = categs.find(data => data.id == balanceId);
        create(user, budgetName, state).then(res => {
          update(user, budgetName, balData).then(res => {
            reset(); refetch();
            setModal(false);
          }).catch(error => {
            console.log(error);
          })
        }).catch(error => {
          refetch();
          console.log(error.message);
          setModal(false);
        })
      });
    }
  }

  function reset() {
    setForm(initialCategoryForm());
    setCId(cId + 1);
  }

  return (
    <Modal
      animationType="fade"
      visible={modal}
      transparent={true}
      swipeDirection="down"
      style={{ justifyContent: "center" }}
    >
      <Pressable style={[appStyles.modalContainer, { justifyContent: "center" }]}>
        <View style={[appStyles.modalView, { padding: 10, justifyContent: "flex-start" }]}>
          <Container style={{ paddingBottom: 10, flexDirection: "row", justifyContent: "space-around" }}>
            <View style={{ flex: 0.8 }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>New Category</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ alignItems: "center" }}
              onPress={() => setModal(false)}
            >
              <AntDesign name="close" size={24} color="red" />
            </TouchableOpacity>
          </Container>
          <View style={{ width: 250, }}>
            <Input
              label="Category Name"
              value={form.name.value}
              onChangeText={(value) => { form.name.value = value; setForm({ ...form }) }}
              containerStyle={{ justifyContent: "flex-start", width: "100%" }}
              validation={form.name.result ? false : form.name.error}
            />
            <ChangableInput
              label="Category Budget"
              values={form.budgetPlanned.value}
              containerStyle={{ marginHorizontal: 3 }}
              keyboardType="numeric"
              type={setType}
              changableIconButtons={['percent-outline', 'pound']}
              onEndEditing={(el) => {
                handleNewCategoryValue(type, el.nativeEvent.text)
              }}
              validation={form.budgetPlanned.result ? false : form.budgetPlanned.error}
            />
            <Input
              label="Comment"
              value={form.comment.value}
              onChangeText={(value) => { form.comment.value = value; setForm({ ...form }) }}
              style={{ marginBottom: 20 }}
            />
            <PrimaryButton
              text="Save"
              onPressOut={() => addNewCategory()}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}