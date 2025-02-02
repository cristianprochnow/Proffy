import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Image, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

import { styles } from './styles'

import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'

interface IPageHeader {
  title: string
}

const PageHeader: React.FC<IPageHeader> = ({ title }) => {
  const { navigate } = useNavigation()

  function handleGoBack(): void {
    navigate('Landing')
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default PageHeader
