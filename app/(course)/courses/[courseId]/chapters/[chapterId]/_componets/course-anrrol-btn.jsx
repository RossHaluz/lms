"use client";
import { Button } from "@/components/ui/button";
import { FormatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CourseAnrrolBtn = ({ courseId, price }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const data = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(data.data.url);
    } catch (error) {
      toast.error("Something went wrong...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      size="sm"
      disabled={isLoading}
      className="w-full md:w-auto"
    >
      Enrrol for {FormatPrice(price)}
    </Button>
  );
};

export default CourseAnrrolBtn;
