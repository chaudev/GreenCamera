import React, {useState} from 'react';
import {View} from 'react-native';
import {GreenCamera} from './src';
import {checkMultiple, PERMISSIONS} from 'react-native-permissions';
import {Colors} from 'green-native';

const App = () => {
  const [permission, setPermission] = useState(false);

  checkMultiple([
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ]).then(statuses => {
    if (statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == 'granted') {
      setPermission(true);
    }
  });

  return (
    <View style={{flex: 1, backgroundColor: Colors.black}}>
      {permission && <GreenCamera />}
    </View>
  );
};

export default App;
