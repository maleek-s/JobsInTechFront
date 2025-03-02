import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs"; // Make sure to adjust the import path accordingly

const AppliedJobTable = () => {
  useGetAppliedJobs(); // Fetches the applied jobs and updates Redux store
  const navigate = useNavigate();

  const { allAppliedJobs } = useSelector(store => store.job);

  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return <span>You haven't applied any job yet.</span>;
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your saved jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Job Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob._id}>
              <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
              <TableCell><button onClick={() => navigate(`/description/${appliedJob?._id}`)}>{appliedJob?.title}</button></TableCell>
              <TableCell>{appliedJob?.company}</TableCell>
              <TableCell><button onClick={() => window.open(appliedJob?.jobLink, '_blank')}>Click here to visit the job link</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
