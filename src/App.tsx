import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "components/Layout/Layout";
import Home from "routes/Home/Home";
import Share from "routes/Share/Share";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/share"
          element={
            <PrivateRoute>
              <Share />
            </PrivateRoute>
          }
        />
        <Route path="share" element={<Share />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default App;
