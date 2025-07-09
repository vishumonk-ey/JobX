import { ListboxButton } from "@headlessui/react";
import { Filter, Plus, Search } from "lucide-react";
import React from "react";
import {Link} from 'react-router-dom'
function JobTable() {
  let searchBarValue = "";
  return (
    <div className="rounded-lg bg-indigo-100">
      <div className="w-full flex flex-col md:flex-row items-center py-3 px-5 md:justify-between">
        <div className="rounded-lg focus:ring ring-indigo-500 bg-indigo-200 px-2 py-1 flex items-center w-full md:w-1/2">
          <Search
            className="w-5 h-5 text-indigo-100 hover:text-indigo-400 cursor-pointer mr-2"
            onClick={() => {}}
          />
          <input
            className="flex-1 outline-none text-gray-500"
            placeholder="Search"
            type="text"
            onChange={(e) => {
              searchBarValue = e.target.value;
            }}
          />
        </div>
        <div className="flex flex-col items-center md:flex-row md:items-center">
          <Link to='/add-job'>
            <div className="w-full rounded-lg md:w-fit px-3 py-2 bg-indigo-300 hover:bg-indigo-500 text-white flex items-center focus:ring focus:ring-indigo-700">
              <Plus className="w-5 h-5" />
              <p>Add Job</p>
            </div>
          </Link>
          <Listbox 
          value={} onChange={}>
            <ListboxButton className="w-full md:w-fit px-3 py-2 bg-indigo-50 hover:bg-indigo-300 flex items-center">
                <Filter className="w-4 h-4 text-indigo-400"/>
                Filter
            </ListboxButton>
          </Listbox>
        </div>
      </div>
    </div>
  );
}

export default JobTable;
