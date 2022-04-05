import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Container } from 'rbx';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SaveOverlay from '../components/SaveOverlay';

const API_PATH = `/api/newPost`;

const New: React.FC = () => {
  const [contentInputHeight, setContentInputHeight] = useState(250);
  const [contentTitleHeight, setContentTitleHeight] = useState(200);
  const [visibleSaveOverlay, setVisibleSaveOverlay] = useState(false);

  const [contentFilled, setContentFilled] = useState(false);
  const [contentText, setContentText] = useState(``);
  const [titleFilled, setTitleFilled] = useState(false);
  const [contentTitle, setContentTitle] = useState(``);
  const [displayingError, setDisplayingError] = useState(``);

  const [fetchPending, setFetchPending] = useState(false);

  const router = useRouter();

  const sendStory = async (signature: string) => {
    setFetchPending(true);
    setDisplayingError(``);

    const data = {
      title: contentTitle,
      content: contentText,
      signature,
    };

    const response = await fetch(API_PATH, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      router.push(`/thank-you`);
    } else {
      response.text().then((text) => setDisplayingError(text));
    }

    setFetchPending(false);
  };

  const contentInput = (event: any): void => {
    setContentText(event.target.value);
    if (event.target.scrollHeight > contentInputHeight) {
      setContentInputHeight(contentInputHeight + 50);
      window.scrollTo(0, window.scrollY + 50);
    }
    if (event.target.value === ``) {
      setContentFilled(false);
    } else if (!contentFilled) {
      setContentFilled(true);
    }
  };

  const titleInput = (event: any): void => {
    setContentTitle(event.target.value);
    if (event.target.scrollHeight > contentTitleHeight) {
      setContentTitleHeight(contentTitleHeight + 100);
    }
    if (event.target.value === ``) {
      setTitleFilled(false);
    } else if (!titleFilled) {
      setTitleFilled(true);
    }
  };

  const nextClick = (): void => {
    setVisibleSaveOverlay(true);
  };

  const closeOverlayClick = (): void => {
    setVisibleSaveOverlay(false);
  };

  return (
    <div className="new">
      <Head>
        <title>
          Nový príspevok - Výroky Detí - Zbierka príbehov o tých najmenších
        </title>
      </Head>
      <SaveOverlay
        sendingFetch={fetchPending}
        overlayCloseClick={closeOverlayClick}
        visible={visibleSaveOverlay}
        onSendPost={sendStory}
        displayingError={displayingError}
      />
      <Navigation
        disabledSaveButton={!(contentFilled && titleFilled)}
        showSaveButton
        onClickNext={nextClick}
      />
      <Container>
        <div className="story-detail">
          <textarea
            style={{ height: contentTitleHeight }}
            className="headerInput"
            onInput={titleInput}
            placeholder="Write your title here"
          />
          <textarea
            style={{ height: contentInputHeight }}
            onInput={contentInput}
            placeholder="Write the contents of your blog post here"
            className="content"
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
          }
          .story-detail img {
            margin-top: 0.3rem;
            margin-bottom: 0.3rem;
            margin-left: auto;
            margin-right: auto;
            display: block;
          }
          .story-detail .content {
            overflow: hidden;
            padding-top: 2vw;
            padding-bottom: 10px;
            font-family: 'Roboto Slab', serif;
            font-size: 140%;
            width: 100%;
            outline: none;
            border: none;
            resize: none;
            margin-bottom: 3rem;
          }
          .story-detail .headerInput {
            border: none;
            outline: none;
            font-size: 450%;
            font-weight: 700;
            text-align: left;
            line-height: 0.8;
            width: 100%;
            padding-bottom: 1.5rem;
            letter-spacing: -4px;
            resize: none;
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
          @media only screen and (max-width: 650px) {
            .story-detail .headerInput {
              font-size: 250%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default New;
