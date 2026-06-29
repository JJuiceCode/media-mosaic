import { RecordStatus, statusLabels, statusStyles } from "@/lib/memo-home-data";

type StatusBadgeProps = {
  status: RecordStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>{statusLabels[status]}</span>;
}
