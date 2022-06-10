import { Container, Input, KeyboardAvoidingView, Pressable, SubmitButton, Text, View } from "../../components/Themed";
import { StyleSheet } from "react-native";

export default function Login({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <Container style={{ height: "15%", width: "100%" }} />
      <Container style={{ padding: 20 }}>
        <Text style={{ fontSize: 40, fontWeight: "500", marginBottom: 20 }}>Login</Text>
        <Input label="E-mail" textContentType="emailAddress" keyboardType="email-address" />
        <Input label="Password" secureTextEntry={true} />
        <Container style={{ flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
          <Text>Don't have an account? </Text>
          <Pressable
            onPress={() => navigation.navigate('Auth', {screen: "Signup"})}
          >
            <Text>Sign-up Here</Text>
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