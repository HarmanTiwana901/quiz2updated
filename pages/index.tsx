import type { NextPage } from 'next'
import { useRouter } from "next/router"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Flamingo } from "../utils/types"
import Link from "next/link"
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
 
  
  if(session) {
    const addUser = () => {
      let user = {email: session.user.email, name: session.user.name}
      fetch("http://localhost:3000/api/flamingo", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
      );
    }
    addUser();
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

