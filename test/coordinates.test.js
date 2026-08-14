import { parseCoordinates } from '../src/coordinates.js';

describe('parseCoordinates', () => {
  test('must correctly parse coordinates in square brackets', () => {
    const input = '[51.50851, -0.12572]';
    const result = parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });
  
  test('it should correctly parse coordinates without a space after the comma', () => {
    const input = '51.50851,-0.12572';
    const result = parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });
  
  test('it should throw an error if the format is incorrect (not 2 parts)', () => {
    expect(() => parseCoordinates('51.50851')).toThrow('Неверный формат координат');
  });
  
  test('it should throw an error if the latitude is outside the range (-90...90)', () => {
    expect(() => parseCoordinates('91, 0')).toThrow('Широта должна быть в диапазоне от -90 до 90');
  });

  test('it should throw an error if the longitude is outside the range (-180...180)', () => {
    expect(() => parseCoordinates('0, -181')).toThrow('Долгота должна быть в диапазоне от -180 до 180');
  });
});