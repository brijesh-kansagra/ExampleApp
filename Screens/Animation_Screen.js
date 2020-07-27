
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
    FlatList
} from 'react-native';

import COLORS from '../Resources/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const I_BackgroundImage = '../Images/Background/BackGroudSCR.png'
const I_RoundedBG = '../Images/Rounded_BG_Shape/Rounded_BG_Shape.png'
const I_Logo_H = '../Images/Logo_Himalaya/Logo_Himalaya.png'
const I_Logo_Splash = '../Images/Colorfull_Splash/Colorfull_Splash.png'
const I_Fountain1 = '../Images/Fountain1/Fountain1.png'
const I_Fountain2 = '../Images/Fountain2/Fountain2.png'
const I_Fountain3 = '../Images/Fountain3/Fountain3.png'
const I_Connect_Fountain = '../Images/Connect_Fountain/Connect_Fountain.png'
const DATA = [
    {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
    }, {
        id: 3,
    },
    {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
    }, {
        id: 3,
    }, {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
    }, {
        id: 3,
    }
]
export default class Animation_Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 5,
            flatArrat: [],
        };

    };
    componentDidMount() {
        var newarray = []
        for (let index = 0; index < 30; index++) {
            var dict = {
                id : index
            }
            newarray.push(dict)
            console.log("element" , index)
            // this.state.DATA.push(id:index)
        }
        this.setState ({
            flatArrat : newarray
        })
        for (let index = 0; index < this.state.flatArrat; index++) {
            const element = this.state.flatArrat[index];
            console.log("Get inder" , element.id)
            
        }
    }
    Go_Score() {
        this.props.navigation.navigate('Score_Screen')
    }
    renderRow = ({ item, index }) => {

        return (
            <View>
                <View style={{ height: 5, paddingTop: 2 }}>
                    <View style={{ height: 3, backgroundColor: (this.state.count < index) ? COLORS.sky : COLORS.white }}>
        <Text style = {{color:COLORS.white}}>{item.id}</Text>
                    </View>
                </View>
            </View>

        )
    }
    render() {
        const {
            flatArrat
        } = this.setState;
        console.log("Flattttt" , this.state.flatArrat.length)
        return (
            <View style={Styles.container}>
                <StatusBar barStyle="light-content" />
                <ImageBackground style={Styles.Main_Back} source={require(I_BackgroundImage)} >
                    <View style={{
                        // backgroundColor: COLORS.red, justifyContent: 'center',
                        alignItems: 'center', height: 500
                    }}>
                        <FlatList style={{ width: 50 }}
                            data={flatArrat}
                            renderItem={this.renderRow}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ImageBackground>

            </View>
        )

    }
}

export const Styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    Main_Back: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})