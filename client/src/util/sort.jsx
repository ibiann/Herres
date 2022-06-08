export const mapOrder = (array, order, key) => {
  console.log({ array, order, key });
  let sortedArray = [...array].sort((a, b) => {
    console.log(order.indexOf(a[key]), order.indexOf(b[key]));
    return order.indexOf(a[key]) - order.indexOf(b[key]);
  });
  return sortedArray;
};
