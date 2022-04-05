import React from 'react';
import { GetStaticProps } from 'next';
import Navigation from '@/components/Navigation';
import { Container } from 'rbx';
import Unsplash from 'react-unsplash-wrapper';
import { getPostBySlug, markdownToHtml, getAllPosts } from 'lib/markdown-tools';
import Head from 'next/head';

const StoryBySlug: React.FC<any> = (params) => (
  <div className="story-by-slug">
    <Head>
      <title>
        {params.post.title} - Výroky Detí - Zbierka príbehov o tých najmenších
      </title>
    </Head>
    <Navigation />
    <Container>
      <div className="story-detail">
        <h1>{params.post.title}</h1>
        <div className="signature">
          <span>{params.post.author}</span>
        </div>
        <div className="unsplash-wrapper">
          <Unsplash height="400" expand photoId={params.post.coverImage} />
        </div>
        <div
          className="content"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: params.post.content }}
        />
      </div>
    </Container>

    <style jsx>
      {`
        .story-detail {
          padding: 1.5rem;
          margin-top: 1.5rem;
          font-size: 130%;
          line-height: 1.15;
          text-align: justify;
          font-weight: 200;
        }
        .story-detail img {
          margin-top: 0.3rem;
          margin-bottom: 0.3rem;
          margin-left: auto;
          margin-right: auto;
          display: block;
        }
        .story-detail .content {
          padding-top: 5rem;
          padding-bottom: 10px;
          font-family: 'Roboto Slab', serif;
          font-size: 140%;
        }
        .story-detail h1 {
          font-size: 450%;
          font-weight: 700;
          text-align: left;
          line-height: 0.8;
          padding-bottom: 1.5rem;
          letter-spacing: -4px;
          text-align: left;
        }
        .story-detail .signature {
          margin-top: 3rem;
          text-align: right;
          font-size: 100%;
          height: 1rem;
          font-style: italic;
          font-family: 'Roboto Slab', serif;
        }
        .story-detail .unsplash-wrapper {
          position: relative;
          width: 100%;
          height: 30vw;
          margin-top: 3rem;
        }
        .story-detail .signature span {
          margin-left: 0.7rem;
        }
      `}
    </style>
  </div>
);

export const getStaticProps: GetStaticProps = async (context) => {
  const post = getPostBySlug(context.params.slug, [
    `title`,
    `date`,
    `slug`,
    `author`,
    `content`,
    `coverImage`,
  ]);
  const content = await markdownToHtml(post.content || ``);
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getStaticPaths() {
  const posts = getAllPosts([`slug`]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default StoryBySlug;
