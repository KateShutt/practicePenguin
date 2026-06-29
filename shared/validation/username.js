// checks that username is valid

const allowedChars = new Set([
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
]);

export function isValidUsername(username) {
  if (username.length < 3 || username.length > 30) {
    return false;
  }

  for (let char of username) {
    if (!allowedChars.has(char)) {
      return false;
    }
  }

  return true;
}
