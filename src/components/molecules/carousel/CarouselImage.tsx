import React, { RefAttributes, PropsWithRef } from 'react';
import styled from 'styled-components';

const Thumbnail = styled.div`
  width: 150px;
  height: 150px;
`;

export interface CarouselImageProps {
  title: string;
  thumbnailUrl: string;
}

const CarouselImage: React.ForwardRefExoticComponent<
  CarouselImageProps & RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, CarouselImageProps>(
  (
    { title, thumbnailUrl: url }: PropsWithRef<CarouselImageProps>,
    ref: React.Ref<HTMLDivElement> = null
  ): JSX.Element => (
    <Thumbnail ref={ref ?? undefined} className={`carousel-item`}>
      <img src={url} alt={title} />
    </Thumbnail>
  )
);
CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
