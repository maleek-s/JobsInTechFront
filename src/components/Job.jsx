import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white dark:bg-[#141718] border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
      </div>

      <div className="flex items-center gap-2 my-2">
        <div>
          <h1 className="font-medium text-lg">{job?.company}</h1>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" asChild>
          <Link to={`/description/${job?._id}`}>Details</Link>
        </Button>

        <Button
          className="bg-[#7209b7]"
          onClick={() => window.open(job?.jobLink, "_blank")}
        >
          Open Job Post
        </Button>
      </div>
    </div>
  );
};

export default Job;
