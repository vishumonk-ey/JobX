import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components/index";
import { Circle } from "lucide-react";
import { databaseService } from "../appwrite/databaseService";
import { useNavigate } from "react-router-dom";
function Postform({ JobData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    CompanyName: JobData?.CompanyName || "",
    Role: JobData?.Role || "",
    Status: JobData?.Status || "Applied",
    DateApplied: JobData?.DateApplied || "",
    Location: JobData?.Location || "",
    Salary: JobData?.Salary || "",
    Link: JobData?.Link || "",
    AppliedBy: JobData?.AppliedBy || "",
    Notes: JobData?.Notes || "",
  });
  const [error, setError] = useState();
  const navigate = useNavigate();
  const onSubmithandler = async (data) => {
    try {
      setError("");
      if (JobData) {
        const isUpdated = await databaseService.updateDocument(
          data,
          JobData.$id
        );
        if (isUpdated) {
          navigate(`/view-page/${JobData.$id}`);
        }
      } else {
        const isCreated = await databaseService.createDocument(data);
        if (isCreated) {
          navigate(`/view-page/${isCreated.$id}`);
        }
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  const deleteJobData = async () => {
    try {
      const isDeleted = await databaseService.deleteDocument(JobData.$id);
      if (isDeleted) {
        navigate("/");
      }
    } catch (error) {
      console.log("error in deleting : ", error);
    }
  };
  const [isModalOpen, setisModalOpen] = useState(false);
  const selectOptions = ["Applied", "Interview", "Rejected", "Offer"];
  return (
    <div className="w-full mx-auto relative ">
      <div className={`w-full max-w-[700px] p-2 `+ isModalOpen ? "blur-lg overflow-hidden pointer-events-none " : "" }>
        <h1 className="text-4xl">
          {JobData ? "Edit Application" : " New Application"}
        </h1>
        {JobData ? null : (
          <p className="mt-2 text-gray-400">
            Add a new job application to track !
          </p>
        )}
        <form className="mt-4 space-y-2" onSubmit={handleSubmit(onSubmithandler())}>
          <div className="w-full flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Company Name*"
                placeholder="Enter company name"
                {...register("CompanyName", { required: true })}
              />
              {errors.CompanyName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.CompanyName}
                </p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Job Role*"
                placeholder="Enter company name"
                {...register("Role", { required: true })}
              />
              {errors.Role && (
                <p className="text-red-400 text-sm mt-1">{errors.Role}</p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="" className="inline-block">
                Status
              </label>
              <Select
                className="rounded-lg border border-gray-300"
                {...register("Status", {
                  required: true,
                })}
              >
                {selectOptions.map((eachItem) => (
                  <option value={eachItem} key={eachItem}>
                    {eachItem}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Date Applied*"
                placeholder="DD-MM-YYYY"
                type="date"
                {...register("DateApplied", { required: true })}
              />
              {errors.DateApplied && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.DateApplied}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Location"
                placeholder="e.g Remote , Kolkata , Bangalore"
                {...register("Location")}
              />
              {errors.CompanyName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.CompanyName}
                </p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Salary Range"
                placeholder="e.g 55k - 100k"
                {...register("Salary")}
              />
              {errors.Salary && (
                <p className="text-red-400 text-sm mt-1">{errors.Salary}</p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Application Link"
                placeholder="https://company.com/careers"
                {...register("Link")}
              />
              {errors.Link && (
                <p className="text-red-400 text-sm mt-1">{errors.Link}</p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Applied Through"
                placeholder="e.g LinkedIn"
                {...register("AppliedBy")}
              />
              {errors.AppliedBy && (
                <p className="text-red-400 text-sm mt-1">{errors.AppliedBy}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <Input
              label="Notes"
              placeholder="Add any notes about this application , interview feedback or next steps ..."
              {...register("Notes")}
            ></Input>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <hr className="px-2" />
          <div className="w-full flex flex-col md:flex-row items-center justify-around">
            <Button type="submit">
              {JobData ? "Edit Document" : "Add document"}
            </Button>
            {JobData && (
              <Button type="button" onClick={() => setisModalOpen(true)}>
                Delete document
              </Button>
            )}
          </div>
        </form>
      </div>
      {isModalOpen && (
        <div className="w-full max-w-xl rounded-lg md:max-w-3xl p-2 md:p-3.5 absolute top-5 left-[50%] transform translate-x-1/2 z-50">
          <p className="text-lg md:text-xl font-semibold">Delete Job Listing</p>
          <p className="mt-2 text-gray-400 text-sm">
            Are you sure that you want to delete the data ? Once the data is
            lost , you wont be able to recover it !
          </p>
          <div className="w-full flex items-center gap-2">
            <Button className="flex-1" onClick={deleteJobData}>
              Delete
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setisModalOpen(!isModalOpen);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Postform;
