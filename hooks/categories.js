function getAmount (amount, percentage) {
    return amount * (percentage/100);
}

function getPercentage(amount, value) {
    return (value / amount) * 100;
}

const newCategoryVals = (data, type, value, categs, totalBudget) => {
    if (data) {
        let categName = data.name; let temp = 0;
        let myType = type == 0 ? 'percentage':'amount';
        value = parseFloat(value);
        temp = value - data.budgetPlanned[myType];
        data.budgetPlanned[myType] = parseFloat(value,2);

        if ( type == 0 ) {
            data.budgetPlanned.amount = getAmount(totalBudget, value).toFixed(2)
        }

        if ( type == 1 ) {
            data.budgetPlanned.percentage = getPercentage(totalBudget, value).toFixed(2)
        }
        
        return categs.map((item, key) => {
            // console.log(item);
            if (key == 0) {
                item.budgetPlanned[myType] -= temp;
                if (type == 0) {
                    item.budgetPlanned.amount = getAmount(totalBudget, item.budgetPlanned[myType]).toFixed(2)
                } else {
                    item.budgetPlanned.percentage = getPercentage(totalBudget, item.budgetPlanned[myType]).toFixed(2)
                }
                return item;
            }
            return item.name == categName ? data:item
        });
    }
    return [...categs];
}

export default newCategoryVals;