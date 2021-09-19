let currentId = 0
let itemList = []

export const addAPI = (item) => {
  itemList.push(item)
  return currentId++;
}

export const getAPI = (id) => {
  return itemList[id];
}
