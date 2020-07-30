import {StyleSheet} from 'react-native';
import StyleConfig from './StyleConfig';

const styles = StyleSheet.create({
  ibBackgound: {
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
    width: '100%',
  },
  ibOuterLogo: {
    height: StyleConfig.countPixelRatio(350),
    width: StyleConfig.countPixelRatio(350),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iLogoText: {
    marginEnd: StyleConfig.smartWidthScale(20),
    height: StyleConfig.countPixelRatio(160),
    width: StyleConfig.countPixelRatio(160),
    resizeMode: 'contain',
  },
});

export default styles;
