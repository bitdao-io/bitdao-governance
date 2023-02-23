import handleIntegerFormat from "../../helpers/handleIntegerFormat";
import addressTruncate from "../../helpers/addressTruncate";

type DelegateListProps = {
    delegates: any;
    loading: boolean;
}

function DelegateList({ delegates, loading }: DelegateListProps) {

  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden ">
              <table className="min-w-full">
                <thead className="bg-white border-b border-black">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ENS
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Votes
                    </th>

                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-black border-b border-black">
                {loading 
                  ? <tr>
                    <td colSpan={4}>
                      <div role="status" className="flex flex-row justify-center p-2">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600" style={{ fill: "#adff00"}} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only text-sm text-gray-500">Loading...</span>
                      </div>
                    </td>
                  </tr> 
                  : delegates.length 
                  ? delegates.map((row: any, index: any) => (<tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        <a
                        href={`${process.env.REACT_APP_ETHERSCAN_ADDRESS}${row.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {row.no}&nbsp;
                        <span>|</span> &nbsp;
                        {addressTruncate(row.id)}
                      </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.ens}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-brandgreen ">
                      {handleIntegerFormat(row.delegatedVotes)}
                      </span>
                    </td>
                  </tr>))
                  : <tr>
                    <td colSpan={4}>
                      <div role="status" className="flex flex-row justify-center p-2">
                        <span className="text-sm text-gray-500">No delegators found for this page...</span>
                      </div>
                    </td>
                  </tr> 
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default DelegateList;

