import React from 'react'
import { Image, Text, ImageSourcePropType } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { styles } from './styles'

interface IMainButton {
  label: string
  backColor: string
  icon: ImageSourcePropType
  handlePress: () => void
}

const MainButton: React.FC<IMainButton> = ({
  label,
  backColor,
  icon,
  handlePress
}) => {
  return (
    <RectButton
      style={[styles.button, { backgroundColor: backColor }]}
      onPress={handlePress}
    >
      <Image source={icon} />

      <Text style={styles.buttonText}>{label}</Text>
    </RectButton>
  )
}

export default MainButton
