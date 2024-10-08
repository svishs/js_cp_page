export function clearCurrentAndDeselect(className,  heroName, stateArr) {
    const divs = document.querySelectorAll(`div.${className}`);
    for (let div of divs) {
        if (div.getAttribute('data-heroname') === heroName) {
            div.classList.remove('selected');
            //div.setAttribute('data-heroname','blank');
            stateArr[stateArr.indexOf(heroName)] = 0;
            return;
        }      
    }
}


export function setToBlank(className, heroName, glovalSrcBlankImage, stateArr) {
    const divs = document.querySelectorAll(`div.${className}`);
    for (let div of divs) {
        const img = div.querySelector('img');
        if (div.getAttribute('data-heroname') === heroName) {
            img.src = glovalSrcBlankImage;
            img.setAttribute('data-heroname', 'blank');
            div.setAttribute('data-heroname', 'blank');
            stateArr[stateArr.indexOf(heroName)] = 0; // сбросили содержимое 
            return; // второго быть не может. 
        }
    }
}


export function getDivIdWithBlankSrc(className) {
    // Получаем все div элементы с указанным классом
    const divs = document.querySelectorAll(`div.${className}`);
    // Проверяем каждый div на значение src
    for (let div of divs) {
        if (div.getAttribute('data-heroname') === 'blank') {
            return div;
        }
    }
    return null; // Если ни один img не прошёл проверку
}
