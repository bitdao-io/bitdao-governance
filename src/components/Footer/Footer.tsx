import React from "react";
import * as IMAGES from '../../constant/Images'

export default function Footer() {
  return (
    <div className={styles.container}>
        <a className={styles.option} target="_blank" href={`${process.env.REACT_APP_BITDAO_DISCORD}`}>
          Discord
        </a>
        <a className={styles.option} target="_blank" href={`${process.env.REACT_APP_BITDAO_GOVERNANCE}`}>
          Governance Forum
        </a>
        <a className={styles.option} target="_blank" href={`${process.env.REACT_APP_BITDAO_SNAPSHOT}`}>
          Snapshot Voting
        </a>
        <a className={styles.option} target="_blank" href={`${process.env.REACT_APP_BITDAO_DOCS}`}>
          Docs
        </a>
        <img src={IMAGES.ENLanguage} className="w-12 h-5 iphone:w-20 iphone:h-7 iphone:mx-4 iphone:w-18 iphone:h-7 iphone:-mt-1 iphone:mx-10" />
    </div>
  );
}

const styles = {
  container:'w-screen grid grid-cols-5 iphone:py-5 iphone:flex iphone:flex-row iphone:justify-center font-mono iphone:text-gray',
  option:'text-xs overflow-hidden text-center iphone:px-10 iphone:text-lg'
}
