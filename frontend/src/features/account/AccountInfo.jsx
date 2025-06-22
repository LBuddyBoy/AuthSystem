import { useAccount } from "../../context/AccountContext";
import useTime from "../../hooks/useTime";

export default function AccountInfo() {
  const { account } = useAccount();
  const { formatTime } = useTime();

  if (!account) {
    return <></>;
  }

  return (
    <div className="accountInfo">
      <h1>Account Info</h1>

      <div className="accountInfoItems">
        <InfoItem
          title={"Age"}
          value={formatTime(new Date(account.created_at)) + " ago"}
        />

        <InfoItem title={"Role"} value={account.role.name} />

        <InfoItem title={"Username"} value={account.username} />

        {account.first_name && account.last_name && (
          <InfoItem
            title={"Full Name"}
            value={account.first_name + " " + account.last_name}
          />
        )}
      </div>
    </div>
  );
}

function InfoItem({ title, value }) {
  return (
    <>
      <h3>{title}</h3>
      <p>{value}</p>
    </>
  );
}
