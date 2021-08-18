import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'
import styles from '@/styles/Layout.module.css'
import Footer from './Footer'
import Showcase from './Showcase'

const Layout = ({children, title, keyword, description}) => {

    const router = useRouter()

    return (
        <div>
            
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keyword} />
                <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css' />

            </Head>

            <Header />
            {router.pathname === '/' && <Showcase />}
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