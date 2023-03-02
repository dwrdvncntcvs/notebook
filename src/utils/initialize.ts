export interface InitialData {
    name: string;
    value: Array<any> | object;
}

const initLocalStorageData = (data: InitialData[]) => {
    for (let { name, value } of data) {
        const valueInLS = localStorage.getItem(name);

        if (!valueInLS) {
            localStorage.setItem(name, JSON.stringify(value));
            console.log(`-- ${name} initialized in local storage --`);
        } else {
            console.log(`-- ${name} already initialized... --`)
        }
    }
};

export { initLocalStorageData };
