"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberFormating = exports.capitalizeOnlyFirstChars = void 0;
const capitalizeOnlyFirstChars = (str) => {
    const words = str.toLowerCase().split(' ');
    const capitalizedWords = words.map((word) => {
        if (word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    });
    return capitalizedWords.join(' ');
};
exports.capitalizeOnlyFirstChars = capitalizeOnlyFirstChars;
const phoneNumberFormating = (str) => {
    const phoneFormatString = str.slice(0, 3) + '-' + str.slice(3, 6) + '-' + str.slice(6);
    return phoneFormatString;
};
exports.phoneNumberFormating = phoneNumberFormating;
//# sourceMappingURL=functions.js.map