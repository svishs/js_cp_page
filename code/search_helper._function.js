function logicForDouble_Triple_Quarter_names(){
}

export const onInputSearchHandler = {
    innerDict:null,
    storedDivs: null,
    
    init: function(sourceDict){
        this.innerDict = 1;// сюда запихаем доп массив объектов
        this.storedDivs = document.querySelectorAll('.image-div'); //<<
        // console.log('storedDivs');
        // console.log(this.storedDivs);
    },

    executor: function(event){
        let name = (event.target.value).toLowerCase();
        // alert(event.target.value);
        // console.log(this);
        this.storedDivs.forEach((el) => {
            el.classList.remove('disabled_img');
        });
        if (name != '') {
            this.storedDivs.forEach((el) => {
                if (!el.getAttribute('data-heroname').startsWith(name)) {
                    el.classList.add('disabled_img');
                }
            })
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