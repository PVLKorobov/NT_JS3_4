const isInRange = function (input, range) {
  return input >= range.min && input <= range.max;
};

const getRelatedSystem = function (cardNum) {
  let firstTwo = cardNum.substring(0, 2);
  let firstThree = cardNum.substring(0, 3);
  let firstFour = cardNum.substring(0, 4);
  let firstSix = cardNum.substring(0, 6);

  if (cardNum.charAt(0) == "4") {
    return { tag: "visa", name: "Visa" };
  }

  if (
    firstTwo == "54" ||
    firstTwo == "36" ||
    isInRange(parseInt(firstThree), { min: 300, max: 305 })
  ) {
    return { tag: "diners-club", name: "Diners Club" };
  }

  if (firstTwo == "34" || firstTwo == "37") {
    return { tag: "american-express", name: "American Express" };
  }

  if (isInRange(parseInt(firstFour), { min: 3528, max: 3589 })) {
    return { tag: "jcb", name: "JCB" };
  }

  if (
    isInRange(parseInt(firstTwo), { min: 51, max: 55 }) ||
    isInRange(parseInt(firstSix), { min: 222100, max: 272099 })
  ) {
    return { tag: "mastercard", name: "MasterCard" };
  }

  if (
    firstFour == "6011" ||
    firstTwo == "65" ||
    isInRange(parseInt(firstSix), { min: 622126, max: 622925 }) ||
    isInRange(parseInt(firstThree), { min: 644, max: 649 })
  ) {
    return { tag: "discover", name: "Discover" };
  }

  return { tag: "none", name: "none" };
};

export { getRelatedSystem };
