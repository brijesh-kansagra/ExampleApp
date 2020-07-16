'use strict';

import React from "react";
import Permissions from 'react-native-permissions';
import ReactNative, {
  NativeModules,
  NativeAppEventEmitter,
  DeviceEventEmitter,
  PermissionsAndroid,
  Platform
} from "react-native";
console.log("############", NativeModules)
var AudioRecorderManager = NativeModules.AudioRecorderManager;

var AudioRecorder = {
  prepareRecordingAtPath: function(path, options) {
    if (this.progressSubscription) this.progressSubscription.remove();
    this.progressSubscription = NativeAppEventEmitter.addListener('recordingProgress',
      (data) => {
        if (this.onProgress) {
          this.onProgress(data);
        }
      }
    );

    if (this.finishedSubscription) this.finishedSubscription.remove();
    this.finishedSubscription = NativeAppEventEmitter.addListener('recordingFinished',
      (data) => {
        if (this.onFinished) {
          this.onFinished(data);
        }
      }
    );

    var defaultOptions = {
      SampleRate: 44100.0,
      Channels: 2,
      AudioQuality: 'High',
      AudioEncoding: 'ima4',
      OutputFormat: 'mpeg_4',
      MeteringEnabled: true,
      MeasurementMode: false,
      AudioEncodingBitRate: 32000,
      IncludeBase64: false
    };

    var recordingOptions = {...defaultOptions, ...options};

    if (Platform.OS === 'ios') {
      AudioRecorderManager.prepareRecordingAtPath(
        path,
        recordingOptions.SampleRate,
        recordingOptions.Channels,
        recordingOptions.AudioQuality,
        recordingOptions.AudioEncoding,
        recordingOptions.MeteringEnabled,
        recordingOptions.MeasurementMode,
        recordingOptions.IncludeBase64
      );
    } else {
      return AudioRecorderManager.prepareRecordingAtPath(path, recordingOptions);
    }
  },
  startRecording: function() {
    return AudioRecorderManager.startRecording();
  },
  pauseRecording: function() {
    return AudioRecorderManager.pauseRecording();
  },
  resumeRecording: function() {
    return AudioRecorderManager.resumeRecording();
  },
  stopRecording: function() {
    return AudioRecorderManager.stopRecording();
  },
  checkAuthorizationStatus: async () => {
    if (Platform.OS === 'ios') {
      const p = await Permissions.request(Permissions.PERMISSIONS.IOS.MICROPHONE);
      console.log('audio permission check', p);
      if (p === Permissions.RESULTS.GRANTED) return p;
      return this.requestAuthorization();
    }else {
      const p = await Permissions.request(Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO);
      console.log('audio permission check', p);
      if (p === Permissions.RESULTS.GRANTED) return p;
      return this.requestAuthorization();
    }
  },
  requestAuthorization: async () => {
    if (Platform.OS === 'ios') {
      const p = await Permissions.request(Permissions.PERMISSIONS.IOS.MICROPHONE);
      console.log('audio permission request', p);
      return p;
    }
    else {
      const p = await Permissions.request(Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO);
      console.log('audio permission request', p);
      return p;
    }
  },
  removeListeners: function() {
    if (this.progressSubscription) this.progressSubscription.remove();
    if (this.finishedSubscription) this.finishedSubscription.remove();
  },
};

let AudioUtils = {};

if (Platform.OS === 'ios') {
  AudioUtils = {
    MainBundlePath: AudioRecorderManager.MainBundlePath,
    CachesDirectoryPath: AudioRecorderManager.NSCachesDirectoryPath,
    DocumentDirectoryPath: AudioRecorderManager.NSDocumentDirectoryPath,
    LibraryDirectoryPath: AudioRecorderManager.NSLibraryDirectoryPath,
  };
} else if (Platform.OS === 'android') {
  AudioUtils = {
    MainBundlePath: AudioRecorderManager.MainBundlePath,
    CachesDirectoryPath: AudioRecorderManager.CachesDirectoryPath,
    DocumentDirectoryPath: AudioRecorderManager.DocumentDirectoryPath,
    LibraryDirectoryPath: AudioRecorderManager.LibraryDirectoryPath,
    PicturesDirectoryPath: AudioRecorderManager.PicturesDirectoryPath,
    MusicDirectoryPath: AudioRecorderManager.MusicDirectoryPath,
    DownloadsDirectoryPath: AudioRecorderManager.DownloadsDirectoryPath
  };
}

module.exports = {AudioRecorder, AudioUtils};