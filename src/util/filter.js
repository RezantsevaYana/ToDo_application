export const searchFilterItems = (items, searchQuery) => {
  if (searchQuery.length === 0) {
    return items;
  }

  return items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
};
