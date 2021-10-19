import { utils } from 'ethers';
import { useState, useEffect } from 'react';


const UseAddressEns = async (provider: any, address: string) => {
  // console.log(provider, address, utils.isAddress(address));
  // console.log(utils)
  if (utils.isAddress(address)) {
    try {
      // Accuracy of reverse resolution is not enforced.
      // We then manually ensure that the reported ens name resolves to address
      const reportedName = await provider.lookupAddress(address);
  
      const resolvedAddress = await provider.resolveName(reportedName);
  
      if (address && utils.getAddress(address) === utils.getAddress(resolvedAddress)) {
        return reportedName;
      } else {
        return utils.getAddress(address);
      }
    } catch (e) {
      return utils.getAddress(address);
    }
  }
  return null;
}
export default UseAddressEns