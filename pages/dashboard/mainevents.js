import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useTable } from "react-table";
import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Layout from '../../components/Layout/Layout'
import LargeModal from '../../components/modal/largeModal'
import SendMessageModal from "../../components/modal/sendMessageModal";

import styles from '../../styles/Subevents.module.css'

const QUERY = gql`
  query getCurrentEvents{
    current_events {
      _id
      event_type
      location_frequency
      locations
    }
  }
`;

export default function Mainevents() {

    const [largeModalData, updateLargeModalData] = useState(null)
    const [showLargeModal, updateShowLargeModal] = useState(0)

    const { user } = useUser();
    const router = useRouter()
    const home=`neptune-app.vercel.app`

    const { data: apiData } = useQuery(QUERY);

    const toggleShowLargeModal = () => {
      updateShowLargeModal(!showLargeModal)
    }

    const showMessageModal = ( location, event ) => {
        updateLargeModalData(
            <SendMessageModal 
                location={location} 
                event={event} 
                onConfirmHandler={(phone, body) => {
                    sendMessage(phone, body)
                }}
                _close={() => {
                    updateLargeModalData(null)
                    updateShowLargeModal(0)
                }}
                />
        )
        toggleShowLargeModal()
        
    }

    const sendMessage = async (phone, body) => {
        const res = await fetch("/api/sendMessage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ to: phone, body: body }),
        });
      
        const data = await res.json();
    
        if (data.success) {
            console.log("Success")
        } else {
            console.log("Error")
        }
    }

    const data = React.useMemo(
        () => {
            return apiData!=null ? apiData.current_events.map((event, index) => {
                if(parseInt(event.location_frequency[0])<40) {
                    return {}
                }
                return {
                    col1: index+1,
                    col2: event.locations[0],
                    col3: event.event_type,
                    col4: event.location_frequency[0],
                    col5:   <div className={styles.subevents__table__action}>
                                <button 
                                    className={styles.subevents__table__action__button}
                                    onClick={() => showMessageModal(event.locations[0], event.event_type)}>
                                    Send Alert
                                </button>
                                <a 
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className={styles.subevents__table__action__link}
                                    href={`https://twitter.com/share?url=${home}&text=${event.event_type}%20reported%20in%20${event.locations[0]}`}>
                                        Tweet
                                    </a>
                            </div>
                } 
            }) : [] 
        },   
        [apiData]
      )

    const columns = React.useMemo(
        () => [
            {
            Header: '#',
            accessor: 'col1',
            },
            {
            Header: 'Location',
            accessor: 'col2',
            },
            {
                Header: 'Type',
                accessor: 'col3',
            },
            {
                Header: 'Tweet Frequency',
                accessor: 'col4',
            },
            {
                Header: 'Action',
                accessor: 'col5',
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })

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
            <div className={styles.subevents}>
                <div className={styles.subevents__head}>
                    Events
                </div>
                <div className={styles.subevents__table}>
                    <table 
                        {...getTableProps()} 
                        style={{ 
                            width: "100%", 
                            backgroundColor: "#FFFFFF",
                            border: 'solid 1px #D8D8D8', 
                            borderRadius: "8px",
                            marginTop: "1rem" 
                        }}>
                        <thead>
                            {headerGroups.map(headerGroup => ( 
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        fontSize: "16px",
                                        padding: "4px 0",
                                        color: "#2A2945",
                                        opacity: "0.7",
                                        fontWeight: "700",
                                        borderBottom: "solid 1px #D8D8D8"
                                    }}
                                >
                                    {column.render('Header')}
                                </th>
                                ))}
                            </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row, index) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} style={index%2 === 1? { backgroundColor: "#F8F8F8"} : null}>
                                {row.cells.map(cell => {
                                    return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            textAlign: 'center',
                                            height: "64px",
                                            fontSize: "1rem",
                                            fontWeight: "500"
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                    )
                                })}
                                </tr>
                            )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <LargeModal show={showLargeModal} clicked={toggleShowLargeModal}>
                {largeModalData}
            </LargeModal>
        </Layout>
        </div> 
    ) 
}
