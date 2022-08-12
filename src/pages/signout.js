import { useRouter } from "next/router";
import { useEffect } from "react";
import { storage } from "src/utils";

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    storage.clearToken();
    router.push("/signin");
  }, []);

  return null;
};

export default SignOut;
