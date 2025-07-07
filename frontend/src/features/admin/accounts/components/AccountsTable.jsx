import { useEffect, useState } from "react";
import { useAccount } from "../../../../context/AccountContext";
import { useAdminAccount } from "../../../../context/AdminAccountContext";
import useMutation from "../../../../hooks/useMutation";

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
  const {
    accounts,
    selected,
    setSelected,
    formData,
    setFormData,
    setError,
    roles,
  } = useAdminAccount();
  const { mutate, loading, error, data } = useMutation(
    "/admin/account",
    "PUT",
    ["accounts"]
  );

  const startEditing = (e, account) => {
    e.preventDefault();
    setSelected(account);
    setFormData({
      avatar_url: account.avatar_url,
      role_id: account.role?.id || "",
    });
  };

  const stopEditing = (e) => {
    e.preventDefault();
    setSelected(null);
  };

  const saveEdits = async (e) => {
    e.preventDefault();
    try {
      await mutate({ id: selected.id, ...formData });
      setSelected(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <tbody>
      {accounts.map((account) => (
        <tr key={account.id}>
          <AvatarCell
            isEditing={isEditing(selected, account)}
            value={account.avatar_url}
            onChange={(val) =>
              setFormData((state) => ({ ...state, avatar_url: val }))
            }
          />
          <TableData
            isEditing={isEditing(selected, account)}
            field="username"
            value={account.username}
            onChange={(val) =>
              setFormData((state) => ({ ...state, username: val }))
            }
          />
          <TableData
            isEditing={isEditing(selected, account)}
            field="email"
            value={account.email}
            onChange={(val) =>
              setFormData((state) => ({ ...state, email: val }))
            }
          />
          <TableRoleCell
            isEditing={isEditing(selected, account)}
            value={account.role}
            roles={roles}
            onChange={(val) =>
              setFormData((state) => ({ ...state, role_id: val }))
            }
          />
          <td>
            {isEditing(selected, account) ? (
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
      ))}
    </tbody>
  );
}

function AvatarCell({ isEditing, value, onChange }) {
  const [preview, setPreview] = useState(value);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
      onChange(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setPreview(value);
  }, [value]);

  return (
    <td>
      <img
        src={preview || "/default-avatar.png"}
        alt="Account Avatar"
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      {isEditing && (
        <input
          name="avatar_url"
          type="file"
          accept="image/*"
          style={{ marginTop: "6px" }}
          onChange={handleFileChange}
        />
      )}
    </td>
  );
}

function TableData({ isEditing, field, value, onChange }) {
  return (
    <td>
      {isEditing ? (
        <input
          name={field}
          placeholder={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        value
      )}
    </td>
  );
}

function TableRoleCell({ isEditing, value, roles, onChange }) {
  return (
    <td>
      {isEditing ? (
        <select
          name="role_id"
          defaultValue={value.id}
          onChange={(e) => onChange(e.target.value)}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      ) : (
        value.name
      )}
    </td>
  );
}

function isEditing(selected, account) {
  return selected && selected.id === account.id;
}
