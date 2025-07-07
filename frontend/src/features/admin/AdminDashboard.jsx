import Loading from "../../components/Loading";
import useQuery from "../../hooks/useQuery";

export default function AdminDashboard() {
  return (
    <div className="adminDashboard">
      <h1>Admin Dashboard</h1>
      <Statistics />
    </div>
  );
}

function Statistics() {
  const { loading, error, data } = useQuery("/admin/stats");

  if (loading || !data) return <Loading />;

  return (
    <section className="adminStats">
      <div className="statCards">
        <StatCard title="Accounts" value={data.accounts} />
        <StatCard title="Roles" value={data.roles} />
        <StatCard title="Forums" value={data.forums} />
        <StatCard title="Posts" value={data.posts} />
        <StatCard title="Replies" value={data.replies} />
      </div>
    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="adminStatistic">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

function StatusCard({ title, value }) {
  return (
    <div className="adminStatus">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}
