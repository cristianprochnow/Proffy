import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { View, Image, Text } from 'react-native'

import { styles } from './styles'
import { colors } from '../../assets/styles/colors'

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

import MainButton from '../../components/MainButton'
import { api } from '../../services/api'

interface ITotalConnections {
  totalConnections: number
}

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState<number|string>(0)

  const { navigate } = useNavigation()

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses')
  }

  function handleNavigateToStudyPage() {
    navigate('Study')
  }

  useEffect(() => {
    api.get('/connections').then((response) => {
      const connectionsResponse: ITotalConnections = response.data

      setTotalConnections(connectionsResponse.totalConnections)
    }).catch((error) => {
      setTotalConnections('muitas')
    })
  }, [])

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
          handlePress={handleNavigateToStudyPage}
        />

        <MainButton
          label="Dar aulas"
          backColor={colors.secondary}
          icon={giveClassesIcon}
          handlePress={handleNavigateToGiveClassesPage}
        />
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
}

export default Landing
