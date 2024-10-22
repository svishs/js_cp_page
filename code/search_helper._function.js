function logicForDouble_Triple_Quarter_names(){
}

export const onInputSearchHandler = {
    innerDict:null,
    storedDivs: null,
    
    init: function(sourceDict){
        this.storedDivs = document.querySelectorAll('.image-div'); //<<


        this.innerDict = {};// сюда запихаем доп массив объектов

        sourceDict.forEach((elem)=>{
            // elem  тут словарь с ключами "type": 'a', "hero_list": array[ obj of {
            //     "id": 330,
            //     "name": "anti-mage",
            //     "type": "a"
            // }]
            let curHeroLst = elem["hero_list"]; // тут массив из объектов, в которых интересует
            //  только значение ключа "name"

            // идея в том, чтобы для составных имен (which contains a dash symbol) создать
            //  словарь {"полное имя":"аббревиатура", ..}
            //  этот словарь будет использован при выполнении executor 
            curHeroLst.forEach((el)=>{
                let str_name = el["name"];
                // проверяем наличие тире или даже сразу режем наименование по тире
                let str_Arr = str_name.split('-');
                if(str_Arr.length!=1){ // str_Arr.length-1 типа красивое условие на длину массива больше 1 (т.е. name составное) 
                    // console.log(str_name);
                    let tmp_n = '';
                    str_Arr.forEach((omg_str)=> {tmp_n= tmp_n + omg_str[0];}); // тут аббревиатура 
                    this.innerDict[str_name] = tmp_n;
                    //console.log(tmp_n);
                } 
            });
        });
    },

    executor: function(event){
        let name = (event.target.value).toLowerCase();
        // alert(event.target.value);
        // console.log(this);
        this.storedDivs.forEach((el) => {
            el.classList.remove('disabled_img');
        });
        if (name != '') {  // надо еще добавить логику для длины name больше 1 и contains
            this.storedDivs.forEach((el) => {
                if (!el.getAttribute('data-heroname').startsWith(name) &&
                     (this.innerDict[el.getAttribute('data-heroname')]!=name )) {
                    el.classList.add('disabled_img');
                }
            });
            // 
        }
    }  
}



// export function onInputSearchHandler(event, short_names_obj) {
//     let name = (event.target.value).toLowerCase();
//     // findPatternNameAndShadeStyle(name);
//     let fa = document.querySelectorAll('.image-div'); //<< 
//     // быстро восстанавливаем все стили( пока так )
//     fa.forEach((el) => {
//         el.classList.remove('disabled_img');
//     });

//     if (name != '') {
//         fa.forEach((el) => {
//             if (!el.getAttribute('data-heroname').startsWith(name)) {
//                 el.classList.add('disabled_img');
//             }
//         })
//         // 
//     }

// // }