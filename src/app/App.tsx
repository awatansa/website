import "app/App.css";
import AppLoading from "app/components/AppLoading";
import { lazy, Suspense } from "react";

const ThemeLoader = lazy(() => import("app/components/ThemeLoader"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={AppLoading}>
        <ThemeLoader />
      </Suspense>
    </div>
  );
}

export default App;
