let currentId = 0
let itemList = []

export const addItem = (item) => {
  itemList.push(item)
  return currentId++;
}

export const getItem = (id) => {
  return itemList[id];
}
