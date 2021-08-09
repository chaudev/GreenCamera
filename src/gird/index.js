import React from 'react';
import {View} from 'react-native';

export const GirdCamera = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          borderRightWidth: 0.2,
          borderColor: 'rgba(255,255,255,0.5)',
        }}>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 0.2,
            borderColor: 'rgba(255,255,255,0.5)',
          }}
        />
        <View
          style={{
            flex: 1,
            borderBottomWidth: 0.2,
            borderColor: 'rgba(255,255,255,0.5)',
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderRightWidth: 0.2,
          borderColor: 'rgba(255,255,255,0.5)',
        }}>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 0.2,
            borderColor: 'rgba(255,255,255,0.5)',
          }}
        />
        <View
          style={{
            flex: 1,
            borderBottomWidth: 0.2,
            borderColor: 'rgba(255,255,255,0.5)',
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 0.2,
            borderColor: 'rgba(255,255,255,0.5)',
          }}
        />
        <View
          style={{
            flex: 1,
            borderBottomWidth: 0.2,
            borderColor: 'rgba(255,255,255,0.5)',
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        />
      </View>
    </View>
  );
};
