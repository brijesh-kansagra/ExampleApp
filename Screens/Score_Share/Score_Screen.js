
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
import COLORS from '../../Resources/Colors';

import { Styles } from './Score_style.js'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const I_BackgroundImage = '../../Images/Background/BackGroudSCR.png'
const I_RoundedBG = '../../Images/Score_Level/ScoreLevel_1.png'
const I_share = '../../Images/Share/share.png'
const I_Share_Back = '../../Images/Share/Share_Back.png'
const I_Close_BG = '../../Images/Score_Button/Close_BG.png'
const I_Close_Icon = '../../Images/Score_Button/Close_Icon.png'
const I_Try_Again_BG = '../../Images/Score_Button/Try_Again_BG.png'
const I_Try_Again_Icon = '../../Images/Score_Button/Try_Again_Icon.png'
const I_animationBG = '../../Images/Fountain.png'



export default class Score_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLeanght:5,
      isonPress: true,
      arrImage: [],
      imgmax: 3,
      imgmax1: 4,
      imgMin: 2,
    };

  };
  Go_Start_Record() {
    this.props.navigation.navigate('Start_Record_Screen')
  }
  barimage() {


    this.state.arrImage = []

    for (var i = 0; i < this.state.imageLeanght; i++) {
      if (this.state.imgMin <= i && this.state.imgmax >= i) {
        console.log("pinkkk")
        this.state.arrImage.push(<Image style={{ tintColor: this.state.isonPress == true ? '#70A9EE' : '#24192A', height: 45, width: 55, resizeMode: 'contain' ,alignSelf:'center'}} source={require(I_animationBG)} />)

      } else if (this.state.imgmax <= i && this.state.imgmax1 >= i) {
        console.log("res")
        this.state.arrImage.push(<Image style={{ tintColor: this.state.isonPress == true ? '#BB71E0' : '#24192A', height: 55, width: 65, resizeMode: 'contain' ,alignSelf:'center'}} source={require(I_animationBG)} />)

      } else if (this.state.imgmax1 <= i) {
        console.log("res")
        this.state.arrImage.push(<Image style={{ tintColor: this.state.isonPress == true ? '#EB51DA' : '#24192A', height: 55, width: 65, resizeMode: 'contain' ,alignSelf:'center' }} source={require(I_animationBG)} />)
      }
      else {
        this.state.arrImage.push(<Image style={{ tintColor: this.state.isonPress == true ? '#6CF8FB' : '#24192A', height: 35, width: 45, resizeMode: 'contain' ,alignSelf:'center' }} source={require(I_animationBG)} />)
      }

    }

    return this.state.arrImage
  }
  render() {

    return (
      <View style={Styles.container}>
        <ImageBackground style={Styles.Main_Back} source={require(I_BackgroundImage)} >
          <View style={Styles.View_Header}>
            <ImageBackground style={Styles.Main_ImgView} source={require(I_RoundedBG)} >
              <View>
                <Text style={Styles.txt_Header1}>YOUR SCORE IS</Text>
                <Text style={Styles.txt_Header2}>156 CM</Text>
              </View>
              <View style = {{ width:200 , top:60 ,bottom:0 , alignSelf:'center' , position:'absolute' , justifyContent:'center'}}>
                <View style = {{alignSelf:'center' ,alignContent:'center'}}>
                {
                this.barimage()
              }
                </View>
              </View>
              <View style={Styles.view_Share}>
                <TouchableOpacity onPress ={() => this.Go_Start_Record()}>
                  <ImageBackground style={Styles.img_Share_Back} source={require(I_Share_Back)}>
                    <Image style={Styles.img_Share_icon} source={require(I_share)}></Image>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </ImageBackground>

            <View style={Styles.view_Share1}>
              <Text style={Styles.txt_Share}>SHARE WITH YOUR FRIENDS</Text>
            </View>
          </View>


          <View style={Styles.View_Bottom}>
            <View>
              <TouchableOpacity style={Styles.btn_bottom} >
                <ImageBackground style={Styles.img_Bottom_BG} source={require(I_Try_Again_BG)}>
                  <View style={Styles.View_Bottom1}>
                    <Image style={Styles.img_Bottom_icon} source={require(I_Try_Again_Icon)}></Image>
                    <Text style={Styles.txtBottombtn}>TRY AGAIN</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View >
              <TouchableOpacity style={Styles.btn_bottom} >
                <ImageBackground style={Styles.img_Bottom_BG} source={require(I_Close_BG)}>
                  <View style={Styles.View_Bottom1}>
                    <Image style={Styles.img_Bottom_icon} source={require(I_Close_Icon)}></Image>
                    <Text style={Styles.txtBottombtn}>TRY AGAIN</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});