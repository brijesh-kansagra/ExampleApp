import React from 'react';
import {
    NativeModules,
    LayoutAnimation,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Animated,
    Image
} from 'react-native';

import AnimatableProgressBar from '../Resources/AnimatableProgressBar';
const I_RoundButton = '../Images/Fountain.png'

export default class Animation_Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TotalLeagth: 40,
            imageLeanght:11,
            minCount: 5,
            maxCount: 15,
            arrView: [],
            arrImage: [],
            imgmax:5,
            imgmax1:8,
            imgMin :2,
            isonPress: false
        };

    };
   
   

    componentDidMount()
    {
    }
    baranimation() {
        

        this.state.arrView = []
       
        for (var i = 0; i < this.state.TotalLeagth; i++) {
            if (this.state.minCount < i && this.state.maxCount > i && this.state.isonPress == true) {
                console.log("pinkkk")
                this.state.arrView.push(<View style={{
                    backgroundColor: 'red', height: 5,
                    width: '100%', marginTop: 2
                }} />)
            } else if (this.state.maxCount < i && this.state.isonPress == true) {
                console.log("res")
                this.state.arrView.push(<View style={{
                    backgroundColor: '#EB4FD0', height: 5,
                    width: '100%', marginTop: 2
                }} />)
            }
            else {
                this.state.arrView.push(<View style={{
                    backgroundColor: 'gray', height: 5,
                    width: '100%', marginTop: 2
                }} />)

            }
        }
        return this.state.arrView

    }
    barimage() {
        

        this.state.arrImage = []
       
        for (var i = 0; i < this.state.imageLeanght; i++) {
            if (this.state.imgMin <= i && this.state.imgmax >= i) {
                console.log("pinkkk")
                this.state.arrImage.push(<Image style ={{tintColor:this.state.isonPress == true ?'#70A9EE' :'pink' , height:45 , width:55 , resizeMode:'contain'}} source = {require(I_RoundButton)}/>)

            } else if (this.state.imgmax <= i && this.state.imgmax1 >= i  ) {
                console.log("res")
                this.state.arrImage.push(<Image style ={{tintColor:this.state.isonPress == true ?'#BB71E0' :'pink' , height:55 , width:65 ,resizeMode:'contain'}} source = {require(I_RoundButton)}/>)

            }else if (this.state.imgmax1 <= i ) {
                console.log("res")
                this.state.arrImage.push(<Image style ={{tintColor:this.state.isonPress == true ?'#EB51DA' :'pink' , height:55 , width:65 ,resizeMode:'contain'}} source = {require(I_RoundButton)}/>)

            }
            else {
                this.state.arrImage.push(<Image style ={{tintColor:this.state.isonPress == true ?'#6CF8FB' :'pink' , height:35 , width:45 ,resizeMode:'contain'}} source = {require(I_RoundButton)}/>)
           }

        }
        
        return  this.state.arrImage
    }

    render() {

       
        return (
            <View style={styles.container}>
                
                <TouchableOpacity style={{ height: 60 }} onPress={() => this.setState({ minCount: 5, maxCount: 25, isonPress: true })} >
                    <Text> add animation </Text>
                </TouchableOpacity>
                {/* <AnimatableProgressBar
          current={100}
          maximum={150}
          width={600}
          borderColor='white'
          height={50}
          borderRadius={30}
          borderWidth={2}
          minimum={20}
          backgroundColor='red'
          type="increase"
          lineBackgroundColor='gray'
          textColor='white'
          interval={800}
          
        /> */}
        <View style ={{flexDirection:'row'}}>
                {/* <View style={{ height: 100, width: 40,right:50 }}>
                    {
                        this.baranimation()
                    }
                </View> */}
                <View>
                    {
                        this.barimage()
                    }
                </View>
                                {/* //<Image style ={{height: 40, width: 40 , tintColor:'blue' }} source = {require(I_RoundButton)} ></Image> */}

            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    box: {
        width: 200,
        height: 200,
        backgroundColor: 'red',
    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});