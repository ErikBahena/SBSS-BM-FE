import { storage } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import { reloadByToken } from "src/actions";

import { DashboardLayout } from "../dashboard-layout";

import Login from "../../pages/login.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @TODO: Move the toast container to a ui based component not a logic based component

const withAuth = (Component, noLayout) => {
  const Auth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = storage.getToken();

    if (!token) return <Login />;

    if (!user) dispatch(reloadByToken());

    if (user) {
      if (noLayout)
        return (
          <>
            <Component />
            <ToastContainer
              position="bottom-right"
              autoClose={3500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </>
        );
      else
        return (
          <DashboardLayout>
            <Component />
            <ToastContainer
              position="bottom-right"
              autoClose={3500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </DashboardLayout>
        );
    } else return <Login />;
  };

  return Auth;
};
export default withAuth;
