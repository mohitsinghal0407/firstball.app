import {useEffect, useRef, useState} from 'react';
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

import NativeAdView, {
  HeadlineView,
  ImageView,
  TaglineView,
} from 'react-native-admob-native-ads';

// const adsManager = new AdMobNativeAdsManager(adUnitId);

export default function NativeAdComponent() {
  const nativeAdViewRef = useRef();

  useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView ref={nativeAdViewRef} repository="imageAd">
      <ImageView
        style={{
          width: '100%',
          height: 250,
        }}
      />
      <HeadlineView
        style={{
          fontWeight: 'bold',
          fontSize: 13,
        }}
      />
      <TaglineView
        style={{
          fontWeight: 'bold',
          fontSize: 12,
        }}
      />
    </NativeAdView>
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
