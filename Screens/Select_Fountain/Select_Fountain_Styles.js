import React, { Fragment, Component } from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import COLORS from '../../Resources/Colors';
import { Left } from 'native-base';


export const Styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    Main_Back: {
        width: '100%',
        height: '100%',
    },
    View_Main: {
        flexDirection: 'column',
        flex: 1
    },
    View_Header: {
       alignSelf:'center',
        top: '4%',
        height: 100,
        width:200
    },
    View_Splace: {
        paddingTop: '5%',
        height: 170
    },
    img_Splace: {
        width: '100%',
        height: '100%'
    },
    txt_Header1: {
        color: COLORS.white,
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 24,
        fontStyle: 'normal'
    },
    View_Main_Fountain: {
        top: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 22
    },
    View_Fountain: {
        alignItems: 'center'
    },
    txt_Fountain_2: {
        paddingTop: 8,
        fontSize: 15,
        lineHeight: 15,
        fontStyle: 'normal',
        color: COLORS.white
    },
    img_Fountain3: {
        height: 75,
        width: 75
    },
    txt_Fountain_3_Desc: {
        paddingTop: 5,
        fontSize: 12,
        lineHeight: 14,
        fontStyle: 'normal',
        color: COLORS.gray,
        width: 90,
         textAlign: 'center'
    },
    View_Connect_Fountain: {
        top: 0,
        height: 330,
        alignSelf: 'center',
        alignItems: "stretch",
        justifyContent:'center',
       // backgroundColor: COLORS.white
    },
    txt_Conneect: {
        width:'100%',
       // backgroundColor:COLORS.sky,
        color: COLORS.red,
        position: "absolute",
        textAlign: 'center',
        fontSize: 18
    },
    View_Bottom: {
        position: 'absolute',
        bottom: 30,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    txt_Fountain_1_3: {
        paddingTop: 25,
        fontSize: 15,
        lineHeight: 15,
        fontStyle: 'normal',
        color: COLORS.white
    },
    txtBy: {
        fontSize: 20,
        lineHeight: 20,
        fontStyle: 'normal',
        color: COLORS.white
    },
    txtBottom: {
        fontSize: 20,
        lineHeight: 20,
        fontStyle: 'normal',
        color: "#FF0000",
    }


})
