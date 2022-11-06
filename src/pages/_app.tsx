import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import Head from 'next/head';
import Providers from '@partials/_app/providers/_Providers';
import PageElements from '@partials/_app/page-elements/_PageElements';

export default function App({
    Component,
    pageProps,
}: AppProps<{ title?: string }>) {
    const pageTitle = useMemo(() => {
        let title = `Open Challenge`;
        if (pageProps.title) {
            title += ` - ${pageProps.title}`;
        }
        return title;
    }, [pageProps.title]);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, user-scalable=0, width=device-width, shrink-to-fit=no"
                />
            </Head>
            <Providers>
                <PageElements>
                    <Component {...pageProps} />
                </PageElements>
            </Providers>
        </>
    );
}
