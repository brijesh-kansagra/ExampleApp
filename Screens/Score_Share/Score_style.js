import React, { Fragment, Component } from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import COLORS from '../../Resources/Colors';
const { width, height } = Dimensions.get('window')


export const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    Main_Back: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',

    },
    Main_View: {
        height: 60,
        width: 70,

    },
    View_Header: {
        position: 'absolute',
        top: 40,
        alignSelf: "center",
        width: "85%",
        height: "59%",
    },
    Main_ImgView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: "100%",
        width: "100%",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    txt_Header1: {
        fontSize: 30,
        lineHeight: 30,
        fontStyle: 'normal',
        alignSelf: 'center',
        paddingTop: "18%",
        color: COLORS.white
    },
    txt_Header2: {
        fontSize: 40,
        lineHeight: 43,
        fontStyle: 'normal',
        alignSelf: 'center',
        color: COLORS.white
    },
    view_Share: {
        height: 70,
        width: 70,
        alignSelf: 'center',
       // backgroundColor: COLORS.red
    },
    img_Share_Back:
    {
        height: "100%",
        width: "100%",
        justifyContent: 'center'
    },
    img_Share_icon: {
        height: 35,
        width: 32,
        alignSelf: 'center',
    },
    view_Share1: {
        alignSelf: 'center',
        paddingTop: 10
    },
    txt_Share: {
        color: COLORS.white,
        fontStyle: 'normal',
        fontSize: 18
    },
    View_Bottom: {
        flexDirection: 'column',
        alignSelf: "center",
        position: 'absolute',
        bottom: 30
    },
    btn_bottom: {
        height: 60,
        width: 250
    },
    img_Bottom_BG: {
        height: null,
        width: null,
        flex: 1,
        justifyContent: 'center'
    },
    View_Bottom1: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    img_Bottom_icon: {
        height: 18,
        width: 16
    },
    txtBottombtn: {
        color: COLORS.white,
        fontStyle: 'normal',
        fontSize: 14,
        left: 10

    }


})
