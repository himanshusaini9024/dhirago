import Cookies from "js-cookie";
import api from "./api";

export const restoreAuth = async (
  dispatch,
  loginSuccess,
  logout
) => {
  

  try {
    // Verify token with backend
    const res = await api.get("/user");

    dispatch(
      loginSuccess({
        user: res.data,
      })
    );
  } catch (err) {
    // Invalid/expired token
    dispatch(logout());
  }
};