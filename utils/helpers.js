const moment = require('moment');

module.exports = {
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