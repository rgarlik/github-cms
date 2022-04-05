import React from 'react';
import Link from 'next/link';
import Unsplash from 'react-unsplash-wrapper';

// Props of the Tile component
type TileProps = {
  // The ID of the article that this tile represents. Used to route to the correct URL
  slug: string;

  // Article title
  title: string;

  // A short paragraph containing the first few lines of the article
  description: string;

  // ID of the main decorative image
  unsplashImage: string;
};

const Tile: React.FC<TileProps> = (componentProps) => (
  <Link href={`story/${componentProps.slug}`}>
    <div className="tile">
      <Unsplash
        style={{
          height: `15rem`,
          backgroundColor: `grey`,
          borderRadius: `10px`,
          boxShadow: `1px 5px 10px 0px rgba(0, 0, 0, 0.3)`,
          display: `flex`,
          justifyContent: `center`,
          alignItems: `left`,
          padding: `15px`,
          flexDirection: `column`,
          width: `100%`,
        }}
        photoId={componentProps.unsplashImage}
      >
        <div className="overlay">
          <h1>{componentProps.title}</h1>
        </div>
        <p>{componentProps.description}</p>
      </Unsplash>
      <style jsx>
        {`
          .tile {
            transition: 0.5s all;
          }
          .tile h1 {
            font-size: 250%;
            text-align: left;
            color: white;
            line-height: 80%;
            text-shadow: 0px 0px 20px rgba(0, 0, 0, 1);
          }

          .tile p {
            padding-top: 1rem;
            font-size: 115%;
            color: white;
            line-height: 115%;
            z-index: 1;
            text-shadow: 0px 0px 20px rgba(0, 0, 0, 1);
          }
          .tile:hover {
            cursor: pointer;
            transform: scale(1.01);
            transition: 0.5s all;
          }

          @media only screen and (max-width: 630px) {
            .tile h1 {
              font-size: 150%;
              font-weight: bold;
            }

            .tile p {
              font-size: 100%;
            }
          }
        `}
      </style>
    </div>
  </Link>
);

export default Tile;
