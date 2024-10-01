import React from "react";
import LogoutHeader from "../../Component/UserView/logoutHeader";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const user = useSelector((state) => state.trade.isLogin);

  useEffect(() => {
    document.title = `Login Your Account || Trade Hub`;
    if (!user) {
      router.push("/Auth/Login");
    }
  }, [router]);
  return (
    <div className="profileMain">
      <div>
        <LogoutHeader />
      </div>
      <div>It is Body</div>
    </div>
  );
};

export default Profile;
