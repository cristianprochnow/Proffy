import React from 'react'
import { View, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { styles } from './styles'
import { colors } from '../../assets/styles/colors'

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

import MainButton from '../../components/MainButton'

const Landing: React.FC = () => {
  const { navigate } = useNavigation()

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses')
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo(a), {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <MainButton
          label="Estudar"
          backColor={colors.primaryLighter}
          icon={studyIcon}
          handlePress={handleNavigateToGiveClassesPage}
        />

        <MainButton
          label="Dar aulas"
          backColor={colors.secondary}
          icon={giveClassesIcon}
          handlePress={handleNavigateToGiveClassesPage}
        />
      </View>

      <Text style={styles.totalConnections}>
        Total de 285 conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
}

export default Landing
