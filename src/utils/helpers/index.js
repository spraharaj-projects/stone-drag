export const checkPoints = {
  '22x24': {
    visited: false,
    x: 22,
    y: 24,
  },
  '17x9': {
    visited: false,
    x: 17,
    y: 9,
  },
  '40x8': {
    visited: false,
    x: 40,
    y: 8,
  },
  '38x22': {
    x: 38,
    y: 22,
  },
  '13x31': {
    x: 13,
    y: 31,
  },
  '14x46': {
    x: 14,
    y: 46,
  },
  '32x42': {
    x: 32,
    y: 42,
  },
  '50x46': {
    x: 50,
    y: 46,
  },
  '47x13': {
    x: 47,
    y: 13,
  },
  '51x13': {  
    x: 51,
    y: 13,
  },
}

const mapData = {
  minX: 6,
  maxX: 52,
  minY: 8,
  maxY: 47,
  blockedSpaces: {
    '6x18': true,
    '8x18': true,
    '10x18': true,
    '12x18': true,
    '14x18': true,
    '16x18': true,
    '16x16': true,
    '16x14': true,
    '16x12': true,
    '16x10': true,
    '16x8': true,
    '7x25': true,
    '9x25': true,
    '11x25': true,
    '13x25': true,
    '15x25': true,
    '17x25': true,
    '19x25': true,
    '21x25': true,
    '23x25': true,
    '23x23': true,
    '23x21': true,
    '23x19': true,
    '23x17': true,
    '23x15': true,
    '24x14': true,
    '26x14': true,
    '28x14': true,
    '30x14': true,
    '32x14': true,
    '34x14': true,
    '35x15': true,
    '35x17': true,
    '35x19': true,
    '35x21': true,
    '35x23': true,
    '35x25': true,
    '35x27': true,
    '35x29': true,
    '33x29': true,
    '31x29': true,
    '29x29': true,
    '27x29': true,
    '25x29': true,
    '23x29': true,
    '21x29': true,
    '19x29': true,
    '17x29': true,
    '15x29': true,
    '13x29': true,
    '12x30': true,
    '12x32': true,
    '12x34': true,
    '12x36': true,
    '12x38': true,
    '12x40': true,
    '12x42': true,
    '12x44': true,
    '12x46': true,
    '46x8': true,
    '46x10': true,
    '46x12': true,
    '46x14': true,
    '46x16': true,
    '46x18': true,
    '46x20': true,
    '46x22': true,
    '46x24': true,
    '46x26': true,
    '46x28': true,
    '46x30': true,
    '46x32': true,
    '46x34': true,
    '46x36': true,
    '46x38': true,
    '46x40': true,
    '45x41': true,
    '43x41': true,
    '41x41': true,
    '39x41': true,
    '37x41': true,
    '35x41': true,
    '33x41': true,
    '31x41': true,
    '29x41': true,
    '27x41': true,
    '25x41': true,
    '23x41': true,
    '21x41': true,
    '19x41': true,
    '19x39': true,
    '19x37': true,
    '21x37': true,
    '23x37': true,
    '25x37': true,
    '27x37': true,
    '29x37': true,
    '31x37': true,
    '33x37': true,
    '35x37': true,
    '37x37': true,
    '39x37': true,
    '41x37': true,
    '42x36': true,
    '42x34': true,
    '42x32': true,
    '42x30': true,
    '42x28': true,
    '42x26': true,
    '42x24': true,
    '42x22': true,
    '42x20': true,
    '42x18': true,
    '42x16': true,
    '42x14': true,
    '42x12': true,
    '42x10': true,
    '42x8': true,
  },
}

const safeSpots = [
  { x: 1, y: 4 },
  { x: 2, y: 4 },
  { x: 1, y: 5 },
  { x: 2, y: 6 },
  { x: 2, y: 8 },
  { x: 2, y: 9 },
  { x: 4, y: 8 },
  { x: 5, y: 5 },
  { x: 5, y: 8 },
  { x: 5, y: 10 },
  { x: 5, y: 11 },
  { x: 11, y: 7 },
  { x: 12, y: 7 },
  { x: 13, y: 7 },
  { x: 13, y: 6 },
  { x: 13, y: 8 },
  { x: 7, y: 6 },
  { x: 7, y: 7 },
  { x: 7, y: 8 },
  { x: 8, y: 8 },
  { x: 10, y: 8 },
  { x: 8, y: 8 },
  { x: 11, y: 4 },
]

const namePrefix = [
  'COOL',
  'SUPER',
  'HIP',
  'SMUG',
  'COOL',
  'SILKY',
  'GOOD',
  'SAFE',
  'DEAR',
  'DAMP',
  'WARM',
  'RICH',
  'LONG',
  'DARK',
  'SOFT',
  'BUFF',
  'DOPE',
]

const animals = [
  'BEAR',
  'DOG',
  'CAT',
  'FOX',
  'LAMB',
  'LION',
  'BOAR',
  'GOAT',
  'VOLE',
  'SEAL',
  'PUMA',
  'MULE',
  'BULL',
  'BIRD',
  'BUG',
]

const playerColors = ['blue', 'red', 'orange', 'yellow', 'green', 'purple']

export const isSolid = (x, y) => {
  console.log('----------->', x, y)
  const blockedNextSpace = mapData.blockedSpaces[getKeyString(x, y)]
  return (
    blockedNextSpace ||
    x >= mapData.maxX ||
    x < mapData.minX ||
    y >= mapData.maxY ||
    y < mapData.minY
  )
}

export const getRandomSafeSpot = () => {
  return randomFromArray(safeSpots)
}

export const randomFromArray = array => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getKeyString = (x, y) => {
  return `${x}x${y}`
}

export const createName = () => {
  const prefix = randomFromArray(namePrefix)
  const animal = randomFromArray(animals)
  return `${prefix} ${animal}`
}

export const createRandomColor = () => {
  return randomFromArray(playerColors)
}

export const getPlayerColorIndex = color => {
  return playerColors.indexOf(color)
}

export const getNextColor = index => {
  return playerColors[index + 1] || playerColors[0]
}
