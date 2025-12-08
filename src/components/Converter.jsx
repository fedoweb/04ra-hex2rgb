import React, { useState, useEffect } from 'react';
//import './Converter.css';

const Converter = () => {
  const [hexValue, setHexValue] = useState('#');
  const [rgbValue, setRgbValue] = useState('rgb(255, 255, 255)');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('Цвет');

  // Проверка HEX-кода
  const isValidHex = (hex) => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    return hexRegex.test(hex);
  };

  // Конвертация HEX в RGB
  const hexToRgb = (hex) => {
    // Убираем решетку
    hex = hex.replace('#', '');
    
    // Разбиваем на компоненты
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Обработчик изменения input
  const handleHexChange = (e) => {
    const value = e.target.value;
    
    // Автоматически добавляем решетку в начале
    let newValue = value;
    if (!value.startsWith('#')) {
      newValue = '#' + value.replace('#', '');
    }
    
    // Ограничиваем длину (максимум 7 символов: # + 6 hex)
    if (newValue.length > 7) {
      newValue = newValue.substring(0, 7);
    }
    
    setHexValue(newValue);
  };

  // Проверяем введенное значение при каждом изменении
  useEffect(() => {
    if (hexValue.length === 7) {
      if (isValidHex(hexValue)) {
        const rgb = hexToRgb(hexValue);
        setRgbValue(rgb);
        setBackgroundColor(hexValue);
        setError(false);
        setMessage(rgb);
      } else {
        setError(true);
        setMessage('Ошибка');
        setBackgroundColor('#ff0000'); // Красный фон при ошибке
      }
    } else {
      setMessage('Цвет');
      setError(false);
      setBackgroundColor('#ffffff'); // Белый фон по умолчанию
    }
  }, [hexValue]);

  // Обработчик потери фокуса - добавляем недостающие символы нулями
  const handleBlur = () => {
    if (hexValue.length > 1 && hexValue.length < 7) {
      const withoutHash = hexValue.replace('#', '');
      const padded = withoutHash.padEnd(6, '0');
      setHexValue('#' + padded);
    }
  };

  return (
    <div className="converter" style={{ backgroundColor: backgroundColor }}>
      
      <div className="converter-container">
        <div className="input-section">
          <label htmlFor="hex-input" className="input-label">
            HEX-цвет:
          </label>

          <input
            id="hex-input"
            type="text"
            className={`hex-input ${error ? 'error' : ''}`}
            value={hexValue}
            onChange={handleHexChange}
            onBlur={handleBlur}
            placeholder="#000000"
            maxLength="7"
            autoComplete="off"
          />
        </div>

        {hexValue.length === 7 && !error && (
          <div className="rgb-result">{rgbValue}</div>
        )}
      </div>
    </div>
  );
};

export default Converter;