import { StyleSheet } from "react-native";

import { colors } from "../../assets/styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: 40
  },

  content: {
    flex: 1,
    justifyContent: 'center'
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: colors.titleInPrimary,
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180
  },

  description: {
    fontFamily: 'Poppins_400Regular',
    marginTop: 24,
    color: colors.textInPrimary,
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 240
  },

  okButton: {
    width: '100%',
    height: 58,
    marginVertical: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary
  },

  okButtonText: {
    fontFamily: 'Archivo_700Bold',
    color: colors.buttonText,
    fontSize: 16
  }
})

export { styles }
