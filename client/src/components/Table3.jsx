export const Table3 = () => {
    return (
        <div className="mt-8">
        <h4 className="text-gray-600">
          Wide Table
        </h4>
  
        <div className="flex flex-col mt-6">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" >
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg" >
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200" >
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200" >
                      Title
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200" >
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200" >
                      Role
                    </th>
                    <th className="px-6 py-3 bg-gray-100 border-b border-gray-200" />
                  </tr>
                </thead>
  
                <tbody className="bg-white">
                  <tr>
                    <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap" >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="profile pic"
                          />
                        </div>
  
                        <div className="ml-4">
                          <div className="text-sm font-medium leading-5 text-gray-900" >
                            {'Name'}
                          </div>
                          <div className="text-sm leading-5 text-gray-500">
                            {'Email'}
                          </div>
                        </div>
                      </div>
                    </td>
  
                    <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap" >
                      <div className="text-sm leading-5 text-gray-900">
                        {'Title'}
                      </div>
                      <div className="text-sm leading-5 text-gray-500">
                        {'Title 2'}
                      </div>
                    </td>
  
                    <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap" >
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                        {'Status'}
                        </span>
                    </td>
  
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap" >
                      {'Role'}
                    </td>
  
                    <td className="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap" >
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}