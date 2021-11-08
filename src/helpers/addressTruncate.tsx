const addressTruncate = (address: string) => {
  const truncatedAddress = `${address.slice(0, 5)}...${address.slice(-5)}`;
  return truncatedAddress;
};

export default addressTruncate;