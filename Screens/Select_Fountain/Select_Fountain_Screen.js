
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableHighlight
} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

import { Styles } from './Select_Fountain_Styles.js';
import COLORS from '../../Resources/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ListItem } from 'native-base';

const I_BackgroundImage = '../../Images/Background/BackGroudSCR.png'
const I_RoundedBG = '../../Images/Rounded_BG_Shape/Rounded_BG_Shape.png'
const I_Logo_H = '../../Images/Logo_Himalaya/Logo_Himalaya.png'
const I_Logo_Splash = '../../Images/Colorfull_Splash/Colorfull_Splash.png'
const I_Fountain1 = '../../Images/Fountain1/Fountain1.png'
const I_Fountain2 = '../../Images/Fountain2/Fountain2.png'
const I_Fountain3 = '../../Images/Fountain3/Fountain3.png'
const I_Connect_Fountain = '../../Images/Connect_Fountain/Connect_Fountain.png'

export default class Select_Fountain_Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deviceToConnect: undefined,
      connecting: 'CONNECT TO FOUNTAIN'
    };

  };
  connect = async () => {        
    console.log("Connecting to device: "+this.state.deviceToConnect.id);
    this.setState({ connecting: 'Connecting...'});
    try {
        await RNBluetoothClassic.connect(this.state.deviceToConnect.id).then((connectedDevice) => {
            console.log("Connected to the device: "+this.state.deviceToConnect.id+" , status: "+{connectedDevice});
            console.log("Starting bluetooth streaming");
            AudioRecorder.startBluetoothSco().then( () => {
                console.log("Started bluetooth streaming");
                this.Go_Start_Record();
            }).catch( (error) => {
                console.log("Error starting bluetooth streaming");
            });
        }).catch( (error) => {
            console.log("Error connecting device "+this.state.deviceToConnect.id+ " Error "+error);
        });
    }catch (error){
        console.log("Error connecting device: "+error);
    }
  }
  Go_Start_Record() {
    this.props.navigation.navigate('Start_Record_Screen')
  }
  selectDevice(fountain) {
    this.setState({ deviceToConnect: fountain});
    console.log('selected fountain to connect ', fountain);
  }

  renderItem(item) {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableOpacity style ={{justifyContent:"center" , justifyContent:'center'}} onPress={() => this.selectDevice(item)}>
        <View style={Styles.View_Fountain}>
          <Image source={require(I_Fountain2)} onp></Image>
          <Text style={Styles.txt_Fountain_2}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  render() {
    const { devices } = this.props.route.params;
    return (
      <View style={Styles.container}>
         <StatusBar barStyle="light-content" />
        <ImageBackground style={Styles.Main_Back} source={require(I_BackgroundImage)} >
          <ScrollView  contentContainerStyle={{ flexGrow: 1 }} scrollEnabled = {true} style={{ flex: 1}}>
            <View style={Styles.View_Main}>
              <View style={Styles.View_Header}>
                <Text style={Styles.txt_Header1}> Please Select
                <Text style={{ color: COLORS.red }}> Your Fountain </Text>
                </Text>
              </View>
              <View style={Styles.View_Splace}>
                <Image style={Styles.img_Splace} source={require(I_Logo_Splash)}></Image>
              </View>
              <View style={Styles.View_Main_Fountain}>
                {(devices.length == 0) &&
                  <View style={Styles.View_Fountain}>
                  <ImageBackground style={Styles.img_Fountain3} source={require(I_Fountain3)}></ImageBackground>
                  <Text style={Styles.txt_Fountain_1_3}>No Fountains Found</Text>
                  <Text style={Styles.txt_Fountain_3_Desc}>Occupied by other user</Text>

                </View>
                }
                {
                  devices.map((item, i) => (
                    <TouchableOpacity key={'to'+item.id} style ={{justifyContent:"center" , justifyContent:'center'}} onPress={() => this.selectDevice(item)}>
                      <View key={'v'+item.id} style={Styles.View_Fountain}>
                        <Image key={'i'+item.id} source={i%2===0?require(I_Fountain1):require(I_Fountain2)} onp></Image>
                        <Text key={'t'+item.id} style={Styles.txt_Fountain_2}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
               
              </View>
              <View style={Styles.View_Connect_Fountain}>
                <TouchableOpacity style ={{justifyContent:"center" , justifyContent:'center'}} onPress={() => this.connect()}>
                  <Image source = {require(I_Connect_Fountain)}></Image>
                  <Text style = {Styles.txt_Conneect}>{this.state.connecting}</Text>
                </TouchableOpacity>
              </View>

              <View style={Styles.View_Bottom}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={Styles.txtBy}>By</Text>
                  <Text style={Styles.txtBottom}> Himalaya Music Fountain </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    )

  }
}

