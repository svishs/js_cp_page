import {CountersDic} from './clear_counters.js';

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
    for(let i=0; i<stateArr.length; i++){
        console.log(stateArr[i]);
        if (stateArr[i]!=0){
            let nextHero = document.createElement('div');
            nextHero.setAttribute('class', 'next_hero');
            let firstHero = document.createElement('div');
            firstHero.setAttribute('class', 'next_hero1');

            let imgHero = document.createElement('img');
            imgHero.setAttribute('src', 'img/' + stateArr[i] + '.png');
            firstHero.appendChild(imgHero);
            nextHero.appendChild(firstHero);
            //сделаем обход по всему массиву контрпиков из словаря соответствующим ключу-имени героя
            let namesOfContra = CountersDic[stateArr[i]];
            let maxCtr = 6
            for(let j =0 ; j < maxCtr; j++){
                let el = document.createElement('div');
                let img = document.createElement('img');
                img.setAttribute('src', 'img/' + namesOfContra[j] + '.png');
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