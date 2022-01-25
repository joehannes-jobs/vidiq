import React, { RefAttributes, PropsWithRef } from 'react';
import styled from 'styled-components';

const Thumbnail = styled.div`
  width: 150px;
  height: 150px;
`;

export interface CarouselImageProps {
  title: string;
  thumbnailUrl: string;
  onClick: () => void;
}

const CarouselImage: React.ForwardRefExoticComponent<
  CarouselImageProps & RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, CarouselImageProps>(
  (
    { onClick, title, thumbnailUrl: url }: PropsWithRef<CarouselImageProps>,
    ref: React.Ref<HTMLDivElement>
  ): React.ReactElement => (
    <Thumbnail
      ref={ref ?? undefined}
      onClick={onClick}
      className={`carousel-item cursor-pointer`}
    >
      <img src={url} alt={title} />
    </Thumbnail>
  )
);
CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
