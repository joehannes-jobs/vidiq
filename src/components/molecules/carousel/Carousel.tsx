import React, {
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react';
import CarouselImage from './CarouselImage';
import axios from 'axios';

export interface ImageDataset {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  favorite?: boolean;
}

export const ImageAPIBaseUrl = 'http://jsonplaceholder.typicode.com';

export interface CarouselProps {
  data?: ImageDataset[];
}

const Carousel: React.FC<CarouselProps> = ({
  data: imgData,
}: PropsWithChildren<CarouselProps>): JSX.Element => {
  const [jsonImgData, setJsonImgData] = useState(imgData ?? []);

  const fetchImgData = useCallback(async () => {
    let httpStatus: number;

    try {
      const { data, status, statusText } = await axios.get(
        `${ImageAPIBaseUrl}/photos`
      );
      httpStatus = status;
      if (status === 200) {
        setJsonImgData(data);
      } else {
        console.warn(`http status diverging from 200: ${status}`);
        console.log(`status: ${status}`);
        console.log(`statusText: ${statusText}`);
      }
    } catch (error) {
      console.warn(`http error: ${error}`);
    } finally {
      console.debug(
        `Finished fetching img-data ${
          // @ts-ignore
          httpStatus === 200 ? 'successfully' : 'with problems'
          // @ts-ignore
        }: ${httpStatus}`
      );
    }
  }, []);

  useEffect(() => {
    fetchImgData();
  }, []);

  return (
    <section
      className={`w-auto h-screen
                  carousel carousel-center
                  portrait:carousel-vertical
                  landscape:md:carousel-vertical`}
    >
      {jsonImgData.length
        ? jsonImgData
            .filter((dataset: ImageDataset) => dataset.favorite !== false)
            .map((dataset: ImageDataset, i: number) => (
              <CarouselImage
                key={`album-${dataset.albumId}-img-${dataset.id}`}
                albumId={dataset.albumId}
                id={dataset.id}
                title={dataset.title}
                thumbnailUrl={dataset.thumbnailUrl}
              />
            ))
        : 'Loading images...'}
    </section>
  );
};

export default Carousel;
