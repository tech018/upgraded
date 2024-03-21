import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const LogoWithText = () => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        alt="logo"
        source={require('../../assets/images/logo.png')}
      />
      <View style={{marginLeft: 10}}>
        <Text style={styles.headerTitle}>Electronic Gatepass</Text>
        <Text style={styles.subtitle}>Tarlac Agricultural University</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 15,
  },
});
export default LogoWithText;
