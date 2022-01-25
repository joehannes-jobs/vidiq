import axios from 'axios';
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDebounce, useIntersectionObserverRef } from 'rooks';
import CarouselImage from './CarouselImage';
import { Instance as CurrentImageContext } from './Context';

interface ImageDataset {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  favorite?: boolean;
}

export const API = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
};

interface IProps {
  data?: ImageDataset[];
}

const Carousel: React.FC<IProps> = ({
  data: imgData,
}: PropsWithChildren<IProps>) => {
  let renderedIntersectionRefElement = false;
  const [triggerFetchImages, setTriggerFetchImages] = useState(true);
  const [jsonImgData, setJsonImgData] = useState(imgData ?? []);
  const [, setCurrentImageContext] = useContext(CurrentImageContext);

  const onTriggerFetchImages = useDebounce(setTriggerFetchImages, 500);

  const onGalleryScrollBottomProximity = (
    entries: IntersectionObserverEntry[]
  ) => {
    if (entries[0].isIntersecting) {
      onTriggerFetchImages(true);
    }
  };

  const fetchImgData = useCallback(async () => {
    let httpStatus: number;

    try {
      const { data, status, statusText } = await axios.get(
        `${API.BASE_URL}/photos?_start=${jsonImgData.length}&_limit=50`
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
                  carousel carousel-center carousel-vertical`}
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
                onClick={() =>
                  setCurrentImageContext({
                    currentImgSrc: dataset.url,
                    currentImgTitle: dataset.title,
                  })
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
