import isTeacher from "@/lib/is-teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ProtectLatout = ({ children }) => {
  const { userId } = auth();

  if (!isTeacher(userId)) {
    redirect("/");
  }

  return <>{children}</>;
};

export default ProtectLatout;
