import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" className="scroll-smooth">
                <Head>
                    <title>Repack</title>
                    <meta name="description" content="Checkout our cool page" key="desc" />
                    <meta property="og:title" content="Repack AI Tool" />
                    <meta
                        property="og:description"
                        content="And a social description for our cool page"
                    />
                    <meta
                        property="og:image"
                        content="https://images.unsplash.com/photo-1669178197999-32178a532277?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8UzRNS0xBc0JCNzR8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                    />
                </Head>
                <body className="loading bg-white dark:bg-[#293C4A] dark:text-white text-[#293C4A]">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
