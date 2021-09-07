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
        <img src={IMAGES.ENLanguage} className="w-18 h-7 mx-4 ipad:w-18 h-7 -mt-1 mx-10" />
    </div>
  );
}

const styles = {
  container:'w-screen ipad:py-5 ipad:flex ipad:flex-row ipad:justify-center ipad:font-mono ipad:text-gray',
  option:'ipad:mx-10'
}