import axios from 'axios';
import { getBikes, sortByKey, generateSearchBikesHtml, ORDER_BY, ORDER_TO_COLUMN_NAME } from "../../app/javascript/packs/search.js";

jest.mock('axios');

describe('getBikes()', () => {
  it('gets bikes', async () => {
    axios.get.mockResolvedValue({ data: 'some_bikes' });
    const response = await getBikes();
    expect(response).toEqual('some_bikes');
  });
});

describe('generateSearchBikesHtml()', () => {
  it('generates empty search bikes HTML string', async () => {
    const response = generateSearchBikesHtml([], ORDER_BY.DEFAULT);
    expect(response).toEqual('');
  });

  it('generates search bikes HTML string', async () => {
    const bikes = [{
      description: 'some_description',
      id: 123,
      image_name: 'some_image.js',
      name: 'some_bike',
      price_per_day: '2.2',
    }];
    const response = generateSearchBikesHtml(bikes, ORDER_BY.DEFAULT);

    expect(response).toMatch(/(\/bikes\/123)/i);
    expect(response).toMatch(/(\/assets\/some_image.js)/i);
    expect(response).toMatch(/(\$2.20 per day)/i);
  });

  it('sortByKey - sort bikes based on name', async () => {
    const bikes = [{
      description: 'some_description',
      id: 1,
      image_name: 'some_image.js',
      name: 'May',
      price_per_day: '2.1',
    },{
      description: 'some_description',
      id: 2,
      image_name: 'some_image1.js',
      name: 'Albert',
      price_per_day: '9.2',
    }];
    const sorted_bikes = sortByKey(bikes, ORDER_TO_COLUMN_NAME[ORDER_BY.NAME] || ORDER_BY.DEFAULT)

    expect(sorted_bikes.map(val => val.name)).toEqual(["Albert", "May"]);
  });

  it('sortByKey - sort bikes based on price', async () => {
    const bikes = [{
      description: 'some_description',
      id: 1,
      image_name: 'some_image.js',
      name: 'May',
      price_per_day: '2.1',
    },{
      description: 'some_description',
      id: 2,
      image_name: 'some_image1.js',
      name: 'Albert',
      price_per_day: '9.2',
    }];
    const sorted_bikes = sortByKey(bikes, ORDER_TO_COLUMN_NAME[ORDER_BY.PRICE] || ORDER_BY.DEFAULT)

    expect(sorted_bikes.map(val => val.price_per_day)).toEqual(["2.1", "9.2"]);
  });
});
