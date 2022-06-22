import { StyleSheet } from "react-native";
import { useAuthentication } from "../hooks/useAuthentication";
import { Text, View, TouchableOpacity } from "../components/Themed";
import { getAuth, signOut } from "firebase/auth";

export default function TabTwoScreen({ navigation, route }) {
  const auth = getAuth();
  const user = useAuthentication();
  const { initialNavTo } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{!user ? "Guest":user.email}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            signOut(auth).then(() => {
              initialNavTo('login')
            }).catch((error) => {
              console.log(error.message);
            })
          }}
          style={{ width: "100%", padding: 10, elevation: 2 }}
        >
          <Text style={{ fontSize: 15 }}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
