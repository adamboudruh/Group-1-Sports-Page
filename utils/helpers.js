const moment = require('moment');

module.exports = {
//   get_emoji: () => {
//     const randomNum = Math.random();
//     let book = "📗";

//     if (randomNum > 0.7) {
//       book = "📘";
//     } else if (randomNum > 0.4) {
//       book = "📙";
//     }

//     return `<span for="img" aria-label="book">${book}</span>`;
//   },
    getBookmaker: (key, odds) => {
        console.log("Looking for bookmaker...");
        return odds.bookmakers.find(bookmaker => bookmaker.key === key);
    },
    when: (operand_1, operator, operand_2, options) => {
        var operators = {
            '===': function(l,r) { return l === r; },
            '!==': function(l,r) { return l !== r; }
        }
        const result = operators[operator](operand_1,operand_2);
        
        if (result) return options.fn(this);
        else  return options.inverse(this);
    },
    formatTimeAgo: (date) => {
        return moment(date).fromNow();
    },
    eq: (a, b) => {
        return a === b; //Simplified version of the when function, just so I can use it in conjunction with if statements to maintain the context
    }
};