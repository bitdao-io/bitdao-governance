import { useCallback, useState, useRef, Fragment }  from "react";
import { Dialog, Transition } from '@headlessui/react'
import addressTruncate from "../../helpers/addressTruncate";
// import UseAddressEns from "../../hooks/useAddressEns";
import UseEnsAddress from "../../hooks/useEnsAddress";


type ModalProps = {
  open: any;
  handleClose: any;
  handleDelegateSubmit: any;
  ownAccount: any;
  handleMatchAddress: any;
  insufficientBal: any;
  delegationClicked: any;
  provider: any;
};

function DelegateVoting({
  open,
  handleClose,
  handleDelegateSubmit,
  ownAccount,
  handleMatchAddress,
  insufficientBal,
  delegationClicked,
  provider,
}: ModalProps) {
  let focusRef = useRef(null)
  const [delegationAddr, setDelegationAddr] = useState("");
  const [inputAddrorEns, setInputAddrorEns] = useState("");
  const [label, setLabel] = useState("");
  const [nameLabel, setNameLabel] = useState({
    name: "",
    votingWeight: 0,
    // ensAddr: "",
  });

  const validateAddress = useCallback(async (event: any) => {
    event.preventDefault();
    const addrOrEns = event.target.value;
    setInputAddrorEns(addrOrEns)

    const resolvedAddress = await UseEnsAddress(provider, addrOrEns);
    const addr = resolvedAddress ? resolvedAddress : addrOrEns;

    setDelegationAddr(addr);
    setNameLabel({
      name: "",
      votingWeight: 0,
      // ensAddr: "",
    });


    if (!resolvedAddress || addr.length < 42 || addr.length > 42) {
      setLabel("Invalid Address");
    } else {
      if (addr.toLowerCase() === ownAccount.toLowerCase()) {
        setDelegationAddr(addr);
        const result = handleMatchAddress(addr);
        setLabel("");
        setNameLabel({
          name: addr.toLowerCase() === ownAccount.toLowerCase() ? "You" : addr,
          votingWeight: result.toFixed(4),
          // ensAddr: result[0].EnsAddr,
        });
      } else {
        setDelegationAddr(addr);
        const result = handleMatchAddress(addr);
        setLabel("");
        setNameLabel({
          name: addressTruncate(addr),
          votingWeight: result.toFixed(4),
          // ensAddr: result[0].EnsAddr,
        });
      }
    }

  }, [provider, handleMatchAddress, ownAccount]);

  const handleOwnDegelationAddr = async () => {
    setDelegationAddr(ownAccount);
    setInputAddrorEns(ownAccount)

    const result = handleMatchAddress(ownAccount);

    setLabel("");
    setNameLabel({
      name: "You",
      votingWeight: result.toFixed(4),
      // ensAddr: result[0].EnsAddr,
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={focusRef} onClose={handleClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white  text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" ref={focusRef}>
                <div className="">

                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Delegate Voting
                    </Dialog.Title>
                    <div className="my-2">
                      <p>Select an Address</p>
                      <p className="text-sm text-gray-500">
                        If you know the address you wish to delegate to, enter it below.
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <label htmlFor="delegate-address" >Delegate Address</label>

                      <button className="text-sm underline" onClick={handleOwnDegelationAddr}>Delegate to yourself</button>
                    </div>

                    <div>
                      <input
                        placeholder="Enter a 0x or ENS address"
                        value={inputAddrorEns}
                        onChange={validateAddress}
                        name="delegate-address"
                        id="delegate-address"
                        className="border border-black mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                      />
                      <p className="text-sm mt-1">
                        {label}

                        {insufficientBal ? (
                          "Insufficient balance to vote"
                        ) : (
                          <>
                            {nameLabel.name !== "" ? (
                              <>
                                <span className="text-brandblue">
                                  {nameLabel.name}
                                </span>
                                <span>
                                  {" "}
                                  - Voting Weight:{" "}
                                  {nameLabel.votingWeight !== undefined
                                    ? nameLabel.votingWeight
                                    : "0"}
                                  %
                                </span>
                              </>
                            ) : null}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6">
                <button
                  ref={focusRef}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-primary text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandgreen sm:text-sm"
                  onClick={() => handleDelegateSubmit(delegationAddr)}
                >
                  {delegationClicked ? "Delegating vote..." : "Delegate Votes"}
                </button>

              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default DelegateVoting;
