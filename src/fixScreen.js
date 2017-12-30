import {
    Dimensions,
    PixelRatio,
} from 'react-native';


export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例

let pixelRatio = PixelRatio.get();      //当前设备的像素密度
const defaultPixel = 2;                           //iphone5s的像素密度


//px转换成dp
const w2 = 640 / defaultPixel;
const h2 = 1136 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例


export function setSpText( size ) {
    size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
    return size / defaultPixel;
}

export function scaleSize( size ) {

    size = Math.round(size * scale + 0.5);
    return size / defaultPixel;
}

export function px2dp( size ) {
    return size / pixelRatio;
  }

