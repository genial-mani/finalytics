import { LoaderCircleIcon } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderCircleIcon className="animate-spin mr-2" />
    </div>
  );
};

export default Loader;
