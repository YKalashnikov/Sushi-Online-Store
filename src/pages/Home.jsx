import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, SushiBlock, SushiLoadingBlock } from '../components';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchSushi } from '../redux/actions/sushi';
//import { addSushiToCart } from '../redux/actions/cart';

const categoryNames = ['Veggie', 'Fish', 'Exclusive', 'Spicy', 'Special'];
const sortItems = [
  { name: 'popular', type: 'popular', order: 'desc' },
  { name: 'price', type: 'price', order: 'desc' },
  { name: 'alphabet', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ sushi }) => sushi.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ sushi }) => sushi.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchSushi(sortBy, category));
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddSushiToCart = (obj) => {
    dispatch({
      type: 'ADD_SUSHI_CART',
      payload: obj,
    });
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">All Sushi</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <SushiBlock
                onClickAddSushi={handleAddSushiToCart}
                key={obj.id}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(16)
              .fill(0)
              .map((_, index) => <SushiLoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
