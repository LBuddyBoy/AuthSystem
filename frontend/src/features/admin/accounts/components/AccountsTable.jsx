import { useState } from "react";

export default function AccountsTable({ accounts }) {
  const [selected, setSelected] = useState();
  const [formData, setFormData] = useState();

  const startEditing = (e, account) => {
    e.preventDefault();
    setSelected(account);
  };

  const stopEditing = (e) => {
    e.preventDefault();
    setSelected(null);
  };

  const saveEdits = (e) => {

  }

  return (
    <>
      <table className="adminAccountTable">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

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
                <td>{account.username}</td>
                <TableData
                  selected={selected}
                  account={account}
                  field={"email"}
                  value={account.email}
                />
                <td>{account.role.name}</td>
                <td>
                  {selected && selected.id === account.id ? (
                    <><button
                      className="cancelBtn"
                      onClick={stopEditing}
                    >
                      Cancel
                    </button><button
                      className="saveBtn"
                      onClick={stopEditing}
                    >
                        Save
                      </button></>
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
      </table>
    </>
  );
}

function TableData({ selected, account, field, value }) {
  return (
    <td>
      {selected && selected.id === account.id ? (
        <input name={field} defaultValue={value} />
      ) : (
        value
      )}
    </td>
  );
}
