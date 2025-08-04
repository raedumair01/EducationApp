import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function MenuSvg({ size = 20, color = '#000' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 15" fill="none">
      <Path
        d="M0.36377 0.727539H16.1041V2.47647H0.36377V0.727539ZM0.36377 6.84879H10.8574V8.59772H0.36377V6.84879ZM0.36377 12.97H16.1041V14.719H0.36377V12.97Z"
        fill={color}
      />
    </Svg>
  );
}
