import {useState} from 'react';
import handleNumberFormat from "../../helpers/handleNumberFormat";
import addressTruncate from "../../helpers/addressTruncate";
import DelegateDetail from "../../components/DelegateDetail";

type DelegateListProps = {
    delegates: any;
    totalVotes: any;
    handleOpenDelegation: any;
}

function DelegateList({ delegates, totalVotes, handleOpenDelegation }: DelegateListProps) {
  const [openDelegate, setOpenDelegate] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleCloseDelegate = () => {
    console.log('closed')
    setOpenDelegate(false)
  }

  const openModal = (row:any) => {
    console.log('openmodal')
    setSelectedUser(row);

    setOpenDelegate(true);
  }
  

  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-b-2xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Votes
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Details</span>
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {delegates.map((row: any, index: any) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        <a
                        href={`${process.env.REACT_APP_ETHERSCAN_ADDRESS}${row.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {index + 1}&nbsp;
                        <span>|</span> &nbsp;
                        {addressTruncate(row.id)}
                      </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {handleNumberFormat(row.delegatedVotes)} 
                      </span>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold">({((row.delegatedVotes/ totalVotes) * 100).toFixed(2)}%)</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => openModal(row)} className="text-indigo-600 hover:text-indigo-900">
                        Open Details
                      </button>
                    </td>
                  </tr>
                  
                  
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {openDelegate && (
        <DelegateDetail open={openDelegate} handleClose={handleCloseDelegate} row={selectedUser} handleOpenDelegation={handleOpenDelegation} />
      )}


    </div>
  )
}

export default DelegateList;

