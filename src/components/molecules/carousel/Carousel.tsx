import axios from 'axios';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebounce, useIntersectionObserverRef } from 'rooks';
import CarouselImage from './CarouselImage';

export interface ImageDataset {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  favorite?: boolean;
}

export const ImageAPIBaseUrl = 'https://jsonplaceholder.typicode.com';

export interface CarouselProps {
  data?: ImageDataset[];
}

const Carousel: React.FC<CarouselProps> = ({
  data: imgData,
}: PropsWithChildren<CarouselProps>): JSX.Element => {
  let renderedIntersectionRefElement = false;
  const [triggerFetchImages, setTriggerFetchImages] = useState(true);
  const [jsonImgData, setJsonImgData] = useState(imgData ?? []);
  const onTriggerFetchImages = useDebounce(setTriggerFetchImages, 500);

  const onGalleryScrollBottomProximity = (
    entries: IntersectionObserverEntry[]
  ) => {
    console.log(entries[0].isIntersecting);
    if (entries[0].isIntersecting) {
      onTriggerFetchImages(true);
    }
  };

  const fetchImgData = useCallback(async () => {
    let httpStatus: number;

    try {
      const { data, status, statusText } = await axios.get(
        `${ImageAPIBaseUrl}/photos?_start=${jsonImgData.length}&_limit=50`
      );
      httpStatus = status;
      if (status === 200) {
        setJsonImgData([...jsonImgData, ...data]);
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
      setTriggerFetchImages(false);
    }
  }, [triggerFetchImages]);

  const [intersectingElementRef] = useIntersectionObserverRef(
    onGalleryScrollBottomProximity
  );

  useEffect(() => {
    if (triggerFetchImages) {
      fetchImgData();
    }
  }, [triggerFetchImages]);

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
                ref={
                  !renderedIntersectionRefElement && jsonImgData.length - i < 21
                    ? (() => {
                        renderedIntersectionRefElement = true;
                        return intersectingElementRef;
                      })()
                    : null
                }
                title={dataset.title}
                thumbnailUrl={dataset.thumbnailUrl}
              />
            ))
        : 'Loading images...'}
    </section>
  );
};

export default Carousel;
