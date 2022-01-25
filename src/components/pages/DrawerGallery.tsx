import React, { useState } from 'react';

import DrawerLayout from '../templates/DrawerLayout';
import { Carousel } from '../molecules';

const DrawerGallery: React.FC<{}> = () => {
  const [context, setContext] = useState<Carousel.Context.IProps>(
    Carousel.Context.InitialData
  );

  return (
    <Carousel.Context.Instance.Provider value={[context, setContext]}>
      <DrawerLayout drawer={<Carousel.Aside />}>
        <Carousel.Component />
      </DrawerLayout>
    </Carousel.Context.Instance.Provider>
  );
};

export default DrawerGallery;
