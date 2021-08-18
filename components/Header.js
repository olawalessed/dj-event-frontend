import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import SearchBar from './SearchBar'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
            <Link href='/'>
                <h3>DJ Events</h3>
            </Link>

            </div>
            <SearchBar />
            <nav>
                <ul>
                    <li>
                        <Link href='/events'>
                            <a>Events</a>
                        </Link>
                        <Link href='/events/add'>
                            <a>Add Event</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header