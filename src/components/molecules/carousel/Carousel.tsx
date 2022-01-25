import axios from 'axios';
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { QueryObserver, useQueryClient } from 'react-query';
import { useIntersectionObserverRef } from 'rooks';
import CarouselImage from './CarouselImage';
import { API } from './const';
import { Instance as CurrentImageContext } from './Context';
import { ImageDataset } from './DataSchema';

interface IProps {
  data?: ImageDataset[];
}

const Carousel: React.FC<IProps> = ({
  data: cachedData,
}: PropsWithChildren<IProps>) => {
  let renderedIntersectionRefElement = false;
  const queryClient = useQueryClient();
  const queryObserver = new QueryObserver(queryClient, { queryKey: 'images' });
  const [triggerFetchImages, setTriggerFetchImages] = useState(
    !cachedData?.length
  );
  const [jsonImgData, setJsonImgData] = useState(cachedData ?? []);
  const [, setCurrentImageContext] = useContext(CurrentImageContext);

  const onGalleryScrollBottomProximity = (
    entries: IntersectionObserverEntry[]
  ) => {
    if (entries[0].isIntersecting) {
      setTriggerFetchImages(true);
    }
  };

  const [intersectingElementRef] = useIntersectionObserverRef(
    onGalleryScrollBottomProximity
  );

  const onTriggerFetchImages = async () => {
    queryClient.invalidateQueries('images');
    await queryClient.fetchQuery('images', async () => {
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

        return [...jsonImgData, ...data];
      } catch (error) {
        console.warn(`http error: ${error}`);

        return [...jsonImgData];
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
    });
  };

  useEffect(() => {
    if (triggerFetchImages) {
      onTriggerFetchImages();
    }
  }, [triggerFetchImages]);

  useEffect(() => {
    const unsusbscribeImagesQuery = queryObserver.subscribe(result => {
      if (result.isSuccess) {
        setJsonImgData(result.data as ImageDataset[]);
      }
    });

    return unsusbscribeImagesQuery;
  }, []);

  return (
    <section
      className={`w-auto h-screen
                  carousel carousel-center carousel-vertical`}
    >
      {jsonImgData.length
        ? jsonImgData
            // .filter((dataset: ImageDataset) => dataset.favorite !== false)
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
                    favorite: dataset.favorite,
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
