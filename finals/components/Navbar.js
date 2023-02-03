import styles from "../styles/navbar.module.css";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });
  const router = useRouter();

  console.log(window.location.href);

  const handleBack = () => {
    router.replace("/");
  };

  const handleSignout = () => {
    router.push("/auth/login");
    signOut();
  };

  if (window.location.href === "http://localhost:3001/") {
    return (
      <nav className={styles.navbar}>
        <div>
          <p className={styles.p_user}>CPETCAM</p>
        </div>
        <button className={styles.signout_btn} onClick={handleSignout}>
          LOG OUT
        </button>
      </nav>
    );
  } else {
    return (
      <nav className={styles.navbar}>
        <button className={styles.back_btn} onClick={handleBack}>
          Back
        </button>
        <div>
        <p className={styles.p_user}>CPETCAM</p>
        </div>
        <button className={styles.signout_btn} onClick={() => signOut()}>
          Logout
        </button>
      </nav>
    );
  }
};

export default Navbar;
