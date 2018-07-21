const arrayFromRange = (min, max) => {
  output = [];
  for (let i = min; i <= max; i++) {
    output.push(i);
  }
  return output;
};

const includes = (array, searchElement) =>
  array.some(value => value == searchElement);

// Returns array without input excluded value
const except = (array, excluded) => {
  const output = [];
  for (let element of array) {
    if (!excluded.includes(element)) {
      output.push(element);
    }
  }
  return output;
};

const move = (array, index, offset) => {
  const position = index + offset;

  if (position >= array.length || position < 0) {
    console.error("Invalid Offset");
    return;
  }

  const output = [...array];
  const element = output.splice(index, 1)[0];
  output.splice(index + offset, 0, element);
  return output;
};
