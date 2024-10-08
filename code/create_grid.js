import { HeroLst } from "./array_herois.js";
import { clearCurrentAndDeselect } from "./common_functions.js";
import { setToBlank } from "./common_functions.js";
import { getDivIdWithBlankSrc } from "./common_functions.js";
import {renderCounterPickers} from './renderCounters.js';

// import 
window.stateArr = [0, 0, 0, 0]; // глобальная. Для хранения состояния выбранных героев
let glovalSrcBlankImage = "img/other/blank.png"; // глобальная.
const btnId = 'btnCalc'; // в стилях это же имя должно быть для кнопки, не забыть.
// блок корявый - динамическое формирование секции "выбранные герои"

function renderSelectedHeroesStepOne() {
    const blankImgName = 'blank.png';
    const selectedHeroestDiv = document.getElementById('selectedHeroes');
    for (let i = 0; i < 4; i++) {
        let newDivNode = document.createElement('div');
        newDivNode.setAttribute('class', 'blank-image-div');
        let newImg = document.createElement('img');
        if (stateArr[i] == 0) {
            newDivNode.setAttribute('data-heroname', 'blank');
            newImg.setAttribute('src', glovalSrcBlankImage);
            newImg.setAttribute('data-heroname', 'blank');
        }
        else {
            //  этот код не выполняется ни в каких случаях 
            // newDivNode.setAttribute('data-heroname', stateArr[i]["name"]); // выбираем name 
            // newImg.setAttribute('src', 'img/' + stateArr[i]["name"] + '.png'); //ставим картинку
            // newImg.setAttribute('data-heroname', stateArr[i]["name"]); // ставим name
        }
        newDivNode.appendChild(newImg);
        selectedHeroestDiv.appendChild(newDivNode);
    }// выше написанное с ветвлением смысла не имеет, потому что всегда отрисовываться будет 
    // с нулевым stateArr, а в остальных случаях предполагаю что скрытие этого блока буду делать 
    // через стиль display: none 
    const myBtn = document.createElement('button');
    myBtn.setAttribute('id', btnId);
    myBtn.disabled = true;
    myBtn.innerText = 'Найти контрпики';
    selectedHeroestDiv.appendChild(myBtn);

    // настройка делегатора
    selectedHeroestDiv.addEventListener('click', (event) => {
        const imgTag = event.target;
        if (imgTag.tagName === 'IMG') { // в верхнем регистре! :о
            // console.log('detected');
            let heroName = imgTag.getAttribute('data-heroname');
            if (heroName !== 'blank') {
                // console.log(' ops');
                clearCurrentAndDeselect('image-div', heroName, stateArr); // вызов функции очистки соответствующего 
                imgTag.src = glovalSrcBlankImage;
                imgTag.setAttribute('data-heroname', 'blank');
                // обратиться к родительскому див и установить ему свойство data-heroname в blank
                imgTag.parentNode.setAttribute('data-heroname', 'blank');
                //disable button
                if (stateArr.filter(x => x === 0).length == 4) {
                    const btnCalculate = document.getElementById(btnId); // 
                    btnCalculate.disabled = true;
                }
                return;
            }
            else {// не делать ничего
                // console.log(imgTag.getAttribute('data-heroname'));
                alert("select hero by clicking on icon");
            }
        }
    });
}

function renderGridOfHerois() {
    // отрисовывает сетки с иконками героев и навешивает листенер-делегатор
    const bodyLnk = document.getElementById('imageContainer');
    // console.log(HeroLst.length);
    for (let x = 0; x < HeroLst.length; x++) {
        // временно сделает 2 отступа
        let newBlock = document.createElement('div');
        newBlock.setAttribute('class', 'container-number' + x);
        // bodyLnk.appendChild(document.createElement('br')); 
        // bodyLnk.appendChild(document.createElement('br'));   
        let curCategory_arr = HeroLst[x]["hero_list"];
        for (let i = 0; i < curCategory_arr.length; i++) {
            let HeroCard = document.createElement('div');
            HeroCard.setAttribute('class', 'image-div');
            HeroCard.setAttribute('id', curCategory_arr[i]['id']); // задаем id из списка
            HeroCard.setAttribute('data-heroname', curCategory_arr[i]['name']);
            let imgPath = 'img/' + curCategory_arr[i]['name'] + '.png';
            let newImg = document.createElement('img');
            newImg.setAttribute('src', imgPath);
            newImg.setAttribute('alt', curCategory_arr[i]['name']);
            HeroCard.appendChild(newImg);
            newBlock.appendChild(HeroCard);
        }
        bodyLnk.appendChild(newBlock);
    }

    // далее надо присобачить обработчик на эти все иконки. 
    bodyLnk.addEventListener('click', (event) => {
        //console.log(' ops');
        //cconst target = event.target;
        const imgDiv = event.target.closest('.image-div');
        if (imgDiv) {
            // Ваш код для обработки клика
            if (imgDiv.classList.contains('selected')) {
                imgDiv.classList.remove('selected');
                setToBlank('blank-image-div', imgDiv.getAttribute('data-heroname'), glovalSrcBlankImage, stateArr); // сбросить 
                // вычисляем содержимое массива stateArr и дизейблим кнопку если он из нулей
                if (stateArr.filter(x => x === 0).length == 4) {
                    const btnCalculate = document.getElementById(btnId); // 
                    btnCalculate.disabled = true;
                }
                return; // выход, если изображение уже выбрано
            }

            let idFirstBlank = getDivIdWithBlankSrc('blank-image-div');
            // console.log('idFirstBlank=='+idFirstBlank);
            if (idFirstBlank) { // не null значение                   
                // console.log(idFirstBlank);
                // console.log(typeof(idFirstBlank));
                // Добавляем рамку выбранной картинке
                imgDiv.classList.add('selected');
                idFirstBlank.querySelector('img').src = 'img/' + imgDiv.getAttribute('data-heroname') + '.png';
                // немного лишний дополнительный атрибут для img, но раз на нем завязано в делегате выбранных,
                // то пусть будет.. 
                idFirstBlank.querySelector('img').setAttribute('data-heroname', imgDiv.getAttribute('data-heroname'));
                idFirstBlank.setAttribute('data-heroname', imgDiv.getAttribute('data-heroname'));
                // обращение к глобальному массиву 
                stateArr[stateArr.indexOf(0)] = imgDiv.getAttribute('data-heroname');
                // включаем кнопке enabled 
                const btnCalculate = document.getElementById(btnId); // 
                btnCalculate.disabled = false;
            }

        }
        // Проверяем, что клик был именно по элементу `li`
    });
};





renderSelectedHeroesStepOne();
//навешаем обработчик на кнопку 
const btnCalc = document.getElementById(btnId);
btnCalc.addEventListener('click', (event) => {
    renderCounterPickers(stateArr);
    // alert('Заглушка поиска контрпиков');
});

renderGridOfHerois();




