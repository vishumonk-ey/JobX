import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { databaseService } from "../appwrite/databaseService";
// import Postform from "../components/Postform";
import {PostForm} from '../components/index'
import {LoaderCircle} from 'lucide-react'
function EditPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [jobData, setjobData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const fetchData = async () => {
    try {
      if (location.state) {
        console.log(location.state);
        setjobData(location.state.JobData);
      } else {
        const data = await databaseService.getDocument(slug);
        setjobData(data);
      }
    } catch (error) {
      console.log("error while fetching", error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <div className="w-full flex-col gap-2 justify-center items-center">
      <LoaderCircle className="animate-spin size-3" />
      <p className="font-semibold">Loading...</p>
    </div>
  ) : (
    <PostForm JobData={jobData} />
  );
}

export default EditPage;
