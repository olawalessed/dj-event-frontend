import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import { Container, Grid, Card, Form } from "semantic-ui-react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

  const handleSubmit = (e) => {
      e.preventDefault();
      
      if (password !== passwordConfirm) {
          toast.error('Password do not match')
      }

    console.log(username, email, password)
  }

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Create account
        </h1>
        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="email">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={styles.label} htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={styles.label} htmlFor="password">
           Confirm Password
          </label>
          <input
            type="password"
            id="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <input className="btn" type="submit" value="Login" />
        </form>
        <div className={styles.div}>
          <p>
            I have an account?
            <Link href="/account/login">
              <a> Sign in</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
