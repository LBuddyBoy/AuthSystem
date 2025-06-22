import { useState } from "react";
import Button from "../../components/Button";
import { useAccount } from "../../context/AccountContext";

export default function AccountForm() {
  const { account } = useAccount();
  const [avatar, setAvatar] = useState(account.avatar_url);

  if (!account) {
    return <></>;
  }

  const handleSave = (formData) => {
    const avatar = formData.get("avatar");
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
        <input name="username" type="text" value={account.username} />
      </label>

      <label>
        First Name
        <input name="first_name" type="text" value={account.first_name} />
      </label>

      <label>
        Last Name
        <input name="last_name" type="text" value={account.last_name} />
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
      <Button id={"accountSaveBtn"} text={"Save"}></Button>
    </form>
  );
}
