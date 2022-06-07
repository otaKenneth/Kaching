const data = [
    {
        name: "Bank 1",
        balance: 10000000,
        favorite: true,
        // bankColor: "#fc3903",
    },
    {
        name: "Bank 2",
        balance: 200000.10,
        // bankColor: "#2249c9",
    },
    {
        name: "Bank 3",
        balance: 1000.00,
        // bankColor: "#359cf0"
    },
    {
        name: "Bank 4",
        balance: 5000
    },
    {
        name: "Bank 5",
        balance: 10567830
    },
    // {
    //     name: "Bank 6",
    //     balance: 7
    // },
    // {
    //     name: "Bank 7",
    //     balance: 299
    // },
    // {
    //     name: "Bank 8",
    //     balance: 700
    // },
    // {
    //     name: "Bank 9",
    //     balance: 709
    // },
];

const AccountList = () => {
    var tempData = data;
    var chunkSize = 2; var newData = [];

    for (let index = 0; index < tempData.length; index++) {
        tempData[index] = {...tempData[index], id: index+1};
    }
    newData = tempData;

    // var i = 0;
    // while (i < data.length) {
    //     var chunk = tempData.slice(i, i+chunkSize);
    //     newData.push(chunk);
    //     i+=chunkSize;
    // }

    return newData;
}

export default AccountList;