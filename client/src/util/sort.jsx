// export const mapOrder = (array, order, key) => {
//   console.log({ array, order, key });
//   let sortedArray = [...array].sort((a, b) => {
//     console.log(order.indexOf(a[key]), order.indexOf(b[key]));
//     return order.indexOf(a[key]) - order.indexOf(b[key]);
//   });
//   return sortedArray;
// };

export const mapOrder = (array, key) => {
  if (!array || !key) {
    return []
  }
  array.sort((a, b) => array.indexOf(a[key]) - array.indexOf(b[key]))
  return array
}
