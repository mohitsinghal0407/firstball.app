import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import {
//   AdMobNativeAdsManager,
//   AdMobNativeMediaView,
//   AdMobNativeAdView,
//   AdMobNativeAdBadge,
//   AdMobNativeAdHeadline,
//   AdMobNativeAdBody,
//   AdMobNativeAdCallToAction,
// } from 'react-native-admob-native-ads';

const adUnitId = __DEV__
  ? 'ca-app-pub-3940256099942544/2247696110' // Test ID
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

// const adsManager = new AdMobNativeAdsManager(adUnitId);

export default function NativeAdComponent() {
  return (
    // <AdMobNativeAdView adsManager={adsManager} style={styles.nativeAdView}>
    //   <View style={styles.adContainer}>
    //     <AdMobNativeAdBadge style={styles.adBadge} />
    //     <AdMobNativeMediaView style={styles.mediaView} />
    //     <View style={styles.textContainer}>
    //       <AdMobNativeAdHeadline style={styles.headline} />
    //       <AdMobNativeAdBody style={styles.body} />
    //       <AdMobNativeAdCallToAction style={styles.callToAction} />
    //     </View>
    //   </View>
    // </AdMobNativeAdView>
    <></>
  );
}

const styles = StyleSheet.create({
  nativeAdView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  adBadge: {
    marginRight: 10,
  },
  mediaView: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  headline: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    marginTop: 5,
  },
  callToAction: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2563EB',
    color: '#fff',
    borderRadius: 5,
  },
});
