import { useState } from "react";
import useQuery from "../../../../hooks/useQuery";
import { useAccount } from "../../../../context/AccountContext";
import { useAdminAccount } from "../context/AdminAccountContext";

export default function AccountsTable() {
  const { accounts, setCursor } = useAdminAccount();

  return (
    <table className="adminAccountTable">
      <TableHead />
      <TableBody accounts={accounts} setCursor={setCursor} />
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

function TableBody({ accounts }) {
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({});
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
    e.preventDefault();
    console.log("selected ", selected);
    console.log("formData ", formData);
    setSelected(await update({ id: selected.id, payload: formData }));
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
              selected={selected}
              setFormData={setFormData}
              account={account}
              field={"username"}
              value={account.username}
            />
            <TableData
              selected={selected}
              setFormData={setFormData}
              account={account}
              field={"email"}
              value={account.email}
            />
            <TableData
              selected={selected}
              setFormData={setFormData}
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

function TableData({ selected, setFormData, account, field, value }) {
  const { loading, error, data: roles } = useQuery("/roles");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => {
      return { ...state, [name]: value };
    });
  };

  if (field === "role_id") {
    return (
      <td>
        {selected && selected.id === account.id && !loading && roles ? (
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
