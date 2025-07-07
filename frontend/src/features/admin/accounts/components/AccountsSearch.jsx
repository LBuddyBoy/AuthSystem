import Button from "../../../../components/Button";
import { useAccount } from "../../../../context/AccountContext";
import { useAdminAccount } from "../../../../context/AdminAccountContext";

export default function AccountsSearch() {
  const { setQueryData } = useAdminAccount();
  const { query } = useAccount();

  const handleSubmit = async (formData) => {
    const search = formData.get("search");
    const field = formData.get("field");

    try {
      const result = await query(
        "/admin/accounts/search/" + field + "/" + search
      );

      setQueryData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form action={handleSubmit}>
        <input
          name="search"
          placeholder="Search for an account..."
          type="text"
        ></input>
        <label>
          Filter By
          <select name="field" defaultValue={"username"} required>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="id">ID</option>
          </select>
        </label>
        <Button id={"searchAccountBtn"} text={"Search"} />
      </form>
      <Button
        id={"clearSearchBtn"}
        text={"Clear"}
        action={() => setQueryData(null)}
      />
    </>
  );
}
