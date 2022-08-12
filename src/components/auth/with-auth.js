import { storage } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import { reloadByToken } from "src/actions";

import { DashboardLayout } from "../dashboard-layout";

import SignIn from "../../pages/signin.js";

const withAuth = (Component, noLayout) => {
  const Auth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = storage.getToken();

    if (!token) return <SignIn />;

    if (!user) dispatch(reloadByToken());

    if (user) {
      if (noLayout) return <Component />;
      else
        return (
          <DashboardLayout>
            <Component />
          </DashboardLayout>
        );
    } else return <SignIn />;
  };

  return Auth;
};
export default withAuth;
