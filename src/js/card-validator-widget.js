import { validateCardNumber } from "./card-validation";
import { getRelatedSystem } from "./related-system-finder";

class CardValidator {
  constructor(widgetWrapper) {
    this.widgetWrapper = widgetWrapper;
    this.formTooltip = widgetWrapper.querySelector(
      ".form__wrapper .form__tooltip",
    );
  }

  handleCardNumber(cardNumInput) {
    let isValidCardNum = validateCardNumber(cardNumInput);

    if (!isValidCardNum) {
      throw "Card number is invalid";
    } else {
      return getRelatedSystem(cardNumInput);
    }
  }

  getAllCardIcons() {
    return this.widgetWrapper.querySelectorAll(
      ".card-icon__list .card-icon__wrapper",
    );
  }

  getCardIconByTag(tag) {
    return this.widgetWrapper.querySelector(
      `.card-icon__list #card-icon__${tag}__wrapper`,
    );
  }
}

export { CardValidator };
