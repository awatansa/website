import { ProgressSpinner } from "primereact/progressspinner";

function AppLoading() {
  return (
    <div>
      <div className="card">
        <h5>
          Application is Loading
          <ProgressSpinner
            style={{ width: "30px", height: "30px" }}
            strokeWidth="4"
            fill="#EEEEEE"
            animationDuration=".5s"
          />
        </h5>
      </div>
    </div>
  );
}

export default AppLoading;
