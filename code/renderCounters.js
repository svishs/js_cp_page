import {CountersDic} from './clear_counters.js';

const maxLengthResAr = 6; // глобальная для обрезания результирующих массивов-значений
function prepareArrStep2(arr){
    //  убирает в результирующем массиве всех героев совпадающие с изначально заданными героями
    //  т.е. если в пике есть ам и шторм, то в результате не будет отображен ам как контра шторму
    //  обрабатывает исходный массив,
    // возвращает объект с ключами именами героев и значениями - массивами контрпиков
    //  вид { "zeus": ['c', 'z', 'd'], "io": ['sd', 'z']}
    //  максимальная длина массивов задается перемнной maxLengthResAr
    let newArr = arr.filter(el=> el!=0);
    // console.log(newArr);
    let result = {};
    for (const name of newArr ){
        console.log(name);
        let tmpArr = CountersDic[name].filter(item => !newArr.includes(item));
    //  обязательно нужно урезать до maxLengthResAr элементов для каждого значения-массива.
        result[name]= tmpArr.slice(0,  maxLengthResAr); // 
    }
    console.log('result == ');
    console.log(  result);
    return result;
}

function prepareArrStep1(arr){

    let res_obj = prepareArrStep2(arr);
//  должен вернуть из объекта вида {"zeus":['contra1','contra2','c3','c4'], "puck":['cx1', 'cx2']} (максимум длина массива = 4)
// объект вида {"zeus": [   {'contra1':1, 'contra2': 1, и т.д}]}
//  для этого все массивы-значения надо слить вместе, посчитать совпадения для каждого значения
    let concatedArr = []
    for(const key in res_obj){
        concatedArr = concatedArr.concat(res_obj[key]);
    } // слили в единый массив
    const countObj = {}; 
    concatedArr.forEach((elem) => {
        if (countObj[elem]) {
          countObj[elem]['count']++;
        } else {
            let obj2 = {};
            obj2['count'] = 1;
            obj2['style'] = 'not_rotate_style'; // 
          countObj[elem] = obj2; 
            // генератор следующего стиля {'count': 2, 'style': 'rotate_style1'}    
        }
      });// подсчитали  и теперь далее надо сделать объект из ключ : массив объектов типа Б
    //   где Б вида имя: [количество совпадений, стиль]
    
    let generatorStyleIndex = 1; // переменная для генерирования суффикса
    for(const el in countObj){
        if(countObj[el]['count']>1){
            countObj[el]['style']='rotate_style'+generatorStyleIndex;
            generatorStyleIndex++;
        }
    }
    console.log('countObj=');
    console.log(countObj);
    //сформировали нормальные суффиксы, теперь нужно внести информацию о стилях в res_obj
    // из структуры {"z": ['x','b']} нужно привести к виду {"z":[{'x': style_x},{'b':style_b}]}
    for(const key in res_obj){
        let tmpArr =res_obj[key];
        console.log('tmpArr==');
        console.log(tmpArr);
        let x_arr=[];
        for(let  el of tmpArr){ 
            let my_struct = {}
            console.log(el);
            console.log(countObj[el]);
            my_struct['s'] = countObj[el]['style'];// style
            my_struct['n'] = el; // name
            x_arr.push(my_struct);
        }
        res_obj[key] = x_arr; // [{'n':'x', 's': 'style_x'},{'b':'style_b'}]
    }

    return res_obj; // 
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
                img.setAttribute('src', 'img/' + namesOfContra[j]['n'] + '.jpg');
                el.classList.add(namesOfContra[j]['s']); // либо not_rotate_style либо rotate_style + index
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