import { useState } from "react";
import Button from "../../components/Button";
import { useAccount } from "../../context/AccountContext";
import Error from "../../components/Error";

export default function AccountForm() {
  const { account, setAccount, update } = useAccount();
  const [avatar, setAvatar] = useState(account.avatar_url);
  const [error, setError] = useState();

  if (!account) {
    return <></>;
  }

  const handleSave = async (formData) => {
    const username = formData.get("username");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");

    try {
      setAccount(
        await update({
          id: account.id,
          payload: {
            avatar_url: avatar,
            username,
            first_name,
            last_name,
          },
        })
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <form id="accountSettings" action={handleSave}>
      <h1>Account Settings</h1>

      <label>
        Username
        <input
          name="username"
          type="text"
          defaultValue={account.username || undefined}
        />
      </label>

      <label>
        First Name
        <input
          name="first_name"
          type="text"
          defaultValue={account.first_name || undefined}
        />
      </label>

      <label>
        Last Name
        <input
          name="last_name"
          type="text"
          defaultValue={account.last_name || undefined}
        />
      </label>

      <label>
        {avatar && <img className="avatarImg" src={avatar} alt="New Avatar" />}

        <input
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </label>
      {error && <Error error={error} />}
      <Button id={"accountSaveBtn"} text={"Save"}></Button>
    </form>
  );
}
