import React, {Component} from 'react';
import {Image, ImageBackground} from 'react-native';
import styles from './styles';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
      this.tick()    
  }
  tick =() => {
    setTimeout(async () => {
      this.props.navigation.navigate('Bluetooth_connect_Screen')
    }, 1500);
  }
  render() {
    return (
      <ImageBackground
        style={styles.ibBackgound}
        source={require('./bg_splash.png')}>
        <ImageBackground
          style={styles.ibOuterLogo}
          source={require('./ic_outer_logo.png')}>
          <Image style={styles.iLogoText} source={require('./ic_logo.png')} />
        </ImageBackground>
      </ImageBackground>
    );
  }
}
export default SplashScreen;
