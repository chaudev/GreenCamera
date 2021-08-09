import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  LogBox,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {ButtonIcon, Colors, GreenStyles, Icon} from 'green-native';
import {RNCamera} from 'react-native-camera';
import Slider from '@react-native-community/slider';
import {GirdCamera} from './gird';

var RNFS = require('react-native-fs');

LogBox.ignoreAllLogs();

export const GreenCamera = () => {
  let cameraRef = useRef();

  const [flash, setFlash] = useState(false);
  const [front, setFront] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [focus, setFocus] = useState({x: undefined, y: undefined});
  const [imageType, setImageType] = useState('jpg');
  const [gird, setGird] = useState(false);

  const takePicture = async () => {
    if (cameraRef) {
      const options = {
        quality: 0.5,
        base64: true,
      };

      const data = await cameraRef.takePictureAsync(options);
      console.log(data.uri);
      setTemp(data.uri);

      saveFile(data.uri);
    }
  };

  const getZoom = () => {
    return zoom == 0
      ? '1x'
      : zoom == 0.1
      ? '2x'
      : zoom == 0.2
      ? '3x'
      : zoom == 0.3
      ? '4x'
      : zoom == 0.4
      ? '5x'
      : zoom == 0.5
      ? '6x'
      : zoom == 0.6
      ? '7x'
      : zoom == 0.7
      ? '8x'
      : zoom == 0.8
      ? '9x'
      : zoom == 0.9
      ? '10x'
      : '1x';
  };

  const ZoomCamera = () => {
    return zoom == 0
      ? setZoom(0.1)
      : zoom == 0.1
      ? setZoom(0.2)
      : zoom == 0.2
      ? setZoom(0.3)
      : zoom == 0.3
      ? setZoom(0.4)
      : zoom == 0.4
      ? setZoom(0.5)
      : zoom == 0.5
      ? setZoom(0.6)
      : zoom == 0.6
      ? setZoom(0.7)
      : zoom == 0.7
      ? setZoom(0.8)
      : zoom == 0.8
      ? setZoom(0.9)
      : zoom == 0.9
      ? setZoom(0)
      : setZoom(0);
  };

  const saveFile = url => {
    var timeStampInMs =
      window.performance &&
      window.performance.now &&
      window.performance.timing &&
      window.performance.timing.navigationStart
        ? window.performance.now() + window.performance.timing.navigationStart
        : Date.now();

    let path =
      RNFS.ExternalStorageDirectoryPath +
      '/DCIM/Camera/green-camera-' +
      timeStampInMs +
      '.' +
      imageType;

    RNFS.copyFile(url, path)
      .then(res => {
        console.log('success');
      })
      .catch(err => {
        console.log('ERROR: image file write failed!!!');
        console.log(err.message, err.code);
      });
  };

  const [temp, setTemp] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <View
        style={{
          height: 50,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <ButtonIcon
            iconName={flash ? 'flash' : 'flash-off'}
            iconColor=""
            iconSize={24}
            onPress={() => {
              setFlash(!flash);
            }}
          />
        </View>
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setImageType(imageType == 'jpg' ? 'png' : 'jpg');
            }}>
            <Text
              style={{
                color: Colors.primaryColor,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {imageType == 'jpg' ? 'JPG' : 'PNG'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <ButtonIcon
            iconName={gird ? 'grid' : 'grid-outline'}
            iconColor=""
            iconSize={22}
            onPress={() => {
              setGird(!gird);
            }}
          />
        </View>
      </View>

      <RNCamera
        ref={ref => {
          cameraRef = ref;
        }}
        style={styles.preview}
        type={
          front ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        autoFocus={RNCamera.Constants.AutoFocus.on}
        zoom={zoom}
        onTap={position => {
          console.log(position);
          setFocus(position);
        }}
        androidCameraPermissionOptions={{
          title: 'Quyền truy cập camera',
          message: 'Chúng tôi cần quyền truy cập camera để chụp ảnh',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Đéo cho',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Quyền truy cập micro',
          message: 'Chúng tôi cần quyền truy cập micro để ghi âm trong video',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Đéo cho',
        }}>
        {gird && <GirdCamera />}
      </RNCamera>

      {!showSettings ? (
        <View
          style={{
            width: '100%',
            height: 30,
            marginTop: -40,
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              setShowSettings(true);
            }}
            style={[
              {
                height: 30,
                width: 30,
                justifyContent: 'flex-end',
                alignItems: 'center',
              },
            ]}>
            <Icon type="MaterialIcons" name="keyboard-arrow-up" size={24} />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: 30,
            marginTop: -40,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onLongPress={() => {
                setZoom(0);
              }}
              onPress={() => {
                ZoomCamera();
              }}
              style={[
                {
                  borderWidth: 0,
                  marginLeft: 10,
                  borderColor: '#fff',
                  borderRadius: 900,
                },
                GreenStyles.Center,
              ]}>
              <Text style={{color: Colors.primaryColor, fontSize: 12}}>
                {zoom.toFixed(2) + 'x'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
            <Slider
              minimumValue={0}
              step={0.05}
              maximumValue={1}
              minimumTrackTintColor={Colors.primaryColor}
              thumbTintColor={Colors.primaryColor}
              maximumTrackTintColor={Colors.white}
              onValueChange={value => {
                setZoom(value);
              }}
              value={zoom}
              style={{
                width: '100%',
              }}
            />
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                setShowSettings(false);
              }}
              style={[
                {
                  height: 30,
                  width: 30,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginRight: 10,
                },
              ]}>
              <Icon type="MaterialIcons" name="keyboard-arrow-down" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View
        style={{
          height: 100,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {temp !== '' ? (
            <Image
              resizeMode="cover"
              source={{uri: temp}}
              style={{
                width: 35,
                height: 35,
                borderColor: Colors.primaryColor,
                borderWidth: 1,
              }}
            />
          ) : (
            <View
              style={[
                {
                  width: 35,
                  height: 35,
                  backgroundColor: '#fff',
                  borderColor: Colors.primaryColor,
                  borderWidth: 1,
                },
                GreenStyles.Center,
              ]}>
              <Text
                style={{
                  fontSize: 10,
                  color: Colors.primaryColor,
                  fontWeight: 'bold',
                }}>
                Green
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 68,
              height: 68,
              borderRadius: 900,
              borderWidth: 2,
              borderColor: Colors.primaryColor,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              takePicture();
            }}
            style={{
              width: 56,
              height: 56,
              marginTop: -62,
              borderRadius: 900,
              backgroundColor: '#fff',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setFront(!front);
            }}>
            <Image
              resizeMode="contain"
              source={require('./image/switch-camera.png')}
              style={{width: 35, height: 35}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
