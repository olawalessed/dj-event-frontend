import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import SearchBar from './SearchBar'
import { FaPlus, FaMap } from 'react-icons/fa'

const Header = () => {
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
              <Link href="/events/add">
                <a>
                  <span className={styles.icon}>
                    <FaPlus />
                  </span>
                  Add Event
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
}

export default Header