const isTeacher = (userId) => {
  return (
    userId === process.env.NEXT_PUBLIC_TEACHER_ID ||
    userId === process.env.NEXT_PUBLIC_TEACHER_ANOTHER_ID
  );
};

export default isTeacher;
