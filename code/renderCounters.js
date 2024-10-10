import {CountersDic} from './clear_counters.js';

function prepareArrStep1(arr){
    //  убирает в результирующем массиве всех героев совпадающие с изначально заданными героями
    //  т.е. если в пике есть ам и шторм, то в результате не будет отображен ам как контра шторму
    //  обрабатывает исходный массив,
    // возвращает массив объектов
    let newArr = arr.filter(el=> el!=0);
    // console.log(newArr);
    let result = {};
    for (const name of newArr ){
        console.log(name);
        let tmpArr = CountersDic[name].filter(item => !newArr.includes(item));
        result[name]= tmpArr;
    }
    // console.log(result);
    return result;
}

export function renderCounterPickers(stateArr){
    // hide block 1 (скрыть блок с кнопками и сеткой)
    const mainSrc = document.getElementById('mainScreen');
    const calculatedCounters = document.getElementById('calculatedCounters');

    let contraList= document.getElementById('contraList');
    // если не нулл, тогда уничтожаем его и создаем новый/пересчитанный
    // кажись логика тупая... но пусть будет. Чтобы не проверять уже высчитанное, проще удалить, пересчитать и отрисовать 
    if(contraList){
        contraList.remove();
    }

    contraList = document.createElement('div');
    contraList.setAttribute('id','contraList');
    console.log('stateArr length == '+stateArr.length);

    let myObject = prepareArrStep1(stateArr);

    for(let i=0; i<stateArr.length; i++){
        console.log(stateArr[i]);
        if (stateArr[i]!=0){
            let nextHero = document.createElement('div');
            nextHero.setAttribute('class', 'next_hero');
            let firstHero = document.createElement('div');
            firstHero.setAttribute('class', 'next_hero1');

            let imgHero = document.createElement('img');
            imgHero.setAttribute('src', 'img/' + stateArr[i] + '.jpg');
            firstHero.appendChild(imgHero);
            nextHero.appendChild(firstHero);
            //сделаем обход по всему массиву контрпиков из словаря соответствующим ключу-имени героя
            let namesOfContra = myObject[stateArr[i]];
            let maxCtr = 6
            for(let j =0 ; j < maxCtr; j++){
                let el = document.createElement('div');
                let img = document.createElement('img');
                img.setAttribute('src', 'img/' + namesOfContra[j] + '.jpg');
                el.appendChild(img);
                nextHero.appendChild(el);
            }
            contraList.appendChild(nextHero);
        } 
    }
    calculatedCounters.appendChild(contraList);
    //и в оконцове включаем переключаем видимость блоков
    mainSrc.classList.add('hidden');
    calculatedCounters.classList.remove('hidden');
    // console.log(CountersDic['alchemist']);
};