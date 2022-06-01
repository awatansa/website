import { ProgressSpinner } from "primereact/progressspinner";

export default function Loading() {
  return (
    <div className={"root-container"}>
      <div className="p-3 m-3">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="4"
          fill="#EEEEEE"
          animationDuration=".5s"
        />
      </div>
    </div>
  );
}
