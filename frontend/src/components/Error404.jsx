import { Link } from "react-router";

export default function Error404() {
    return <div>
        <h1>Oops! Whatever you are looking for isn't here!</h1>
        <Link to={"/"}>Click here to go back to safety</Link>
    </div>
}