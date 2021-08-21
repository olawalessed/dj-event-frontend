import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import SearchBar from './SearchBar'
import { FaPlus, FaSignInAlt, FaMap, FaSignOutAlt, FaHome } from 'react-icons/fa'
import { Button } from 'semantic-ui-react'
import AuthContext from '@/context/AuthContext'
import {useContext} from 'react'

const Header = () => {
  const {user, logout } = useContext(AuthContext)

    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <h3>DJ Events</h3>
          </Link>
        </div>
        <SearchBar />
        <nav>
          <ul>
            <li>
              <Link href="/events">
                <a>
                  <span className={styles.icon}>
                    <FaMap />
                  </span>
                  Events
                </a>
              </Link>
            </li>

            {user ? (
              //If logged in
              <>
                <li>
                  <Link href="/events/add">
                    <a>
                      <span className={styles.icon}>
                        <FaPlus />
                      </span>
                      Add Event
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/account/dashboard">
                    <a>
                      <span className={styles.icon}>
                        <FaHome />
                      </span>
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li>
                  <Button secondary onClick={() => logout()}>
                    <span className={styles.icon}>
                      <FaSignOutAlt />
                    </span>
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              //If logged out
              <>
                <li>
                  <Link href="/account/login">
                    <Button secondary>
                      <span className={styles.icon}>
                        <FaSignInAlt />
                      </span>
                      Login
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    );
}

export default Header