export const initialState = {
    currentValue: "0",
    previousValue: 0,
    operator: ''
}

export const handleNumber = (value, state) => {
    if (state.currentValue === "0" && state.currentValue.toString().length == 1) {
        return { currentValue: `${value}` };
    }

    return {
        currentValue: `${state.currentValue}${value}`
    };
};

export const handleEqual = state => {
    const { currentValue, previousValue, operator } = state;

    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);
    const resetState = {
        operator: null,
        previousValue: null
    };

    if (operator === "/") {
        return {
            currentValue: previous / current,
            ...resetState
        };
    }

    if (operator === "*") {
        return {
            currentValue: previous * current,
            ...resetState
        };
    }

    if (operator === "+") {
        return {
            currentValue: previous + current,
            ...resetState
        };
    }

    if (operator === "-") {
        return {
            currentValue: previous - current,
            ...resetState
        };
    }

    return state;
};

const calculator = (type, value, state) => {
    switch (type) {
        case "number":
            return {
                ...state, currentValue: handleNumber(value, state).currentValue
            };
        case "operator":
            var foo = {
                operator: value,
                previousValue: state.currentValue,
                currentValue: "0"
            };
            return foo;
        case "equal":
            var foo = handleEqual(state);
            return foo;
        case "clear":
            return initialState;

        case "back":
            var foo = state.currentValue.toString().slice(0, state.currentValue.toString().length-1);
            return {
                ...state,
                currentValue: foo.length == 0 ? "0":foo
            }
        case "dot":
            var foo = state.currentValue+".";
            if (isNaN(foo)) {
                return {...state};
            }
            return {
                ...state,
                currentValue: foo
            }
        case "posneg":
            return {
                currentValue: `${parseFloat(state.currentValue) * -1}`
            };
        case "percentage":
            return {
                currentValue: `${parseFloat(state.currentValue) * 0.01}`
            };
        default:
            return state;
    }
};

export default calculator;