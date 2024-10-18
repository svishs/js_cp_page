function logicForDouble_Triple_Quarter_names(){
}

export function onInputSearchHandler(event, short_names_obj) {
    let name = (event.target.value).toLowerCase();
    // findPatternNameAndShadeStyle(name);
    let fa = document.querySelectorAll('.image-div'); //<< 
    // быстро восстанавливаем все стили( пока так )
    fa.forEach((el) => {
        el.classList.remove('disabled_img');
    });

    if (name != '') {
        fa.forEach((el) => {
            if (!el.getAttribute('data-heroname').startsWith(name)) {
                el.classList.add('disabled_img');
            }
        })
        // 
    }

}