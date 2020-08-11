import { StyleSheet } from "react-native";

import { colors } from '../../assets/styles/colors'

const styles = StyleSheet.create({
  button: {
    height: 150,
    width: '48%',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between'
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: colors.buttonText,
    fontSize: 20
  }
})

export { styles }
