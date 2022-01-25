import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Carousel } from '../molecules';
import { ImageDataset } from '../molecules/Carousel/DataSchema';
import DrawerLayout from '../templates/DrawerLayout';

const DrawerGallery: React.FC<{}> = () => {
  const [context, setContext] = useState<Carousel.Context.IProps>(
    Carousel.Context.InitialData
  );
  const queryClient = useQueryClient();

  return (
    <Carousel.Context.Instance.Provider value={[context, setContext]}>
      <DrawerLayout drawer={<Carousel.Aside />}>
        <Carousel.Component
          data={
            (queryClient.getQueryState('images')?.data as ImageDataset[]) || []
          }
        />
      </DrawerLayout>
    </Carousel.Context.Instance.Provider>
  );
};

export default DrawerGallery;
