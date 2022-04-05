import React, { useState, useEffect } from 'react';
import { Message, Delete, Input, Checkbox, Label, Button } from 'rbx';

type SaveOverlayProps = {
  visible: boolean;
  overlayCloseClick: () => void;
  onSendPost: (signature: string) => void;
  sendingFetch: boolean;
  displayingError: string;
};

const SaveOverlay: React.FC<SaveOverlayProps> = (
  componentProps: SaveOverlayProps,
) => {
  const [filledSignature, setFilledSignature] = useState(false);
  const [stateVisible, setStateVisible] = useState(false);
  const [signatureText, setSignatureText] = useState(``);
  const [sendingFetch, setSendingFetch] = useState(false);
  const [displayingError, setDisplayingError] = useState(``);

  const inputSignatureChange = (e: any): void => {
    setSignatureText(e.target.value);
    if (e.target.value !== ``) {
      setFilledSignature(true);
    } else if (filledSignature === true) {
      setFilledSignature(false);
    }
  };

  const sendClicked = (): void => {
    componentProps.onSendPost(signatureText);
  };

  useEffect(() => setStateVisible(componentProps.visible), [
    componentProps.visible,
  ]);

  useEffect(() => setDisplayingError(componentProps.displayingError), [
    componentProps.displayingError,
  ]);

  useEffect(() => setSendingFetch(componentProps.sendingFetch), [
    componentProps.sendingFetch,
  ]);

  return (
    <div
      style={{ display: stateVisible ? `flex` : `none` }}
      className="save-overlay"
    >
      <div className="message-wrapper">
        <Message>
          <Message.Header
            style={{ backgroundColor: `whitesmoke`, color: `black` }}
          >
            <p>Saving your blog post</p>
            <Delete onClick={componentProps.overlayCloseClick} as="button" />
          </Message.Header>
          <Message.Body>
            <p>
              Enter the name under which you'd like to author your post:
            </p>
            <Input
              onChange={inputSignatureChange}
              disabled={sendingFetch}
              type="text"
              placeholder="Your name"
            />
            <br />
            <br />
            <Button
              disabled={
                !(filledSignature)
              }
              color="info"
              className="send-story"
              size="medium"
              onClick={sendClicked}
              state={sendingFetch ? `loading` : `active`}
            >
              Save blog post
            </Button>
            

            {displayingError === `` ? (
              ``
            ) : (
              <Message style={{ marginTop: `10px` }} color="danger">
                <Message.Body>`${displayingError}`</Message.Body>
              </Message>
            )}
          </Message.Body>
        </Message>
      </div>
      <style jsx>
        {`
          .save-overlay {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(3px);
          }
          .save-overlay p {
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .save-overlay .message-wrapper {
            width: 60%;
          }
          @media only screen and (max-width: 768px) {
            .save-overlay .message-wrapper {
              width: 80%;
            }
          }
          @media only screen and (max-width: 450px) {
            .save-overlay .message-wrapper {
              width: 95%;
            }
          }
          .save-overlay .send-story {
            margin-top: 20px;
          }
          .save-overlay .message-header {
            color: black !important;
          }
          .save-overlay .message {
            box-shadow: 0px 0px 10px 0px rgba(32, 156, 238, 1);
          }
        `}
      </style>
    </div>
  );
};

export default SaveOverlay;
