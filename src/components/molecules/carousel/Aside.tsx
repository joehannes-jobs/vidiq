import React, { useContext } from 'react';

import { Instance as Context } from './Context';

const Aside: React.FC = () => {
  const [{ currentImgSrc: src, currentImgTitle: title }, setImg] =
    useContext(Context);
  const isFavorite = false;
  return (
    <div className="flex items-center justify-center h-full w-full px-4 py-10 card">
      <div
        className="card glass md:card-side text-neutral-content opacity-90
        p-6"
      >
        <figure>
          <img
            src={
              src.length ? src : '/assets/images/colorful_explosion_darkbg.jpeg'
            }
            className="rounded-lg shadow-lg max-w-fit h-auto max-h-full"
          />
        </figure>
        <div className="max-w-xs card-body h-full !p-4 !landscape:pt-0 !pr-0">
          <h2 className="card-title">
            {title.length ? title : 'Choose wisely'}
          </h2>
          <div className="card-actions justify-self-start justify-center items-center h-full !landscape:-mt-8">
            <button
              className={`btn glass rounded-full text-7xl ${
                isFavorite ? 'text-orange-500' : 'text-black'
              } h-auto p-5`}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>
          <div className="card-actions justify-self-start justify-center items-center h-full landscape:hidden">
            <button
              className={`btn glass rounded-full text-7xl text-black h-auto p-7`}
              onClick={() => setImg({ currentImgSrc: '', currentImgTitle: '' })}
            >
              ✖
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
