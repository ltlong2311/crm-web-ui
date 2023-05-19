export const calcOrderTotalAmount = (orderProducts: any) => {
  if(!orderProducts?.length) return 0;
  const totalAmount = orderProducts?.reduce((prev: any, cur: any) => {
    return prev + cur?.cost * cur?.quantity;
  }, 0);
  return totalAmount;
};
