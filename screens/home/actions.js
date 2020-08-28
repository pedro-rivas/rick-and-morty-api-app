import { colors } from '../../styles/colors';

import { ToastAndroid, } from 'react-native';

const getIndexs = (someNumber) => {
    let query = [];
    for (let i = 0; i < 6; i++) {
        query.push(someNumber);
        someNumber -= 1;
    }
    return query.reverse();
}

const getCharactersArray = (obj) => {
    let characters = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            characters.push(element);
        }
    }
    return characters;
}

const getDate = (date) => {
    return `${new Date(date).getMonth()}/${new Date(date).getFullYear()}`;
}

const getBackgroundColor = (status) => {
    return status === 'Alive' ? colors.accent.green.main 
           : status === 'Dead' ? colors.accent.blue.main 
           : status === 'unknown' ? colors.accent.orange.main : 'red';
}

const getSecondaryColor = (status) => {
    return status === 'Alive' ? colors.accent.green.seconary 
           : status === 'Dead' ? colors.accent.blue.seconary 
           : status === 'unknown' ? colors.accent.orange.seconary : 'red';
}


const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(`${message}`, 
    ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100, );
}

export {
    getIndexs, 
    getCharactersArray,
    getBackgroundColor,
    getSecondaryColor,
    getDate,
    showToast,
}