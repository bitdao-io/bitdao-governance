const handleNumberFormat = (number: any) => {
  const splitbal = number.toString().split(".");
  const toformatfun = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const toformat = toformatfun.format(Number(splitbal[0]));
  if (splitbal[1] === undefined) {
    const formatedBal = toformat.toString().split(".")[0].split("$")[1];
    return formatedBal;
  } else {
    const formatedBal =
      toformat.toString().split(".")[0].split("$")[1] + "." + splitbal[1];

    return formatedBal;
  }
};

export default handleNumberFormat;