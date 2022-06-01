import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={"not-found"}>
      <div
        className={
          "flex flex-column justify-content-center align-items-center m-2 px-2"
        }
        style={{ height: "75vh" }}
      >
        <h1 className={"text-800"}>404</h1>
        <h2 className={"text-600"}>Page not found</h2>
        <p className={"my-3"}>
          <Button label={"Go to home"} onClick={()=> navigate("/")}/>
        </p>
      </div>
    </div>
  );
}
