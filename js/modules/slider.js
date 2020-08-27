
function slider ({container, slides, prevArrow, nextArrow, currentCounter, totalCounter, wrapper, sliderWindow}) {  

    const prevSlides = document.querySelector(prevArrow),
        nextSlides = document.querySelector(nextArrow),
        sliderDiv = document.querySelector(container),
        slider = document.querySelectorAll(slides),
        sliderNumber = document.querySelector(currentCounter),
        sliderTotal = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesWindow = document.querySelector(sliderWindow),
        width = window.getComputedStyle(slidesWrapper).width; 
    let sliderItem = 1;
    let offset = 0; 
    
    if(slider.length < 10) {
        sliderTotal.textContent = `0${slider.length}`;
        sliderNumber.textContent = `0${sliderItem}`;
    } else { 
        sliderTotal.textContent = slider.length;
        sliderNumber.textContent = sliderItem;
    }
    
    
    slidesWindow.style.width = 100 * slider.length + '%'; 
    slidesWindow.style.display = "flex"; 
    slidesWindow.style.transition = "0.5s all"; 

    slidesWrapper.style.overflow = "hidden"; 

    slider.forEach(slide => {
        slide.style.width = width; 
    });

    sliderDiv.style.position = 'relative'; 

    const dots = document.createElement('ol'), 
        dotsAll = [];   

    dots.classList.add('dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; 
    sliderDiv.append(dots); 

    for ( let i = 0; i < slider.length; i++) { 
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); 
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsAll.push(dot);

    }

    function cleanLetter(element) {
        return Number (element.replace(/\D/g, ''));
    }

    nextSlides.addEventListener('click', () => {
        if (offset == cleanLetter(width) * (slider.length - 1)) { 
        offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }
        
        slidesWindow.style.transform = `translateX(-${offset}px)`;  
        
        if (sliderItem == slider.length) {
            sliderItem = 1;
        } else {
            sliderItem++;
        }

        if(slider.length < 10) {
            sliderNumber.textContent = `0${sliderItem}`;
        } else { 
            sliderNumber.textContent = sliderItem;
        }
        dotsAll.forEach(dot => dot.style.opacity = ".5"); 
        dotsAll[sliderItem - 1].style.opacity = 1;
    });

    prevSlides.addEventListener('click', () => {
        if(offset == 0) { 
            (offset = cleanLetter(width) * (slider.length - 1));
        } else {
            offset -= cleanLetter(width);
        }
        
        slidesWindow.style.transform = `translateX(-${offset}px)`;  
    
        if (sliderItem == 1) {
            sliderItem = slider.length;
        } else {
            sliderItem--;
        }

        if(slider.length < 10) {
            sliderNumber.textContent = `0${sliderItem}`;
        } else { 
            sliderNumber.textContent = sliderItem;
        }

        dotsAll.forEach(dot => dot.style.opacity = ".5"); 
        dotsAll[sliderItem - 1].style.opacity = 1;
    });

    dotsAll.forEach(dot => {
        dot.addEventListener('click', function(event){
            const slideTo = event.target.getAttribute('data-slide-to'); 

            sliderItem = slideTo;
            offset = cleanLetter(width) * (slideTo - 1); 
            
            slidesWindow.style.transform = `translateX(-${offset}px)`; 

            if(slider.length < 10) {
                sliderNumber.textContent = `0${sliderItem}`;
            } else { 
                sliderNumber.textContent = sliderItem;
            }

            dotsAll.forEach(dot => dot.style.opacity = ".5"); 
            dotsAll[sliderItem - 1].style.opacity = 1;

        });
    });
}
export default slider;