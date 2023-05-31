import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const Loadloop = (turnOn) => {
  return (
    <View>
      <Spinner visible={true} />
    </View>
  );
};

export default Loadloop;
