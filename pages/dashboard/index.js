import Head from 'next/head'
import dynamic from "next/dynamic";
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Layout from '../../components/Layout/Layout'

import styles from '../../styles/Dashboard.module.css'

export default function Dashboard() {

    const MapWithNoSSR = dynamic(() => import("../../components/Map/Map"), {
        ssr: false
      });

    const { user } = useUser();
    const router = useRouter()

    

    useEffect(() => {
        if(user === undefined) {
            router.push('/') 
        }
    }, []) 

    return (
        <div className={styles.container}>
        <Head>
            <title>Neptune Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <div className={styles.map}>
                {/* <ClientOnly> */}
                    <MapWithNoSSR />
                {/* </ClientOnly> */}
            </div>
        </Layout>
        </div> 
    ) 
}
