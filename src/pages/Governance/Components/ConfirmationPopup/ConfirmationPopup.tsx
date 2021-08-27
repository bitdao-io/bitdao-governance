import React from "react";
import Modal from "@material-ui/core/Modal";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import * as IMAGES from '../../../../constant/Images'

type ModalProps = {
  open: any;
  handleClose: any;
  delegatingToAddr: any;
  txHash: any;
  votesDelegated: any;
  delegationClicked: any;
  pendingTx: any;
  confirmedTx: any;
};

export default function ConfiramtionPopup({
  open,
  handleClose,
  delegatingToAddr,
  txHash,
  votesDelegated,
  delegationClicked,
  pendingTx,
  confirmedTx,
}: ModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{ marginLeft: "27%", marginTop: "15%" }}
    >
      <div className="w-650px rounded-xl bg-white ">
        <div className=" py-7 text-center">
          <text className="text-lightBlue font-mono text-lg px-48">
            Confirm Transaction
          </text>
          <button
            onClick={() => {
              handleClose();
            }}
          >
            <text className="ml-5 text-gray text-2xl">x</text>
          </button>
        </div>
        <hr />
        <div className="flex flex-col text-center py-5">
          <text className="text-lightBlue font-mono text-lg mb-2">
            {votesDelegated} Votes
          </text>
          <text className="text-black font-mono text-lg ">
            Delegating to{" "}
            {delegatingToAddr.slice(0, 4) + "..." + delegatingToAddr.slice(-4)}{" "}
          </text>
          <div className="mx-auto my-3">
            {confirmedTx ? (
              <CheckCircleIcon style={{ color: "green", fontSize: "35px" }} />
            ) : (
              <img src={IMAGES.BitDaoLogo} className="w-14" />
            )}
          </div>
          <text className="text-gray">
            {delegationClicked
              ? "Confirm the transaction"
              : "Transaction Broadcast"}
          </text>
          <div className="px-7 my-5">
            <button className="bg-red rounded-xl w-full py-4">
              <a
                href={`${process.env.REACT_APP_ETHERSCAN}${txHash}`}
                target="_blank"
              >
                <text className='text-lg text-white'>View on Etherscan</text>
              </a>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}