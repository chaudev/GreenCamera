import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {GreenCamera} from './src';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import {Colors} from 'green-native';

const App = () => {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]).then(statuses => {
      if (statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == 'granted') {
        setPermission(true);
      } else {
        check();
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.black}}>
      {permission && <GreenCamera />}
    </View>
  );
};

export default App;
