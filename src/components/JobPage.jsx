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
  console.log("data transferred to jobpage", data);

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit-page/${data.$id}`, { state: { JobData: data } });
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
  const daysElapsed = Math.floor(
    (new Date() - new Date(data.AppliedDate)) / (24 * 60 * 60 * 60 * 1000)
  );
  return (
    <div className="w-full">
      <div className="flex items-center px-10 py-2 justify-between shadow-lg">
        <div className="flex items-center">
          <Link to="/" >
            <ArrowLeft className="text-gray-700 size-8
            hover:bg-gray-200 transition rounded-full p-1" />
          </Link>
          <p className="font-semibold text-lg md:text-xl ml-2">
            {data.CompanyName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* yaha se it shouyld go to edit page , vaha pr phle fetch hoyega job data and then edit component will be rendered with jobData passed to it , vbut i already have jobData */}
          {/* TODO: in editPage first check whether url state data is present , if not then only fetch */}

          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2"
            onClick={handleEdit}
          >
            <Edit3 className="size-3" />
            Edit
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-400 flex items-center gap-2"
            onClick={handleDelete}
          >
            <Trash2 className="size-3" /> Delete
          </Button>
        </div>
      </div>
      <div className="w-full mx-auto max-w-5xl py-3 px-2 flex flex-col md:flex-row gap-5">
        <div className="md:flex-[60%] space-y-5">
          <div className="px-5 py-3 rounded-lg shadow border border-gray-100 space-y-2">
            <div className="w-full flex items-center justify-between ">
              <p className="text-lg font-semibold">Application Status</p>
              <PlayCircle className="text-blue-500 size-5" />
            </div>
            <div
              className={
                data.Status == "Rejected"
                  ? "bg-red-200 border-red-300 text-red-600"
                  : "" +
                    `rounded-2xl px-4 w-fit bg-blue-200 border p-1 border-blue-300 text-blue-600 `
              }
            >
              {data.Status}
            </div>
          </div>
          <div className="px-5 py-3 rounded-lg shadow border border-gray-100 space-y-2 pb-5">
            <p className="text-lg font-semibold">Position Details</p>
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <Building2 className="size-5 text-indigo-500" />
                <div className="leading-none">
                  <p className="text-sm text-gray-400 ">Company</p>
                  <p className="">{data.CompanyName}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <User className="size-5 text-indigo-500" />
                <div className="leading-none">
                  <p className="text-sm text-gray-400 ">Role</p>
                  <p className="">{data.Role}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <MapPin className="size-5 text-indigo-500" />
                <div className="leading-none">
                  <p className="text-sm text-gray-400 ">Location</p>
                  <p className="">{data.Location || "Not specified"}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <DollarSign className="size-5 text-indigo-500" />
                <div className="leading-none">
                  <p className="text-sm text-gray-400 ">Salary Range</p>
                  <p className="">{data.SalaryRange || "Not specified"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 py-3 rounded-lg shadow border border-gray-100 space-y-2">
            <p className="text-lg font-semibold">Application Details</p>
            <div className="flex items-center space-x-5">
              <ExternalLink className="size-5 text-indigo-500" />
              <a
                href={
                  RegExp("^https?://").test(data.Link)
                    ? data.Link
                    : `https://${data.Link}`
                }
                target="_blank"
                rel="noopener norefferer"
                className="text-blue-400 decoration-blue-500 hover:underline underline-offset-2"
              >
                {data.Link}
              </a>
            </div>
          </div>
          {/* notes */}
          <div className="px-5 py-3 rounded-lg shadow border border-gray-100 space-y-2">
            <div className="flex items-center space-x-2">
              <p className="text-lg font-semibold">Notes</p>
              <MessageSquare className="size-5 text-indigo-500" />
            </div>
            <div className="bg-gray-200 rounded-lg p-4">{data.Notes}</div>
          </div>
        </div>
        <div className="md:flex-[40%] space-y-2">
          <div className="px-5 py-3 rounded-lg shadow space-y-2">
            <p className="text-lg font-semibold ">Application Info</p>
            <div className="flex items-center gap-10 text-sm">
              <p className="text-gray-400">Days Since Applied</p>
              <p className="text-gray-500">{daysElapsed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPage;
