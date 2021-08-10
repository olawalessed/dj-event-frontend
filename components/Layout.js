import Head from 'next/head'
import Header from './Header'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'

const Layout = ({children, title, keyword, description}) => {
    return (
        <div>
            
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keyword} />
            </Head>

            <Header />
            <div className={styles.container}>
            {children}
            </div>

            <Footer />
            
        </div>
    )
}

export default Layout


Layout.defaultProps = {
    title: 'DJ Events | Find the hottest parties',
    description: 'FInd the latest DJ and other musical events',
    keywords: 'music, dj, edm'
}