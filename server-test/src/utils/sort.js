export const mapOrder = (array, order, key) => {
  console.log({
    array,
    order,
    key,
  });
  let sortedArray = [...array].sort((a, b) => {
    return order.indexOf(a[key]) - order.indexOf(b[key]);
  });
  return sortedArray;
};
