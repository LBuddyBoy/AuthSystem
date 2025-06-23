import Button from "../../../../components/Button";
import { PAGE_SIZE, useAdminAccount } from "../context/AdminAccountContext";

export default function AccountsButtons() {
  const { nextCursor, cursor, setCursor } = useAdminAccount();

  const handleNextPage = (e) => {
    e.preventDefault();
    setCursor(nextCursor);
  };

  const handlePreviousPage = () => {
    if (cursor - PAGE_SIZE < 0 || cursor <= 0) {
      return;
    }

    setCursor((current) => current - PAGE_SIZE);
  };

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
