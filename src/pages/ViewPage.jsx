import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { databaseService } from "../appwrite/databaseService";
import { LoaderCircle } from "lucide-react";
import { JobPage } from "../components/index";
function ViewPage() {
  const { slug } = useParams();
  const [jobData, setjobData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const fetchData = async (slug) => {
    try {
      const data = await databaseService.getDocument(slug);
      console.log("data upon fetching : " ,data);
      setjobData(data);
    } catch (error) {
      console.log("error while fetching: ", error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    // databaseService.getDocument(slug) //
    fetchData(slug);
  }, []);
  return isLoading ? (
    <div className="w-full flex-col gap-2 justify-center items-center">
      <LoaderCircle className="animate-spin size-3" />
      <p className="font-semibold">Loading...</p>
    </div>
  ) : (
    <JobPage data={jobData} />
  );
}

export default ViewPage;
