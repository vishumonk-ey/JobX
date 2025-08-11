import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components/index";
import { CheckCheckIcon, CheckIcon, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { databaseService } from "../appwrite/databaseService";
import { useNavigate } from "react-router-dom";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useSelector } from "react-redux";
function Postform({ JobData }) {
  const author = useSelector((state)=>state.auth.userData)
  // console.log(author)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      CompanyName: JobData?.CompanyName || "",
      Role: JobData?.Role || "",
      Status: JobData?.Status || "Applied",
      AppliedDate: JobData?.AppliedDate || "",
      Location: JobData?.Location || "",
      Salary: JobData?.Salary || "",
      Link: JobData?.Link || "",
      AppliedBy: JobData?.AppliedBy || "",
      Notes: JobData?.Notes || "",
      AuthorId : author.$id
    },
  });
  const [selectedStatus, setselectedStatus] = useState(
    JobData?.status || "Applied"
  );
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
        // console.log("data" , data);
        const isCreated = await databaseService.createDocument({...data ,
          Salary : Number(data.Salary)
        });
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
    <div className="w-full mx-auto relative p-10 ">
      <div
        className={
          isModalOpen
            ? `w-full max-w-[700px] p-2 blur-lg overflow-hidden pointer-events-none mx-auto `
            : `w-full max-w-[700px] p-2 mx-auto`
        }
      >
        <h1 className="text-4xl font-bold">
          {JobData ? "Edit Application" : " New Application"}
        </h1>
        {JobData ? null : (
          <p
            className="mt-2 font-semibold
           text-gray-700"
          >
            Add a new job application to track !
          </p>
        )}
        <form
          className="mt-10 space-y-5"
          onSubmit={handleSubmit(onSubmithandler)}
        >
          <div className="w-full flex flex-wrap items-center gap-5">
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Company Name*"
                placeholder="Enter company name"
                {...register("CompanyName", {
                  required: "Please enter the company name ",
                })}
              />
              {errors.CompanyName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.CompanyName.message}
                </p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Job Role*"
                placeholder="Enter company name"
                {...register("Role", { required: "Please enter the job role" })}
              />
              {errors.Role && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.Role.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap items-center gap-5">
            <div className="flex-1 min-w-[200px] relative">
              <label
                htmlFor=""
                className="inline-block text-[#22223b] font-semibold"
              >
                Status* :
              </label>
              {/* <select
                className="rounded-lg border border-gray-300 ml-2 px-3 py-1 bg-[#3b82f6]/40 "
                {...register("Status", {
                  required: "Please select a status",
                })}
              >
                {selectOptions.map((eachItem) => (
                  <option value={eachItem} key={eachItem} className="font-mono bg-[#3b82f6]/40">
                    {eachItem}
                  </option>
                ))}
              </select> */}
              <Listbox
                value={selectedStatus}
                onChange={(value) => {
                  setselectedStatus(value);
                  setValue("Status", value);
                }}
              >
                <ListboxButton
                  className=" w-full px-3 py-2 rounded-lg bg-[#3b82f6]/20 shadow-sm text-black transition-all  border-transparent
            duration-300 cursor-pointer dark:text-white  focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-300 hover:border-blue-400 border outline-none flex items-center justify-between"
                >
                  {selectedStatus}
                  <ChevronDown className="size-5" />
                </ListboxButton>
                <ListboxOptions className="absolute mt-1 z-30 w-full rounded overflow-hidden bg-white border border-gray-200 shadow-lg">
                  {selectOptions.map((eachItem) => (
                    <ListboxOption
                      value={eachItem}
                      key={eachItem}
                      className="font-mono "
                    >
                      {({ focus, selected }) => (
                        <div
                          className={clsx(
                            "flex px-2 py-1 gap-2 items-center transition cursor-pointer",
                            focus && "bg-blue-400 text-white/80"
                          )}
                        >
                          <CheckIcon
                            className={clsx(
                              "size-5 font-extrabold text-blue-700",
                              !selected && "hidden"
                            )}
                          />
                          <p className={clsx(!selected && "ml-6")}>
                            {eachItem}
                          </p>
                        </div>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
                {/* library component -> controlled?uncontrolled  */}
              </Listbox>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Date Applied*"
                placeholder=""
                type="date"
                {...register("AppliedDate", {
                  required: "Please select the date applied",
                })}
              />
              {errors.AppliedDate && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.AppliedDate.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap items-center gap-5">
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Location"
                placeholder="e.g Remote , Kolkata , Bangalore"
                {...register("Location")}
              />
              {errors.Location && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.Location.message}
                </p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Salary Range"
                placeholder="e.g 55,000 - 1,00,000"
                {...register("Salary"
                )}
              />
              {errors.Salary && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.Salary.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap items-center gap-5">
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Application Link"
                placeholder="https://company.com/careers"
                {...register("Link")}
              />
              {errors.Link && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.Link.message}
                </p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                label="Applied Through"
                placeholder="e.g LinkedIn"
                {...register("AppliedBy")}
              />
              {errors.AppliedBy && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.AppliedBy.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <Input
              label="Notes"
              placeholder="Add any notes about this application , interview feedback or next steps ..."
              className="pt-2 pb-16"
              {...register("Notes")}
            ></Input>
          </div>
          {error && <p className="text-red-400 text-sm">{error.message || "Something went wrong !"}</p>}
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
