export function parseCoordinates(input) {
  let str = input.trim();

  if (str.startsWith('[') && str.endsWith(']')) {
    str = str.slice(1, -1).trim();
  }

  const parts = str.split(',');
  if (parts.length !== 2) {
    throw new Error('Неверный формат координат. Ожидалось: широта, долгота');
  }

  const latitude = parseFloat(parts[0].trim());
  const longitude = parseFloat(parts[1].trim());
  
  if (latitude < -90 || latitude > 90) {
    throw new Error('Широта должна быть в диапазоне от -90 до 90');
  }
  
  if (longitude < -180 || longitude > 180) {
    throw new Error('Долгота должна быть в диапазоне от -180 до 180');
  }

  return { latitude, longitude };
}