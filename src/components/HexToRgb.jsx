import { useState, useEffect } from 'react';
import converter from './converter';
import validator from './validator';

const HexToRgb = () => {
  const [hexValue, setHexValue] = useState('');
  const [rgbValue, setRgbValue] = useState('rgb(255, 255, 255)');
  const [backgroundColor, setBackgroundColor] = useState('#fff');

  const handleHexChange = (e) => {
    const value = e.target.value.trim(); // получаем очищённое значение

    if (value.length > 7) {
      return;
    }

    setHexValue(value);
  };


  useEffect(() => {
    if (hexValue.length === 7) {

      if (validator(hexValue)) {
        const rgb = converter(hexValue);
        setRgbValue(rgb);
        setBackgroundColor(hexValue);

      } else {
        setRgbValue('Ошибка!');
        setBackgroundColor('#e9414fff');
      }
    } else {

      setBackgroundColor('#fff');
      setRgbValue('Введите код');
    }
  }, [hexValue]);

  return (
    <div className="converter" style={{ backgroundColor: backgroundColor }}>
      <div className="converter-container">

        <input
            id="hex-input"
            type="text"
            className={'hex-input'}
            value={hexValue}
            onChange={handleHexChange}
            placeholder="#000000"
            maxLength="7"
            autoComplete="off"
          />

        <div className="rgb-result">{rgbValue}</div>

      </div>
    </div>
  );
};

export default HexToRgb;