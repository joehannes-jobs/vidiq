import React, { PropsWithChildren } from 'react';

export interface CarouselImageProps {
  albumId: number;
  id: number;
  title: string;
  thumbnailUrl: string;
}

const CarouselImage: React.FC<CarouselImageProps> = ({
  albumId,
  id: imgId,
  title,
  thumbnailUrl: url,
}: PropsWithChildren<CarouselImageProps>): JSX.Element => (
  <div key={`album-${albumId}-img-${imgId}`} className={`carousel-item`}>
    <img src={url} alt={title} />
  </div>
);

export default CarouselImage;
