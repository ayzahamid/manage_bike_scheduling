import axios from 'axios';

const axiosConfig = {
  headers: {
    accept: 'application/json',
  },
  data: {},
};

export const ORDER_BY = {
  DEFAULT: 'Default',
  NAME: 'Name',
  PRICE: 'Price',
};

export const ORDER_TO_COLUMN_NAME = {
  Name: 'name',
  Price: 'price_per_day'
};

const getSearchBikeHtml = (bike) => (`
  <a href="/bikes/${bike.id}" target="_blank" class="card card--search">
    <div class="image" style='background-image: url("/assets/${bike.image_name}")'>
    </div>
    <div>
      <div class="font-bold capitalize mb-1">${bike.name}</div>
      <div class="mb-2">${bike.description}</div>
      <div class="italic">$${Number(bike.price_per_day).toFixed(2)} per day</div>
    </div>
  </a>
`);

export const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    let x, y;

    if (key == 'price_per_day'){
      x = parseFloat(a[key]);
      y = parseFloat(b[key]);
    } else {
      x = a[key];
      y = b[key];
    }

    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}


// TODO Implement orderBy functionality, support default, name & price
export const generateSearchBikesHtml = (bikes, orderBy) => {
  let searchBikesHtml = '';
  sortByKey(bikes, ORDER_TO_COLUMN_NAME[orderBy] || ORDER_BY.DEFAULT).forEach((bike) => {
    searchBikesHtml = searchBikesHtml.concat(getSearchBikeHtml(bike));
  });
  return searchBikesHtml;
};

export const getBikes = () => {
  return axios
    .get('/search', Object.assign({}, axiosConfig, { params: { date: document.querySelector('#date').value } }))
    .then(({ data: bikes }) => bikes)
    .catch((error) => console.log(error));
};

const onloadSearch = () => {
  const searchBikesEl = document.querySelector('[data-search-bikes]');

  if (!!searchBikesEl) {
    const searchOrderByEl = document.querySelector('[data-search-order-by]');
    getBikes(searchBikesEl)
      .then((bikes) => {
        searchBikesEl.innerHTML = generateSearchBikesHtml(bikes, searchOrderByEl.value);
      });

    // TODO Re-render search results if orderBy changes without an API request
  }
};

// Prevent overwriting on window.onload function by appending to the load event
if (window.attachEvent) { // IE
  window.attachEvent('onload', onloadSearch);
} else if (window.addEventListener) {
  window.addEventListener('load', onloadSearch, false);
  window.addEventListener('change', onloadSearch, false);
} else {
  document.addEventListener('load', onloadSearch, false);
}
