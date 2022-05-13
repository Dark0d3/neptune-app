import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

export default function Home() {

  const { user } = useUser();
  const router = useRouter()

  if(user !== undefined) {
    router.push('/dashboard')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Neptune</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.content}>
        <div className={styles.content__logo}>
          <Image
            priority
            src="/images/NEPTUNE.png"
            // className={utilStyles.borderCircle}
            height={400}
            width={400}
            alt={"Neptune Logo"}
          />
        </div>
        <a 
          href="/api/auth/login"
          className={styles.content__login}>
            <div className={styles.content__login__link}>
              LOGIN
            </div>
        </a>
      </div>
    </div> 
  ) 
}
