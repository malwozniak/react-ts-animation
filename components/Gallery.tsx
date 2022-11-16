import React, { FunctionComponent } from 'react'; // importing FunctionComponent

type GalleryItem = {
  title: string;
  image: string;
};

export const Gallery: FunctionComponent<GalleryItem> = ({ title, image }) => (
  <aside>
    <h2>{title}</h2>
    <img />
    {image}
  </aside>
);
