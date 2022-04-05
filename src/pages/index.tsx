import React from 'react';
import Head from 'next/head';
import { getAllPosts } from 'lib/markdown-tools';
import Navigation from '@/components/Navigation';
import Tile from '@/components/Tile';
import Link from 'next/link';

import { Column } from 'rbx';

const Home: React.FC<any> = (params) => {
  const calculateClassAtRow = (
    row: number,
  ): `three-fifths` | `two-fifths` | `half` => {
    if (row % 3 === 0.5) {
      return `three-fifths`;
    }
    if (row % 3 === 1.5) {
      return `two-fifths`;
    }
    return `half`;
  };

  const blogListArray = [];
  blogListArray.push(
    <Column.Group>
      <Column size="two-fifths">
        <Link href="/new">
          <button type="button" className="newPostBtn">
            <h1
              style={{
                fontSize: `2rem`,
                textAlign: `center`,
                lineHeight: `2rem`,
              }}
            >
              Add post
            </h1>
            <h2
              style={{
                fontSize: `4rem`,
              }}
            >
              +
            </h2>
          </button>
        </Link>
      </Column>
      <Column>
        <Tile
          title={params.allPosts[0].title}
          description={params.allPosts[0].excerpt}
          slug={params.allPosts[0].slug}
          unsplashImage={params.allPosts[0].coverImage}
        />
      </Column>
      <style jsx>
        {`
          .newPostBtn {
            border-radius: 10px;
            background: linear-gradient(
              0deg,
              rgba(32, 156, 238, 1) 0%,
              rgba(115, 187, 235, 1) 100%
            );
            height: 15rem;
            width: 100%;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            line-height: 3rem;
            border: none;
            outline: none;
            transition: 0.5s all;
          }
          .newPostBtn:hover {
            box-shadow: 0px 0px 10px 0px rgba(32, 156, 238, 1);
            cursor: pointer;
            transform: scale(1.01);
            transition: 0.5s all;
          }
        `}
      </style>
    </Column.Group>,
  );

  for (let row = 1; row < params.allPosts.length; row += 1) {
    if (row + 1 < params.allPosts.length) {
      blogListArray.push(
        <Column.Group key={`group-${params.allPosts[row].slug}`}>
          <Column
            key={`col-${params.allPosts[row].slug}`}
            size={calculateClassAtRow(row / 2)}
          >
            <Tile
              key={`tile-${params.allPosts[row].slug}`}
              title={params.allPosts[row].title}
              description={params.allPosts[row].excerpt}
              slug={params.allPosts[row].slug}
              unsplashImage={params.allPosts[row].coverImage}
            />
          </Column>
          <Column key={`col-${params.allPosts[row + 1].slug}`}>
            <Tile
              key={`tile-${params.allPosts[row + 1].slug}`}
              title={params.allPosts[row + 1].title}
              description={params.allPosts[row + 1].excerpt}
              slug={params.allPosts[row + 1].slug}
              unsplashImage={params.allPosts[row + 1].coverImage}
            />
          </Column>
        </Column.Group>,
      );
      row += 1;
    } else {
      blogListArray.push(
        <Column.Group key={`group-${params.allPosts[row].slug}`}>
          <Column
            key={`col-${params.allPosts[row].slug}`}
            size={calculateClassAtRow(row / 2)}
          >
            <Tile
              key={`tile-${params.allPosts[row].slug}`}
              title={params.allPosts[row].title}
              description={params.allPosts[row].excerpt}
              slug={params.allPosts[row].slug}
              unsplashImage={params.allPosts[row].coverImage}
            />
          </Column>
        </Column.Group>,
      );
    }
  }
  return (
    <div className="container">
      <Head>
        <title>GitHub CMS</title>
      </Head>
      <main>
        <Navigation />
        <div className="tilemap">{blogListArray}</div>
      </main>

      <style jsx>
        {`
          @media only screen and (max-width: 1023px) {
            .tilemap {
              padding: 2rem;
            }
          }

          .tilemap {
            margin-bottom: 5rem;
          }
        `}
      </style>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticProps() {
  const allPosts = getAllPosts([
    `title`,
    `date`,
    `slug`,
    `author`,
    `coverImage`,
    `excerpt`,
  ]);

  return {
    props: { allPosts },
  };
}

export default Home;
