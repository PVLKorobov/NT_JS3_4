const validateCardNumber = function (cardNum) {
  if (!/^\d+$/.test(cardNum) || cardNum.charAt(0) == "0") {
    return false;
  }

  let sum = 0;
  let isOdd = false;

  for (let i = cardNum.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNum.charAt(i));

    if (isOdd) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isOdd = !isOdd;
  }

  return sum % 10 == 0;
};

export { validateCardNumber };
