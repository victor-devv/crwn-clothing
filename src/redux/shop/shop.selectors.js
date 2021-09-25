import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// get keys as array, map over them and get value of collection objects as value of each key

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );