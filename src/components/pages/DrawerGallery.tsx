import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Carousel } from '../molecules';
import { ImageDataset } from '../molecules/Carousel/DataSchema';
import DrawerLayout from '../templates/DrawerLayout';

const DrawerGallery: React.FC<{}> = () => {
  const [initialised, setInitialised] = useState(false);
  const [context, setContext] = useState<Carousel.Context.IProps>(
    Carousel.Context.InitialData
  );
  const queryClient = useQueryClient();
  const onInit = async () => {
    const _data = await queryClient.getQueryData<ImageDataset[]>('images');
    setData(_data);
    setInitialised(true);
  };
  const [data, setData] = useState<ImageDataset[] | undefined>([]);

  useEffect(() => {
    onInit();
  }, []);

  if (!initialised) {
    return <div>Loading...</div>;
  }

  return (
    <Carousel.Context.Instance.Provider value={[context, setContext]}>
      <DrawerLayout drawer={<Carousel.Aside />}>
        <Carousel.Component data={data} />
      </DrawerLayout>
    </Carousel.Context.Instance.Provider>
  );
};

export default DrawerGallery;
