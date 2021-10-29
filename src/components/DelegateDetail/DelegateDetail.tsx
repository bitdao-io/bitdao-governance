import { Fragment, useRef, useState, useEffect} from "react";
import { Dialog, Transition } from '@headlessui/react'
import Blockies from "react-blockies";
import getDelegateDetail from "../../helpers/getDelegateDetail";
import Loading from "../../components/Loading";
import addressTruncate from "../../helpers/addressTruncate";
import handleNumberFormat from "../../helpers/handleNumberFormat";


type DelegateDetailProps = {
  open: any;
  handleClose: any;
  row: any;
  handleOpenDelegation: any;
}

function DelegateDetail({
  open,
  handleClose,
  row,
  handleOpenDelegation
}: DelegateDetailProps) {
  const [delegateData, setDelegateData] = useState([]);
  const {id} = row || {};
  const [isLoading, setIsLoading] = useState(true);

  const cancelButtonRef = useRef(null)

  const fetchData = async (id:any) => {
    setIsLoading(true);
    const delegate:any = await getDelegateDetail(id)
    console.log(delegate);
    
    setDelegateData(delegate)
    setIsLoading(false);

  }
  
  useEffect(() => {
    console.log(open, row)
    if (open) {
      fetchData(id);
    }
  }, [id])
  

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={handleClose}>
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 text-red-600">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg> */}
                    {row &&
                      <Blockies
                        seed={row.id}
                        className="rounded-2xl" 
                      />
                      }
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      
                      {addressTruncate(row?.id)}
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>current vote power 
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {handleNumberFormat(row.delegatedVotes)} 
                        </span>
                        {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold">({((row.delegatedVotes/ totalVotes) * 100).toFixed(2)}%)</span>   */}
                      </div>
                      { delegateData && !isLoading ? delegateData.map((vote: any, index: any) => (
                        
                        (<div key={index}> 
                          {vote.proposal.title}
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${vote.proposal.state === 'active' ? "bg-green-100 text-green-800": "bg-red-100 text-red-800"}`}>{vote.proposal.state}</span>
                          <p>{vote.proposal.choices[vote.choice-1]}</p>
                        </div>)
                      )): 
                        (<div><Loading color="#e84f7d" className="mx-auto my-3 w-1/12"/></div>)
                      }
                      { !delegateData.length && !isLoading && 
                        (<div>The delegate didn't vote in any proposal </div>)
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6">
                <button
                  ref={cancelButtonRef}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brandpink text-base font-medium text-white hover:bg-brandpink-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  onClick={async () => {
                    await handleClose();
                    handleOpenDelegation(row.id);
                  }}
                >
                  Delegate
                </button>
                
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )

}

export default DelegateDetail;
