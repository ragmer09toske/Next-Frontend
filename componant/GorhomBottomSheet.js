import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet'
import React, {useMemo,useCallback,useState, useRef} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const GorhomBottomSheet = () => {
  const sheetRef = useRef(null)
  const [isOpen, setIsOpen] = useState(true)

  const snapPoints = ['40%']
  return (
    <GestureHandlerRootView style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
        >
          <BottomSheetView>
            <Text>Hello world</Text>
          </BottomSheetView>
        </BottomSheet>
    </GestureHandlerRootView>
  );
}
export default GorhomBottomSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
