import { Text, View } from "react-native"
import { TextInput } from "react-native-paper"
import styles from 'assets/styles';

export const CustomInput = (props) => {
  return (
    <View
      style={styles.textInput}
    >
      <TextInput {...props} />
      {props.error &&
        <Text style={styles.textInputError}>{props.error}</Text>
      }
    </View>
  )
}