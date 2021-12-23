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



function Create(props) {
  const { flamingos } = props
  const { data: session } = useSession()
  const router = useRouter()
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const nameChange = (e: {target: {value: any; }}) => {
    const value = e.target.value;
    setName(value);
  }
  
  const colorChange = (e: {target: {value: any; }}) => {
    const value = e.target.value;
    setColor(value);
  }

  if(session) {
    
  const create = () => {
    // create a piece of data
    let car = { name: name, color: color, byUser: session.user.name}
    fetch("http://localhost:3000/api/flamingo", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(car)
      }
      );
      alert("Car Created!");
}

    return (
        <div>
          <h1>Create Car</h1>
          <h5>Logged in as {session.user.name}</h5>
          <input type="text" onChange={nameChange} placeholder="Car Name"></input><br/>
          <input type="text" onChange={colorChange} placeholder="Car Color"></input><br/>
          <button onClick={create} type="button">Create</button>
    
          <button onClick={() => router.push('/show')}>View Cars</button>
          {props.data}
        </div> 
      ) 
  } else {
    return (
        <div>
          <h1>Please Login</h1>
          
        </div> 
      )
  }
}

export default Create;