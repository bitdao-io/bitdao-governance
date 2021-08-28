import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";

type ModalProps = {
  open: any;
  handleClose: any;
  handleDelegateSubmit: any;
  ownAccount: any;
  handleMatchAddress: any;
  insufficientBal: any;
  delegationClicked: any;
};

export default function DelegateVoting({
  open,
  handleClose,
  handleDelegateSubmit,
  ownAccount,
  handleMatchAddress,
  insufficientBal,
  delegationClicked,
}: ModalProps) {
  const [delegationAddr, setDelegationAddr] = useState("");
  const [label, setLabel] = useState("");
  const [disable, setDisabled] = useState(true);
  const [nameLabel, setNameLabel] = useState({
    name: "",
    votingWeight: 0,
  });

  const validateAddress = (event: any) => {
    event.preventDefault();
    const addr = event.target.value;
    setDelegationAddr(addr);
    setNameLabel({
      name: "",
      votingWeight: 0,
    });
    if (addr.length < 42 || addr.length > 42) {
      setLabel("Invalid Address");
      setDisabled(true);
    } else {
      if (addr == ownAccount) {
        setDelegationAddr(addr);
        const result = handleMatchAddress(addr);
        setLabel("");
        setDisabled(false);
        setNameLabel({
          name: addr == ownAccount ? "You" : addr,
          votingWeight: result.toFixed(4),
        });
      } else {
        setDelegationAddr(addr);
        const result = handleMatchAddress(addr);
        setDisabled(false);
        setLabel("");
        setNameLabel({
          name: addr.slice(0, 4) + "..." + addr.slice(-4),
          votingWeight: result.toFixed(4),
        });
      }
    }
  };

  const handleOwnDegelationAddr = async () => {
    setDelegationAddr(ownAccount);
    const result = handleMatchAddress(ownAccount);
    setLabel("");
    setDisabled(false);
    setNameLabel({
      name: "You",
      votingWeight: result.toFixed(4),
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      // style={{ marginLeft: "28%", marginTop: "15%" }}
    >
      <div className="w-3/4 max-w-720px rounded-xl bg-white mx-auto mt-10%">
        <div className="py-7 text-center relative">
          <text className="text-lightBlue font-mono text-lg w-3/4">
            Delegate Voting
          </text>
          <button
            onClick={() => {
              handleClose();
            }}
            className='absolute right-5 top-7'
          >
            <text className="text-gray text-2xl">x</text>
          </button>
        </div>
        <hr />
        <div className="flex flex-col px-7 py-7">
          <text className="font-mono text-black text-lg">
            {" "}
            Select an Address
          </text>
          <text className="my-2 font-mono text-lg text-gray">
            You can delegate your voting power to any address including your
            own. All your voting power will be delegated. Delegation will not
            lock or transfer your BIT tokens.
          </text>
          <div className="mt-2">
            <div className="relative flex flex-row mb-4">
              <text className="font-mono text-black text-lg w-96">
                Delegate Address
              </text>
              <button className="absolute right-2" onClick={handleOwnDegelationAddr}>
                <text className="font-mono text-red">Delegate To Yourself</text>
              </button>
            </div>

            <input
              className="w-full border py-3 px-3 rounded-xl"
              placeholder="Enter a 0x address"
              value={delegationAddr}
              onChange={validateAddress}
            />
            <p className="my-3 text-sm">
              {label}

              {insufficientBal ? (
                "Insufficient balance to vote"
              ) : (
                <>
                  {nameLabel.name != "" ? (
                    <>
                      <span style={{ color: "#4FC78D" }}>{nameLabel.name}</span>
                      <span style={{ color: "#919191" }}>
                        {" "}
                        - Voting Weight:{" "}
                        {nameLabel.votingWeight != undefined
                          ? nameLabel.votingWeight
                          : "0"}
                        %
                      </span>
                    </>
                  ) : null}
                </>
              )}
            </p>
            <button
              className={"w-full rounded-xl py-3 bg-red my-5 disabled:bg-gray active:bg-gray"}
              disabled={disable || delegationClicked}
              onClick={() => { handleDelegateSubmit(delegationAddr)}}
            >
              <text className="text-lg text-white">
                {delegationClicked ? "Delegating vote..." : "Delegate Votes"}
              </text>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
