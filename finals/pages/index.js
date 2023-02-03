import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Link from "next/link";
import styles from "../styles/motion.module.css";

const SERVER_HOST = "http://localhost:3000";

export const getStaticProps = async () => {
  const res = await fetch(`${SERVER_HOST}/api/motion`);
  const data = await res.json();

  return {
    props: { motions: data },
  };
};

const motion = ({ motions }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>CPETCAM</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main className={styles.main}>
          <Navbar />

          <div className={styles.motions_div}>
          <img src="/Logo.svg" alt="" height={100} width={100} />

            <div className={styles.motion_links}>
              {motions.map((motion) => (
                <Link
                  className={styles.motion_link}
                  href={`/motion/${motion.id}`}
                  key={motion.id}
                >
                  {/* <p className={styles.motion_p}>
                    {motions.length != 0 ? motion.id + "/Motion" : "no data"}
                  </p> */}
                  <img
                    className={styles.motion_img}
                    src={`data:image/jpeg;base64,${Buffer.from(
                      motion.image,
                      "base64"
                    ).toString()}`}
                    height="70px"
                    width="120px"
                  />
                </Link>
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }
};

export default motion;