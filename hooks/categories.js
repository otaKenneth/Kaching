export function getAmount (amount, percentage) {
    return amount * (percentage/100);
}

export function getPercentage(amount, value) {
    return (value / amount) * 100;
}

const newCategoryVals = (data, type, value, categs, totalBudget) => {
    if (data) {
        let temp = 0; let myType = type == 0 ? 'percentage':'amount';
        value = parseFloat(value);
        
        if (categs.find(d => d.id == data.id)) {
            temp = value - data.budgetPlanned[myType];
        } else {
            temp = value;
            categs.push(data);
        }

        data.budgetPlanned[myType] = parseFloat(value,2);

        if ( type == 0 ) {
            data.budgetPlanned.amount = getAmount(totalBudget, value).toFixed(2)
        }

        if ( type == 1 ) {
            data.budgetPlanned.percentage = getPercentage(totalBudget, value).toFixed(2)
        }
        
        return categs.map((item) => {
            // console.log(item);
            if (item.name == "Balance") {
                item.budgetPlanned[myType] = (item.budgetPlanned[myType] - temp).toFixed(2);
                if (type == 0) {
                    item.budgetPlanned.amount = getAmount(totalBudget, item.budgetPlanned[myType]).toFixed(2)
                } else {
                    item.budgetPlanned.percentage = getPercentage(totalBudget, item.budgetPlanned[myType]).toFixed(2)
                }
                return item;
            }
            return item.id == data.id ? data:item
        });
    }
    return [...categs];
}

export function sortCategoriesById (categs) {
    var balance = categs.find(d => d.id == "1");
    var toSort = categs.filter(d => d.id != '1');
    var sorted = toSort.sort((a,b) => {
        return a.id - b.id;
    });
    return [balance, ...sorted];
}

export function sortCategoriesByAmount (categs) {
    categs = sortCategoriesById(categs);
    var finalCategs = [categs[0]];
    var toSort = categs.slice(1);
    var sorted = toSort.sort((a,b) => {
        return b.budgetPlanned.amount - a.budgetPlanned.amount;
    });
    finalCategs = [...finalCategs, ...sorted];

    return finalCategs;
}

export default newCategoryVals;