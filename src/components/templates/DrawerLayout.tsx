import React, { useContext, useEffect, useState } from 'react';
import { useMediaMatch } from 'rooks';
import styled from 'styled-components';
import { Carousel } from '../molecules/';

const Main = styled.main`
  background-color: #000000;
  background-image: url('/assets/images/colorful_explosion_darkbg.jpg');
`;

interface DrawerAsideProps {
  isPortrait: boolean;
  isMobile: boolean;
}

export const DrawerAside = styled.aside`
  &.ooooopen {
    --tw-translate-x: 0px !important;
  }

  background: ${(props: DrawerAsideProps) => {
    return props.isPortrait || props.isMobile
      ? '#000000'
      : 'url(/assets/images/lifeincolor.webp)';
  }};
`;

interface DrawerLayoutProps {
  drawer: React.ReactNode;
}

const DrawerLayout: React.FC<DrawerLayoutProps> = ({ drawer, children }) => {
  const [{ currentImgSrc: src }] = useContext(Carousel.Context.Instance);
  const [isOpen, setIsOpen] = useState(false);
  const isPortrait = useMediaMatch('(orientation: portrait)');
  const isMobile = useMediaMatch('(max-width: 768px)');

  useEffect(() => setIsOpen(src.length > 0), [src]);

  return (
    <article
      className={`drawer ${
        isPortrait ? 'drawer-mobile' : ''
      } landscape:auto-cols-auto landscape:grid-rows-1`}
    >
      <input
        type="checkbox"
        className="drawer-toggle"
        defaultChecked={isOpen || !isPortrait}
      />
      <DrawerAside
        isMobile={isMobile}
        isPortrait={isPortrait}
        className={`drawer-side !bg-cover !bg-no-repeat ${
          isPortrait && isOpen ? 'mr-0' : 'mr-[150px]'
        } lg:mr-[180px]`}
      >
        {/* @TODO: some kind of close button */}
        {drawer}
      </DrawerAside>
      <Main
        className={`flex flex-col portrait:w-full ${
          isPortrait && isOpen ? '!w-0' : ''
        } lg:pr-10 from-transparent portrait:items-center items-end justify-center drawer-content landscape:max-w-[180px] justify-self-end border-l-2 border-black border-double`}
      >
        {children}
      </Main>
    </article>
  );
};

export default DrawerLayout;
