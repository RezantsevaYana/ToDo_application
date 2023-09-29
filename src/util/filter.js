export const searchFilterItems = (items, searchQuery) => {
  if (searchQuery.length === 0) {
    return items;
  }

  return items.filter((item, index) => {
    const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const numberMatch = (index+1).toString().includes(searchQuery);
    return titleMatch || numberMatch;
  });
};
