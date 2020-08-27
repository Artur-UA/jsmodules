function calc() {
    
    const kkal = document.querySelector('.calculating__result span');

    
    let sex, height, weight,  age, ratio;

    if(localStorage.getItem('sex')){ 
        sex = localStorage.getItem('sex');
    } else {
        sex = 'woman'; 
        localStorage.setItem('sex', 'woman'); 
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio',  1.375);
    }

    function checkLocalStorage(selector, activeClass) { 
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => { 

            element.classList.remove(activeClass); 

            if (element.getAttribute('id') === localStorage.getItem('sex')) { 
                element.classList.add(activeClass);
            }
            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }

        });
    }

    checkLocalStorage('#gender div', 'calculating__choose-item_active');
    checkLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcKkal() {
        if(!sex || !height || !weight || !age || !ratio) {
            kkal.textContent = "Введите все данные";
            return; 
        }

        if (sex === 'woman'){
            kkal.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); 
        } else {
            kkal.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); 
        }
        
    }
    calcKkal();

    function getStaticInfo (parentSelector, activeClass) { 
        const elements = document.querySelectorAll(`${parentSelector} div`); 
        
        elements.forEach(elem => {
            elem.addEventListener('click', function(event){ 
                if (event.target.getAttribute('data-ratio')) { 
                    ratio = +event.target.getAttribute('data-ratio'); 
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else { 
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }
    
                elements.forEach(elem =>  {
                    elem.classList.remove(activeClass);
                });
                event.target.classList.add(activeClass); 
    
                calcKkal();
            });
        });
    }

    getStaticInfo('#gender', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInfo (selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () => { 
            
            if(input.value.match(/\D/g)) { 
                input.style.border = '3px solid red'; 
            } else {
                input.style.border = 'none'; 
            }

            switch (input.getAttribute('id')) {
                case "height" : 
                    height = +input.value; 
                    break;
                case "weight" :
                    weight = +input.value;
                    break;
                case "age" :
                    age = +input.value;
                    break;
            }
            calcKkal();
        });

    }
    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');

}

export default calc;