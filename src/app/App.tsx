import "app/App.scss";
import AppLoading from "app/components/AppLoading";
import { lazy, Suspense } from "react";
import TopNav from "app/components/TopNav";

const ThemeLoader = lazy(() => import("app/components/ThemeLoader"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={AppLoading}>
        <ThemeLoader/>
      </Suspense>
      <TopNav/>
    </div>
  );
}

export default App;
