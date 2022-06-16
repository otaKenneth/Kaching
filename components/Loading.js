import { Container, Modal, Text } from "./Themed";
import appStyles from "../assets/styles/appStyles";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";

export default function Loading(props) {
  const { text } = props;

  return (
    <Modal
      animationType="fade"
      visible={true}
      transparent={true}
      swipeDirection="down"
      style={{ justifyContent: "flex-end" }}
    >
      <Container
        style={[
          appStyles.modalContainer, 
          { justifyContent: "center", backgroundColor: "rgba(52, 52, 52, 0.3)" }
        ]}
      >
        <Container
          style={[appStyles.modalView, { backgroundColor: "transparent", elevation: 0 }]}
        >
          <Progress.Circle size={150} indeterminate={true} />
          <Text>{text}</Text>
        </Container>
      </Container>
    </Modal>
  );
}

export const SuccessToast = (props) => {
  const {type, text} = props;

  return (
    <Modal
      animationType="fade"
      visible={true}
      transparent={true}
      swipeDirection="down"
      style={{ justifyContent: "flex-end" }}
    >
      <Container
        style={[
          appStyles.modalContainer, 
          { justifyContent: "center", backgroundColor: "rgba(52, 52, 52, 0.3)" }
        ]}
      >
        <Container
          style={[appStyles.modalView, { elevation: 0 }]}
        >
          {type == "success" &&
            <Ionicons name="checkmark" size={150} color="green" />
          }
          {type == "failed" &&
            <Ionicons name="close" size={150} color="red" />
          }
          <Text>{text}</Text>
        </Container>
      </Container>
    </Modal>
  );
}