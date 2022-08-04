import { storage } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import { reloadByToken } from "src/actions";

import { DashboardLayout } from "../dashboard-layout";

import Login from "../../pages/login.js";

const withAuth = (Component, noLayout) => {
  const Auth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = storage.getToken();

    if (!token) return <Login />;

    if (!user) dispatch(reloadByToken());

    if (user) {
      if (noLayout) return <Component />;
      else
        return (
          <DashboardLayout>
            <Component />
          </DashboardLayout>
        );
    } else return <Login />;
  };

  return Auth;
};
export default withAuth;
