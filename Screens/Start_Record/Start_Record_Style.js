import React, { Fragment, Component } from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import COLORS from '../../Resources/Colors';
import { Left, View, Right } from 'native-base';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const { width, height } = Dimensions.get('window')


export const Styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    Main_Back: {
        width: '100%',
        height: '100%',
    },
    View_Header: {
        paddingHorizontal: 30,
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'center'

    },
    HeaderViewText: {
        //  backgroundColor: COLORS.white,
        position: 'absolute',
        alignSelf: 'center',
    },
    txtHeader: {
        fontSize: 22,
        lineHeight: 30,
        fontStyle: 'normal',
        alignSelf: 'center',
        paddingTop: "9%",
        color: COLORS.txtGray
    },
    imgMik: {
        width: width * 0.46,
        height: height * 0.55,
        resizeMode:'stretch',
        //paddingBottom:50,
        //flex:1,
       // position:'absolute'
    },
    Img_SecBG: {
        width:80,
        height:80 ,
        top:0,
        alignSelf:'center',
    },
    txtHeader1: {
        fontSize: 22,
        lineHeight: 30,
        fontStyle: 'normal',
        alignSelf: 'center',
        color: COLORS.sky
    },
    txtSEC: {
        paddingHorizontal:10,
        fontSize: 23,
        lineHeight: 22,
        fontStyle: 'normal',
        color: COLORS.sky,
        position:'absolute',
        alignSelf:'center',
        textAlign:'center',
        width:80
    },
    txtSEC1: {
        fontSize: 17,
       
    },
    ViewBottom: {
        // backgroundColor:COLORS.white,
        position: 'absolute',
        bottom: -22,
        justifyContent: 'center',
        alignSelf: 'center',
        width: width * 0.95,
        height: height * 0.23
    },
    imeBottom: {
        alignSelf: 'center',
        width: '93%',
        height: '83%',
        resizeMode:'stretch'
    },
    txtBottom: {
        fontSize: 35,
        lineHeight: 35,
        fontStyle: 'normal',
        alignSelf: 'center',
        color: COLORS.white,
    },
    ViewCenter: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 20,
        top:height * 0.25,
        position:'absolute',
        paddingHorizontal: 10,
       
    },
    ViewSubCenter: {
        flexDirection: 'column',
       // justifyContent:'',
      //  backgroundColor:COLORS.sky,
    }


})
