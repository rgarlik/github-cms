import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Container } from 'rbx';
import Navigation from '../components/Navigation';

const ThankYou: React.FC = () => (
  <div className="thank-you">
    <Head>
      <title>Thank you!</title>
    </Head>
    <Navigation />
    <Container>
      <h1>Thank you for your post!</h1>
      <p>Your post should be live really soon.</p>
    </Container>
    <style jsx>
      {`
        .thank-you {
          text-align: center;
        }

        .thank-you h1 {
          font-weight: 700;
          font-size: 130%;
        }
      `}
    </style>
  </div>
);

export default ThankYou;
