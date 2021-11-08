const handleNumberFormat = (number: any) => {
  const numberFormat = new Intl.NumberFormat("en-US").format(Number(number));
  return numberFormat;
};

export default handleNumberFormat;