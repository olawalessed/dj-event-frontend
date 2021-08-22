import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import { Container, Grid, Card, Form } from "semantic-ui-react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import AuthContext from '@/context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Pull out info from the AuthContext for the login page
  const { login, error } = useContext(AuthContext)
  
  useEffect(() => {
    error && toast.error(error)
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    login({email, password})
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        
        <form onSubmit={handleSubmit}>
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
          <input className="btn" type="submit" value="Login" />
        </form>
        <div className={styles.div}>
          <p>
            Don't have an account?
            <Link href="/account/register">
              <a>    Create Account</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
