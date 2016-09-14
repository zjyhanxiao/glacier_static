function passport2TaxId(s) {
  // Convert Passport to Tax
  var c = s.charAt(0);
  var first;
  if (('0' <= c) & (c <= '9')) {
    first = (s.charCodeAt(0) - 48) % 10;
  }
  if (('a' <= c) & (c <= 'z')) {
    first = (s.charCodeAt(0) - 96) % 10;
  }
  if (('A' <= c) & (c <= 'Z')) {
    first = (s.charCodeAt(0) - 64) % 10;
  }
  return first + s.substring(1, 9);
}