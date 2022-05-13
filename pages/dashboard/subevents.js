import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useTable } from "react-table";
import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Layout from '../../components/Layout/Layout'

import styles from '../../styles/Subevents.module.css'

const QUERY = gql`
  query getCurrentEvents{
    help_tweets(query: {status: "1"}) {
        _id
        location
        status
        timestamp
        tweet
        tweet_id
    }
  }
`;

const DELETE_REQUEST = gql`
    mutation updateRequest($tweet: String){
        updateOneHelp_tweet(query: {tweet: $tweet}, set: {status: "2"}) {
            _id
            location
            status
            timestamp
            tweet
        }
    }
`;

export default function Subevents() {

    const { user } = useUser();
    const router = useRouter()

    const { data: apiData, refetch } = useQuery(QUERY);
    const [resolveRequest] = useMutation(DELETE_REQUEST, {
        onCompleted : () => {
            refetch()
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const data = React.useMemo(
        () => {
            return apiData!=null ? apiData.help_tweets.map((help_tweet, index) => {
                return {
                    col1: index+1,
                    col2: help_tweet.tweet,
                    col3: help_tweet.location,
                    col4: <div className={styles.subevents__table__action}>
                                <button
                                    className={styles.subevents__table__action__button}
                                    onClick={() => {
                                        resolveRequest({
                                            variables: {
                                                tweet: help_tweet.tweet
                                            }
                                        })
                                    }}
                                >Resolve</button>
                                {
                                    help_tweet.tweet_id!=="" ? 
                                        <a 
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className={styles.subevents__table__action__link}
                                            href={`https://twitter.com/intent/tweet?in_reply_to=${help_tweet.tweet_id}&text=Neptune%20system%20is%20aware%20of%20the%20incident%20and%20will%20respond%20shortly`}>
                                                Respond
                                        </a>
                                        : null
                                }
                                
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
            Header: 'Tweet',
            accessor: 'col2',
            },
            {
                Header: 'Location',
                accessor: 'col3',
            },
            {
                Header: 'Action',
                accessor: 'col4',
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
                    Subevents
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
                                            textAlign: 'left',
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
        </Layout>
        </div> 
    ) 
}
