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
        //   backgroundColor:COLORS.white,
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
        width: width * 0.42,
        height: height * 0.58,
        resizeMode:'stretch',
        //bottom:0,
       // position:'absolute'
    },
    Img_SecBG: {
        width:80,
        height:80 ,
        alignSelf:'center'
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
        bottom: -18,
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
        position: 'absolute',
    },
    ViewCenter: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position:'absolute',
        bottom: 10,
        paddingHorizontal: 10,
        alignSelf:'center',
     //   backgroundColor: COLORS.white
    },
    ViewSubCenter: {
        flexDirection: 'column',
        justifyContent:'space-between',
      //  backgroundColor:COLORS.sky,
    }


})
