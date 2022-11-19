import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head />
                <body className='loading bg-white dark:bg-[#293C4A] dark:text-white text-[#293C4A]'>
                    <img src='/bg.png' alt='favicon' className='bg-image' loading='lazy' />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
