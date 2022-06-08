import { Container, Input, KeyboardAvoidingView, Pressable, SubmitButton, Text, View } from "../../components/Themed";
import { StyleSheet } from "react-native";

export default function Signup({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <Container style={{ height: "23%", width: "100%" }} />
      <Container style={{ padding: 20 }}>
        <Text style={{ fontSize: 40, fontWeight: "500", marginBottom: 20 }}>Sign-up</Text>
        <Input label="E-mail" textContentType="emailAddress" keyboardType="email-address" />
        <Input label="Password" secureTextEntry={true} />
        <Input label="Confirm Password" secureTextEntry={true} />
        <Container style={{ flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
          <Text>Go back to </Text>
          <Pressable
            onPress={() => navigation.navigate('Auth', {screen: "Login"})}
          >
            <Text>Login</Text>
          </Pressable>
        </Container>
        <SubmitButton style={{ marginTop: 20 }} />
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-start"
  }
})