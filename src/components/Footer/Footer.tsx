import React from "react";
import * as IMAGES from '../../constant/Images'

export default function Footer() {
  return (
    <div className="py-5 flex flex-row justify-center font-mono text-gray">
        <a className='mx-10' target="_blank" href={`${process.env.REACT_APP_BITDAO_DISCORD}`}>
          Discord
        </a>
        <a className='mx-10'target="_blank" href={`${process.env.REACT_APP_BITDAO_GOVERNANCE}`}>
          Governance Forum
        </a>
        <a className='mx-10'target="_blank" href={`${process.env.REACT_APP_BITDAO_SNAPSHOT}`}>
          Snapshot Voting
        </a>
        <a className='mx-10'target="_blank" href={`${process.env.REACT_APP_BITDAO_DOCS}`}>
          Docs
        </a>
        <img src={IMAGES.ENLanguage} className="w-18 h-7 -mt-1 mx-10" />
    </div>
  );
}