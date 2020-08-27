
function openModal (modalSelector, modalTimer) { 
    const modalWindow = document.querySelector(modalSelector); 
    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden";

    console.log(modalTimer);
    if (modalTimer){ 
        clearInterval(modalTimer); 
    }              
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    document.body.style.overflow = "";
    modalWindow.classList.remove("show");
    modalWindow.classList.add("hide");
}


function modal (btnSelector, modalSelector, modalTimer) { 


    let btnModal = document.querySelectorAll(btnSelector),
        modalWindow = document.querySelector(modalSelector);

    btnModal.forEach(btn => { 
        btn.addEventListener("click", () => openModal(modalSelector, modalTimer)); 
        });


    modalWindow.addEventListener("click", (event) => { 
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') { 
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (e) => { 
        if (e.code === "Escape"&& modalWindow.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {

        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, modalTimer);
        window.removeEventListener("scroll", showModalByScroll); 
        }    
    }

    window.addEventListener("scroll", showModalByScroll); 


    
}

export default modal;
export {openModal, closeModal}; 