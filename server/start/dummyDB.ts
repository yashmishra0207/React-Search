/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import SearchItem from "App/Models/SearchItem";

const alphabets = new Array(26)
  .fill(null)
  .map((...[, increment]) => "a".charCodeAt(0) + increment)
  .map((charCode) => String.fromCharCode(charCode));

const database: Array<SearchItem> = new Array(1000).fill(null).map((...[,idx]) => {
  const randomString = new Array(10)
    .fill(null)
    .map(() => Math.floor(Math.random() * alphabets.length))
    .map((index) => alphabets[index])
    .join("");

  const newSearchItem = new SearchItem();
  newSearchItem.text = randomString;
  newSearchItem.id = idx;
  return newSearchItem;
});

database.sort((lhs, rhs) => lhs.text.localeCompare(rhs.text));

export default database;
