const StatusBadge = ({ completed }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${
        completed
          ? "bg-green-200 text-green-500"
          : "bg-yellow-100 text-yellow-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${completed ? "bg-green-500" : "bg-yellow-300"}`}
      />
      {completed ? "Completed" : "Pending"}
    </span>
  );
};

export default StatusBadge;
