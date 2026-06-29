export function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,30}$/; // 1 lc 1 uc one digit between 10 and 30 chars long
  return passwordRegex.test(password);
}
