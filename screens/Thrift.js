import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
    TouchableWithoutFeedback,
} from 'react-native';
import Thiftlogo from './4.png'

const Thrift = () => {
  const navigate = useNavigation()
	handleSearchPress = () => {
    navigate.navigate('ProductView')
	}
  return (
    <View style={styles.container}>
      <Image source={Thiftlogo} style={styles.logo} />
      <Text style={[styles.infoText, styles.medium]}>SEARCH PRODUCTS</Text>
      <View style={styles.inputContainer}>
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.input}
        />
      </View>
      <TouchableWithoutFeedback onPress={handleSearchPress}>
        <View style={styles.nextBtn}>
          <Text style={styles.nextBtnText}>GO</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 25,
		marginHorizontal: 40,
		backgroundColor: '#f5f5f6',
		borderColor: '#d5d6d9',
		borderWidth: 0.5,
		height: 45,
		borderRadius: 4,
		alignSelf: 'stretch',
		paddingHorizontal: 15,
	},
	input: {
		flex: 1,
		color: '#161925',
		fontSize: 20,
	},
	nextBtn: {
		marginTop: 50,
		height: 40,
		width: 100,
		backgroundColor: '#4f7fe6',
		justifyContent: 'center',
		borderRadius: 50,
	},
	nextBtnText: {
		fontWeight: 'bold',
		fontSize: 13,
		color: '#ffffff',
		alignSelf: 'center',
	},
	logo: {
        marginTop: 80,
		width: 100,
		height: 100,
	},
	infoText: {
		fontSize: 11,
		letterSpacing : 1.5,
		marginTop: 80,
	},
	medium: {
		color: '#161925',
	},
	regular: {
		color: '#94989f',
	},
});

export default Thrift;