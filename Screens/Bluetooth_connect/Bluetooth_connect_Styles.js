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
        // backgroundColor: 'Red',
    },

    Main_Back: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
       
    },
    Main_View: {
        width: width * 0.7,
        height: height * 0.5,
        alignSelf: 'center',
    },
    Main_ImgView: {
        height: '100%',
        width: '100%',
        flex:1
    },
    View_One: {
        paddingHorizontal:30,
        paddingVertical:40,
        flex:1 ,
         flexDirection:'column' , 
       // justifyContent:"space-between",
       // backgroundColor:COLORS.red
    },
    View_Two:
    {
       // backgroundColor:COLORS.white,
        paddingTop: "12%",
        justifyContent: 'center'
    },
    View_Three:
    {
      //  backgroundColor:COLORS.red,
        justifyContent: 'center',
        paddingTop: "15%",
        flexDirection: 'column'
    },
    txtBluetooth: {
        color: COLORS.white,
        alignSelf: 'center',
        fontSize: 20,
        lineHeight: 20,
        fontStyle: 'normal'
    },
    
    txtDesc: {
        paddingTop:10,
        paddingHorizontal: 20,
        color: COLORS.gray,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 16,
        fontStyle: 'normal'
    },
    View_Fifth: {
        justifyContent: 'center',
    },
    View_TurnOn: {
        position:'absolute',
        justifyContent: 'center',
        alignSelf:'center',
        bottom:"13%",        
    },
    img_TurnOn: {
        height: 60,
        width: 165,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    txtTurnOn: {
        fontSize: 14,
        lineHeight: 14,
        fontStyle: 'normal',
        color: COLORS.white,
        textAlign: 'center'
    },
    View_Bottom: {
        bottom: 30,
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center'
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
        color: COLORS.red,
    }


})
