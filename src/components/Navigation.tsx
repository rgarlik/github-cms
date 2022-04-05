import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Navbar, Container, Button } from 'rbx';
import Link from 'next/link';

type NavigationProps = {
  showSaveButton?: boolean | null;
  disabledSaveButton?: boolean | null;
  onClickNext?: () => void | null;
};

const Navigation: React.FC<NavigationProps> = (
  elementProps: NavigationProps,
) => {
  let rightSideOfMenu: JSX.Element;

  const [nextDisabled, setNextDisabled] = useState(true);

  useEffect(() => setNextDisabled(elementProps.disabledSaveButton), [
    elementProps.disabledSaveButton,
  ]);

  if (elementProps.showSaveButton) {
    rightSideOfMenu = (
      <Navbar.Segment align="end">
        <Navbar.Item>
          <Button
            disabled={nextDisabled}
            onClick={elementProps.onClickNext}
            size="medium"
            color="info"
          >
            Next
          </Button>
        </Navbar.Item>
      </Navbar.Segment>
    );
  }

  return (
    <Navbar
      style={{ height: `5rem`, marginBottom: `1rem` }}
      className="navigation"
    >
      <Container>
        <>
          <Navbar.Brand>
            <Link href="/" passHref>
              <Navbar.Item>
                <img
                  src="https://bulma.io/images/bulma-logo.png"
                  alt=""
                  role="presentation"
                  width="112"
                  height="28"
                />
              </Navbar.Item>
            </Link>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu>{rightSideOfMenu}</Navbar.Menu>
        </>
      </Container>
      <style jsx>
        {`
          .navigation {
            font-family: 'Roboto', sans-serif;
          }
        `}
      </style>
    </Navbar>
  );
};

export default Navigation;
