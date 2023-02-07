import { useContext } from "react";
import UserInfo from "../components/UserInfo/UserInfo";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <section>
      {user && <UserInfo user={user} />}
      <h1 className="text-center">You are on home page!</h1>
    </section>
  );
};

export default Home;