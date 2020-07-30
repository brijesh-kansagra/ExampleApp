import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');
const isIphone = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const widthPer = width / 100;
const heightPer = height / 100;
const deviceType = width < 480 ? 'phone' : 'tablet';
const iPhoneX = Platform.OS === 'ios' && (height === 812 || height === 896);
const ratioCount = Math.sqrt(height * height + width * width) / 1000;
const pixelDensity = PixelRatio.get();

const isTablet = () => {
  if (isIphone) {
    return Platform.isPad;
  } else {
    return height / width <= 1.6;
  }
};

const APP_FONTS = {
  KARLA_REGULAR: 'Karla-Regular',
  KARLA_BOLD: 'Karla-Bold',
  KARLA_ITALIC: 'Karla-Italic',
  KARLA_BOLDITALIC: 'Karla-SemiBold',
};
export default {
  countPixelRatio: (size) => size * ratioCount,
  responsiveHeight: (size) => size * heightPer,
  responsiveWidth: (size) => size * widthPer,
  smartScale: (value) => {
    const tempHeight =
      Platform.OS === 'ios' ? (iPhoneX ? height - 78 : height) : height - 24;
    if (deviceType == 'phone') {
      return (value * tempHeight) / 667;
    }
    return (value * tempHeight) / 667;
  },
  smartWidthScale: (value) => {
    const tempWidth = width;
    if (deviceType == 'phone') {
      return (value * tempWidth) / 375;
    }
    return (value * tempWidth) / 375;
  },

  fontRegular: APP_FONTS.KARLA_REGULAR,
  fontBold: APP_FONTS.KARLA_BOLD,
  fontItalic: APP_FONTS.KARLA_ITALIC,
  fontBoldItalic: APP_FONTS.KARLA_BOLDITALIC,
  width,
  height,
  isPhone: !isTablet(),
  isTab: isTablet(),
  isIphone,
  isAndroid,
};
