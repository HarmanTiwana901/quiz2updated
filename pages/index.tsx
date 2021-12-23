import type { NextPage } from 'next'
import { useRouter } from "next/router"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Flamingo } from "../utils/types"
import Link from "next/link"
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { connect } from "../utils/database";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
 
  
  if(session) {
    return (
      <div>
        Signed in as {session.user.name}
        <button className={styles.btn} onClick={() => router.push('/create')}>Create Car</button>
        <button className={styles.btn} onClick={() => signOut()}>Sign out</button>
      </div>
    )
  } else {
    return (
      <div>
        Currently Not Signed in.
        <br/><button className={styles.btn} onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }
}