import Button from "../../../../components/Button";
import { useAdminAccount } from "../../../../context/AdminAccountContext";

export default function AccountsButtons() {
  const { handleNextPage, handlePreviousPage } = useAdminAccount();

  return (
    <div className="pageControls">
      <Button
        id={"previousAccountsPageBtn"}
        text={"Previous Page"}
        action={handlePreviousPage}
      />
      <Button
        id={"nextAccountsPageBtn"}
        text={"Next Page"}
        action={handleNextPage}
      />
    </div>
  );
}
