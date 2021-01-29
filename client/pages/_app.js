import { ToastProvider } from 'react-toast-notifications'
import Layout from '../components/layout/layout'
import {DataProvider} from '../store/GlobalState'

import '../styles/Global.css'


function MyApp({ Component, pageProps }) {
    return (
        <DataProvider>
            <ToastProvider autoDismiss={true} autoDismissTimeout="3000">
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ToastProvider>
        </DataProvider>
    )
}



export default MyApp