// upon clicking the jobItem in table , this should open through my job view page which will fetch the data first and then send it here .
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/index";
import {
  Building2,
  Calendar,
  MapPin,
  DollarSign,
  ExternalLink,
  MessageSquare,
  ArrowLeft,
  Edit3,
  Trash2,
  Clock,
  User,
  Link as LinkIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  PlayCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { databaseService } from "../appwrite/databaseService";
function JobPage({ data }) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit/${data.$id}`, { state: { JobData: data } });
  };
  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure , you want to delete ? Once the data is deleted , you won't be able to access again."
      )
    ) {
      const isDeleted = await databaseService.deleteDocument(data.$id);
      if (isDeleted) {
        navigate("/");
      }
    }
  };
  const daysElapsed = Math.floor((new Date() - new Date(data.DateApplied)) / (24*60*60*60*1000))
  return (
    <div className="w-full">
      <div className="flex items-center px-10 py-2 justify-between shadow-lg">
        <div className="flex items-center">
          <Link to="/" className="w-3 h-3 hover:bg-gray-400">
            <ArrowLeft className="text-gray-700" />
          </Link>
          <p className="font-semibold text-lg md:text-xl ml-2">
            {data.CompanyName}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {/* yaha se it shouyld go to edit page , vaha pr phle fetch hoyega job data and then edit component will be rendered with jobData passed to it , vbut i already have jobData */}
          {/* TODO: in editPage first check whether url state data is present , if not then only fetch */}

          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white"
            onClick={handleEdit}
          >
            <Edit3 className="w-2 h-2" />
            Edit
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-400"
            onClick={handleDelete}
          >
            <Trash2 className="w-2 h-2" /> Delete
          </Button>
        </div>
      </div>
      <div className="w-full mx-auto max-w-[720px] py-3 flex flex-col md:flex-row gap-3">
        <div className="md:flex-[60%] space-y-2">
          <div className="px-2 py-3 rounded-lg shadow space-y-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-lg">Application Status</p>
              <PlayCircle className="text-blue-500 w-2 h-2" />
            </div>
            <div
              className={
                `rounded-2xl bg-blue-200 border p-1 border-blue-300 text-blue-600 ` +
                  data.status ==
                "Rejected"
                  ? "bg-red-200 border-red-300 text-red-6m 00"
                  : ""
              }
            >
              {data.status}
            </div>
          </div>
          <div className="px-2 py-3 rounded-lg shadow space-y-2">
            <p className="text-lg">Position Details</p>
            <div className="flex items-center">
              <Building2 className="w-2 h-2 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-400 font-light">Company</p>
                <p className="mt-1">{data.CompanyName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <User className="w-2 h-2 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-400 font-light">Role</p>
                <p className="mt-1">{data.Role}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-2 h-2 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-400 font-light">Location</p>
                <p className="mt-1">{data.Location || "Not specified"}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-2 h-2 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-400 font-light">Salary Range</p>
                <p className="mt-1">{data.SalaryRange || "Not specified"}</p>
              </div>
            </div>
          </div>
          <div className="px-2 py-3 rounded-lg shadow space-y-2">
            <p className="text-lg">Application Details</p>
            <div className="flex items-center space-x-1.5">
              <ExternalLink className="w-2 h-2 text-indigo-500" />
              <Link
                to={data.Link}
                className="text-blue-400 decoration-blue-500 hover:underline"
              >
                {data.Link}
              </Link>
            </div>
          </div>
          {/* notes */}
          <div className="px-2 py-3 rounded-lg shadow space-y-2">
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-2 h-2 text-indigo-500"/>
              <p className="text-lg">Notes</p>
            </div>
            <div className="bg-gray-200 rounded-lg p-2">
                {data.Notes}
            </div>
          </div>
        </div>
        <div className="md:flex-[40%] space-y-2">
        <div className="px-2 py-3 rounded-lg shadow space-y-2">
          <p className="text-lg">Application Info</p>
          <div className="flex items-center justify-between text-sm">
              <p className="bg-gray-400">Days Since Applied</p>
              <p>{daysElapsed}</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default JobPage;
