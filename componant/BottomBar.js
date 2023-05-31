import "react-native-gesture-handler"
import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const BOTTOM_APPBAR_HEIGHT = 50;

const BottomBar = ({openBottomSheet}) => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const handleUserAccount = () =>{
    navigation.navigate("UserAccountScreen")
  }
  const openBottomSheetHere = () => {
    openBottomSheet()
  }
  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
        },
      ]}
      safeAreaInsets={{ bottom }}
    >
      <TouchableOpacity onPress={openBottomSheetHere}>
        <Icon
          name="dots-three-vertical"
          color="#4F80E6"
          size={25}
          type="entypo"
        />
      </TouchableOpacity>
      <Icon
        name="home"
        color="#A6BEF0"
        size={25}
        type="antdesign"
      />
      <Icon
        name="bells"
        color="#4F80E6"
        size={25}
        type="antdesign"
      />
      <Icon
        onPress={handleUserAccount}
        name="user"
        color="#4F80E6"
        size={25}
        type="antdesign"
      />
    </Appbar>
  );
}
const height =Dimensions.get('window').height - 80
const styles = StyleSheet.create({
    bottom: {
      paddingLeft: 30,
      paddingRight: 30,
      backgroundColor: '#dae5f79a',
      position: 'absolute',
      borderRadius: 50,
      left: 0,
      margin: 20,
      right: 0,
      bottom: 0,
      top: height,
      justifyContent: 'space-between'
    }
  });
export default BottomBar
