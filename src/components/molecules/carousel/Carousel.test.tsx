import React from 'react';
import nock from 'nock';
import { shallow, mount } from 'enzyme';
import { waitFor } from '@testing-library/react';

import { Component as Carousel, API } from '.';
import CarouselImage from './CarouselImage';
import ImageData from './stub.json';

const ImageAPIBaseUrl = API.BASE_URL;

// increase timeout: the big .json test is taking some time
jest.setTimeout(21000);

describe('Carousel', () => {
  let fullyRenderedComponent: any;
  let shallowRenderedComponent: any;
  const scope: any = nock(ImageAPIBaseUrl)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .persist();

  beforeAll(() => {
    scope.persist().get('/photos').reply(200, ImageData.slice(0, 10), {
      'Content-Type': 'application/json',
    });

    shallowRenderedComponent = shallow(<Carousel />);
    fullyRenderedComponent = mount(<Carousel />);
  });

  afterAll(() => {
    scope.done();
  });

  it('should render the Carousel Component', () => {
    expect(fullyRenderedComponent.equals(<Carousel />)).toEqual(true);
  });

  it('should render a single toplevel <section /> tag', () => {
    expect(shallowRenderedComponent.find('section').length).toEqual(1);
  });

  it('should render initial Layout', () => {
    expect(shallowRenderedComponent.getElements()).toMatchSnapshot();
  });

  it('should load data and render <CarouselImage />', async () => {
    await waitFor(
      () => {
        fullyRenderedComponent.update();
        expect(
          fullyRenderedComponent.containsAnyMatchingElements(
            ImageData.slice(0, 10).map(dataset => (
              <CarouselImage
                key={`album-${dataset.albumId}-img-${dataset.id}`}
                title={dataset.title}
                thumbnailUrl={dataset.thumbnailUrl}
                onClick={jest.fn}
              />
            ))
          )
        ).toEqual(true);
      },
      { interval: 50, timeout: 3000 }
    );
  });
});
