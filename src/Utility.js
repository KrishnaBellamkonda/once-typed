// Utility functions
export const countNumberOfCharacters = (string) => {
  const noSpaceString = string.replace(/\s/g, "");
  return noSpaceString.length;
};

export const countUniqueWords = (str) => {
  const words = str.toLowerCase().split(/[^\w]+/);
  const uniqueWords = new Set(words);
  return uniqueWords.size;
};


export const findAverage = (numbers)=>{
  if (numbers.length === 0) {
    return 0;
  }

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const average = sum / numbers.length;

  return average;
}

export const roundToDecimalPlaces = (num, decimalPlaces)=>{
  const factor = 10 ** decimalPlaces;
  return Math.round(num * factor) / factor;
}

export const formatDate= (timestamp)=> {
  const date = new Date(timestamp);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = days[date.getDay()];
  const time = date.toLocaleTimeString();
  const month = date.toLocaleString('default', { month: 'long' });
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  return [`${dayOfMonth} ${month} ${year}`, `${day}`, `${time}`];
}
