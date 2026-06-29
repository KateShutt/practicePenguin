export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Regex Breakdown:
// ^[a-zA-Z0-9._%+-]+: Matches the username part of the email, allowing alphanumeric characters and some special characters like ., _, %, +, and -.
// @: Matches the literal "@" symbol that separates the username from the domain.
// [a-zA-Z0-9.-]+: Matches the domain part, allowing letters, digits, dots, and hyphens.
// \.: Escapes the dot (.) to match the literal period separating the domain from the top-level domain (TLD).
// [a-zA-Z]{2,}$: Matches the top-level domain (TLD), which must consist of at least 2 alphabetic characters.
