import React, { useState, useEffect, useRef  } from "react";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Dialog, DialogTrigger } from "./ui/Dialog";
import { observer } from "mobx-react-lite";
import EditTask from "./EditTask";
import { useStore } from "@/stores/StoreProvider";

interface TaskDetails {
  title: string;
  image: string;
}
interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: string;
}

const Task = observer(({ id, title, description, status }: TaskProps) => {
  const { taskStore } = useStore();
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);
  const taskContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchDetails = async () => {
      if (showDetails && !taskDetails) {
        try {
          const apiURL = "https://dev-api.almashhad.tv/api/videos/detailsElastic/182622880654874";
          const response = await fetch(apiURL);
          if (!response.ok) {
            throw new Error("Failed to fetch task details");
          }
          const json = await response.json();
          setTaskDetails({
            title: json.data.result.title,
            image: json.data.result.image,
          });
        } catch (error) {
          console.error("Error fetching task details:", error);
          setTaskDetails(null); 
        }
      }
    };

    fetchDetails();
  }, [showDetails, taskDetails]);

  useEffect(() => {
    if (taskContainerRef.current) {
      taskContainerRef.current.scrollTop = taskContainerRef.current.scrollHeight;
    }
  }, [taskStore.tasks]);

 const handleDetailClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div ref={taskContainerRef} className="relative bg-white p-6 rounded shadow mt-1 border-b border-slate-300 max-w-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h3 className="text-lg font-medium mb-2 sm:mb-0">{title}</h3>
        <div className="flex gap-1 sm:gap-3 mt-2 sm:mt-0">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil2Icon className="w-5 h-5 text-blue-500" />
              </Button>
            </DialogTrigger>
            <EditTask
              id={id}
              title={title}
              description={description}
              status={status}
              open={open}
              setOpen={setOpen}
            />
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => taskStore.deleteTask(id)}
          >
            <TrashIcon className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600">{description}</p>
      <Badge
        className="mt-4"
        variant={
          status === "pending" ? "error" : status === "in_progress" ? "warning" : "success"
        }
      >
        {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
      </Badge>
      <div className="flex justify-end mt-4">
        <Button
          onClick={handleDetailClick}
          type="button"
          className="py-2.5 px-5 me-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          style={{ marginLeft: "auto", marginTop: "-65px" }}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
      </div>
      {showDetails && taskDetails && (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mr-4 mt-4">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-60 md:rounded-none md:rounded-l-lg"
            src={taskDetails.image}
            alt={`Image for ${taskDetails.title}`}
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {taskDetails.title}
            </h5>
            </div>
        </div>
      )}
    </div>
  );
});

export default Task;
