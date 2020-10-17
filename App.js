/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Appearance} from 'react-native';
import { NetworkInfo } from "react-native-network-info";

const App = () => {
  const colorScheme = Appearance.getColorScheme();

  const [SSID, setSSID] = useState("Loading...")
  const [publicIP, setPublicIP] = useState("Loading...")
  const [privateIP, setPrivateIP] = useState("Loading...")
  const [gateway, setGateway] = useState("Loading...")
  const [ISP, setISP] = useState("Loading...")
  const [MAC, setMAC] = useState("Loading...")

  useEffect(() => {
    NetworkInfo.getSSID().then(_ssid => {
      setSSID(_ssid || "Unavailable")
    }).catch(err => {
      setSSID("Unavailable")
    });

    fetch("https://api.ipify.org/?format=json")
    .then(res => res.json())
    .then(json => {
      setPublicIP(json.ip || "Unavailable")
    }).catch(err => {
      setPublicIP("Unavailable")
    })

    NetworkInfo.getIPAddress().then(ipv4Address => {
      setPrivateIP(ipv4Address || "Unavailable");
    }).catch(err => {
      setPrivateIP("Unavailable")
    });

    NetworkInfo.getGatewayIPAddress().then(defaultGatewayIP => {
      setGateway(defaultGatewayIP || "Unavailable");
    }).catch(err => {
      setGateway("Unavailable")
    });
  }, []);

  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? "light-content" : "dark-content"}/>
      <SafeAreaView style={colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}>
          <Text style={[styles.headerText, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>Internetty</Text>
          <Text style={[styles.subtitleText, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>Here's your Internet details:</Text>

          <View style={styles.detailsView}>
          <View style={styles.detailView}>
              <Text style={[styles.detailValue, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>{SSID}</Text>
              <Text style={[styles.detail, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>Network SSID</Text>
            </View>
            <View style={styles.detailView}>
              <Text style={[styles.detailValue, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>{publicIP}</Text>
              <Text style={[styles.detail, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>Public IP address</Text>
            </View>
            <View style={styles.detailView}>
              <Text style={[styles.detailValue, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>{privateIP}</Text>
              <Text style={[styles.detail, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>Local IP address</Text>
            </View>
            <View style={styles.detailView}>
              <Text style={[styles.detailValue, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>{gateway}</Text>
              <Text style={[styles.detail, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>Default gateway</Text>
            </View>
            <View style={styles.detailView}>
              <Text style={[styles.detailValue, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>{ISP}</Text>
              <Text style={[styles.detail, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>Internet service provider</Text>
            </View>
            <View style={styles.detailView}>
              <Text style={[styles.detailValue, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>{MAC}</Text>
              <Text style={[styles.detail, colorScheme === 'dark' ? styles.lightText : styles.darkText]}>Your MAC address</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  lightText: {
    color: '#fff'
  },
  darkText: {
    color: '#000'
  },
  darkContainer: {
    backgroundColor: '#000',
    color: '#fff'
  },
  lightContainer: {
    backgroundColor: '#fff',
    color: '#000'
  },
  container: {
    textAlign: 'center',
    padding: 50,
  },
  headerText: {
    fontSize: 50,
    fontWeight: '600'
  },
  subtitleText: {
    fontSize: 25
  },
  detailsView: {
    paddingTop: 20,
    paddingBottom: 80
  },
  detailView: {
    paddingTop: 50,
  },
  detailValue: {
    fontWeight: '600',
    fontSize: 35,
  },
  detail: {
    fontSize: 20
  }
});

export default App;
