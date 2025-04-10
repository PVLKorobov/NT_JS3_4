import { CardValidator } from "./card-validator-widget";


const populateIcons = function () {
    let iconNames = ['visa', 'mir', 'mastercard', 'jcb', 'american-express', 'discover', 'diners-club'];
    for (let iconName of iconNames) {
        const iconWrapper = document.createElement('div');
        iconWrapper.setAttribute('class', 'card-icon__wrapper');
        iconWrapper.setAttribute('id', `card-icon__${iconName}__wrapper`);

        const iconOverlay = document.createElement('div');
        iconOverlay.setAttribute('class', 'card-icon__overlay');
        iconWrapper.appendChild(iconOverlay);

        const icon = document.createElement('img');
        icon.setAttribute('class', 'card-icon');
        icon.setAttribute('src', require(`../img/${iconName}.png`));
        icon.setAttribute('title', iconName)
        iconWrapper.appendChild(icon);

        const iconListElement = widgetWrapper.querySelector('.card-icon__list');
        iconListElement.appendChild(iconWrapper);
    }
}

const highlightIcon = function (iconTag) {
    let allCardIcons = window.widget.getAllCardIcons();
    const tagetCardIcon = window.widget.getCardIconByTag(iconTag);
    
    for (let icon of allCardIcons) {
        icon.style.opacity = 0.3;
    }

    tagetCardIcon.style.opacity = 1;
}

const resetHightlight = function () {
    let allCardIcons = window.widget.getAllCardIcons();
    
    for (let icon of allCardIcons) {
        icon.style.opacity = 1;
    }
}


const widgetWrapper = document.querySelector('.contents__wrapper .widget__wrapper');
window.widget = new CardValidator(widgetWrapper);
populateIcons();

const cardNumForm = widgetWrapper.querySelector('.form__wrapper form');
cardNumForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let cardNumInput = document.forms['card-validator']['card-number'].value;
    try {
        let relatedSystem = window.widget.handleCardNumber(cardNumInput);
        if (relatedSystem) {
            highlightIcon(relatedSystem.tag);
        }
    }
    catch (err) {
        resetHightlight();
        if (err == 'Card number is invalid') {
            let formTooltip = widgetWrapper.querySelector('.form__wrapper .form__tooltip');
            formTooltip.innerHTML = err;
            setTimeout(() => {
                formTooltip.innerHTML = '';
            }, 2000);
        }
        else {
            throw err;
        }
    }
    
});