import { Progress } from "./ui/progress";

const CourseProgress = ({ value, variant }) => {
  return (
    <div className="flex flex-col gap-2">
      <Progress value={value} variant={variant} />
      <p>{Math.round(value)}% Complete</p>
    </div>
  );
};

export default CourseProgress;
