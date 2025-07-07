import useTime from "../hooks/useTime";

export default function TimeAgo({ timeStamp }) {
  const { formatTime } = useTime();

  return <time>{formatTime(new Date(timeStamp)) + " ago"}</time>;
}
