const handleIntegerFormat = (number: any) => {
  const numberFormat = new Intl.NumberFormat("en-US").format(parseInt(number));
  return numberFormat;
};

export default handleIntegerFormat;
