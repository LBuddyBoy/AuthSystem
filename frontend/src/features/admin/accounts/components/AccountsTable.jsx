import { useAccount } from "../../../../context/AccountContext";
import { useAdminAccount } from "../context/AdminAccountContext";

export default function AccountsTable() {
  return (
    <table className="adminAccountTable">
      <TableHead />
      <TableBody />
    </table>
  );
}

function TableHead() {
  return (
    <thead>
      <tr>
        <th>Avatar</th>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

function TableBody() {
  const { accounts, selected, setSelected, formData, setUpdated, setError } =
    useAdminAccount();
  const { update } = useAccount();

  const startEditing = (e, account) => {
    e.preventDefault();
    setSelected(account);
  };

  const stopEditing = (e) => {
    e.preventDefault();
    setSelected(null);
  };

  const saveEdits = async (e) => {
    try {
      e.preventDefault();
      await update({ id: selected.id, payload: formData });
      setSelected(null);
      setUpdated((current) => current + 1);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <tbody>
      {accounts.map((account) => {
        return (
          <tr key={account.id}>
            <td>
              <img
                src={account.avatar_url}
                alt={"Account Avatar of " + account.username}
              />
            </td>
            <TableData
              account={account}
              field={"username"}
              value={account.username}
            />
            <TableData
              account={account}
              field={"email"}
              value={account.email}
            />
            <TableData
              account={account}
              field={"role_id"}
              value={account.role}
            />
            <td>
              {selected && selected.id === account.id ? (
                <>
                  <button className="cancelEditBtn" onClick={stopEditing}>
                    Cancel
                  </button>
                  <button className="saveAccountBtn" onClick={saveEdits}>
                    Save
                  </button>
                </>
              ) : (
                <button
                  className="editAccountBtn"
                  onClick={(e) => startEditing(e, account)}
                >
                  Edit
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

function TableData({ account, field, value }) {
  const { selected, setFormData, roles } = useAdminAccount();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => {
      return { ...state, [name]: value };
    });
  };

  if (field === "role_id") {
    return (
      <td>
        {selected && selected.id === account.id ? (
          <select name={field} defaultValue={value.id} onChange={handleChange}>
            {roles.map((role) => {
              return (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              );
            })}
          </select>
        ) : (
          value.name
        )}
      </td>
    );
  }

  return (
    <td>
      {selected && selected.id === account.id ? (
        <input name={field} defaultValue={value} onChange={handleChange} />
      ) : (
        value
      )}
    </td>
  );
}
