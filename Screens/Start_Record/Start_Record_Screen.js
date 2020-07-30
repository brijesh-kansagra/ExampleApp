
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
  TouchableOpacity
} from 'react-native';

import { Styles } from './Start_Record_Style.js';
import COLORS from '../../Resources/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const I_BackgroundImage = '../../Images/Background/BackGroudSCR.png'
const I_Heught_BG = '../../Images/RecordScreen/Heught_BG.png'
const I_Mic = '../../Images/RecordScreen/Mic.png'
const I_Round_BG = '../../Images/RecordScreen/Round_BG.png'
const I_Round_BG1 = '../../Images/RecordScreen/RoundBG1.png'

const I_SecondCount = '../../Images/RecordScreen/SecondCount.png'
const I_animationBG = '../../Images/Fountain.png'


export default class Start_Record_Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TotalLeagth: 44,
      imageLeanght:11,
      minCount: 6,
      maxCount: 15,
      arrView: [],
      isonPress: false,
      arrImage: [],
      imgmax: 5,
      imgmax1: 8,
      imgMin: 2,
    };

  };
  Go_Score() {
    this.props.navigation.navigate('Start_Record_Screen')
  }
  baranimation() {
    this.state.arrView = []
    for (var i = 0; i < this.state.TotalLeagth; i++) {
      if (this.state.minCount <= i && this.state.maxCount >= i && this.state.isonPress == true) {
        this.state.arrView.push(<View style={{ backgroundColor: '#79A6F1', height: 6,
         width: '100%', marginTop: 4 }}  key ={i} />)
      } else if (this.state.maxCount < i && this.state.isonPress == true) {
        this.state.arrView.push(<View style={{backgroundColor: '#EB4FD0', height: 6,
          width: '100%', marginTop: 4 }} key ={i} />)
      }
      else {
        this.state.arrView.push(<View style={{backgroundColor: '#24192A', height: 6,
          width: '100%', marginTop: 4 }} key ={i} />)

      }
    }
    return this.state.arrView
  }
  barimage() {


    this.state.arrImage = []

    for (var i = 0; i < this.state.imageLeanght; i++) {
      if (this.state.imgMin <= i && this.state.imgmax >= i) {
        this.state.arrImage.push(<Image style={{ tintColor: this.state.isonPress == true ? '#70A9EE' : '#24192A', height: 45, width: 55, resizeMode: 'contain' ,alignSelf:'center'}} source={require(I_animationBG)} key ={i} />)
      } else if (this.state.imgmax <= i && this.state.imgmax1 >= i) {
        this.state.arrImage.push(<Image style={{ tintColor: this.state.isonPress == true ? '#BB71E0' : '#24192A', height: 55, width: 65, resizeMode: 'contain' ,alignSelf:'center'}} source={require(I_animationBG)} key ={i} />)
      } else if (this.state.imgmax1 <= i) {
        this.state.arrImage.push(<Image style={{ tintColor: this.state.isonPress == true ? '#EB51DA' : '#24192A', height: 55, width: 65, resizeMode: 'contain' ,alignSelf:'center' }} source={require(I_animationBG)} key ={i} />)
      } else {
        this.state.arrImage.push(<Image style={{ tintColor: this.state.isonPress == true ? '#6CF8FB' : '#24192A', height: 35, width: 45, resizeMode: 'contain' ,alignSelf:'center' }} source={require(I_animationBG)} key ={i} />)
      }
    }

    return this.state.arrImage
  }
  render() {
    return (
      <View style={Styles.container}>
        <ImageBackground style={Styles.Main_Back} source={require(I_BackgroundImage)} >
          <View style={Styles.View_Header}>
            <View>
              <Image source={require(I_Heught_BG)}></Image>
              <View style={Styles.HeaderViewText}>
                <Text style={Styles.txtHeader}>Height</Text>
                <Text style={Styles.txtHeader1}>156CM</Text>
              </View>
            </View>
            <View>
              <Image source={require(I_Heught_BG)}></Image>
              <View style={Styles.HeaderViewText}>
                <Text style={Styles.txtHeader}>Frequency</Text>
                <Text style={Styles.txtHeader1}>+150DB</Text>
              </View>
            </View>
          </View>
          <View style={Styles.ViewCenter}>
            <View style={{width: 60 ,height:500}}>
              {
                this.barimage()
              }
            </View>
            <View style={Styles.ViewSubCenter} >
              <View style={{ justifyContent: 'center' }} >
                <Image style={Styles.Img_SecBG} source={require(I_SecondCount)} />
                <Text style={Styles.txtSEC}>30
                <Text style={Styles.txtSEC1}> SEC</Text>
                </Text>
              </View>
              <View style={{ bottom: -50, alignSelf: 'center' }}>
                <Image style={Styles.imgMik} source={require(I_Mic)}></Image>
              </View>
            </View>
            <View style={{ width: 60 }}>

              <View style={{ height: 100, width: 45, top: 0, right: 20, position: 'absolute' }}>
                {
                  this.baranimation()
                }
              </View>
            </View>
          </View>

          <View style={Styles.ViewBottom}>
            <Image style={Styles.imeBottom} source={require(I_Round_BG1)}></Image>
            <TouchableOpacity style={{ bottom: 10, height: 100, alignItems: 'center', width: 160, position: 'absolute', alignSelf: 'center' }} onPress={() => this.setState({ minCount: 5, maxCount: 25, isonPress: true })} >
              <Text style={Styles.txtBottom}>START</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )

  }
}

