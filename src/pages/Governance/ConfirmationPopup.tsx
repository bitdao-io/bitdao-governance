import React from "react";
import { Dialog, Transition } from '@headlessui/react'
import addressTruncate from "../../helpers/addressTruncate";


type ModalProps = {
  open: any;
  handleClose: any;

  delegatingToAddr: any;
  txHash:any;votesDelegated:any;
  delegationClicked:any;
  pendingTx:any;
  confirmedTx:any;
};

function ConfiramtionPopup({
  open,
  handleClose,
  delegatingToAddr,
  txHash,
  votesDelegated,
  delegationClicked,
  pendingTx,
  confirmedTx
}: ModalProps) {
  const cancelButtonRef = React.useRef(null)

  return (

    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={handleClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
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
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="mt-3 text-center sm:mt-0">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      {pendingTx?'Transaction Pending':(<>{confirmedTx?'Transaction Confirmed':'Confirm Transaction'}</>)}
                    </Dialog.Title>
                    <div className="mt-5">
                      
                      <p className="text-blue-500">{votesDelegated} Votes</p>
                      <p>
                        Delegating to {addressTruncate(delegatingToAddr)}
                      </p>
                      <p>

                        {confirmedTx?(
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mx-auto my-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ):(
                          <img src={process.env.REACT_APP_CLOUDFRONT + "balLogo.png"} className="m-auto" style={{width:'45px'}}/>
                        )}
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6">
                <p style={{ textAlign: "center",color: "#919191", fontSize:"14px"}}>
                  {delegationClicked?'Confirm the transaction':'Transaction Broadcast'}
                </p>
                
                {txHash && (
                  <p>
                    <a href={`${process.env.REACT_APP_ETHERSCAN}${txHash}`} target="_blank" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brandpink text-base font-medium text-white hover:bg-brandpink-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-3 sm:text-sm">View on Etherscan</a>
                  </p>
                )}
                
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

  );
}

export default ConfiramtionPopup;
