import { utils } from 'ethers';
import { useState, useEffect } from 'react';

const UseEnsAddress = async (provider: any, ens: string) => {
  try {
    const ensAddress = await provider.resolveName(ens);
    return ensAddress;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export default UseEnsAddress