import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms (modalTimer) {
    
    let message = {
        downloading : 'img/form/spinner.svg',
        success : "Мы с вами свяжемся в ближайшее время",
        error : "Произошла ошибка"
    };

    const forms = document.querySelectorAll("form");

    forms.forEach(item => {
        bindPostData(item); 
    }); 


    function bindPostData(form) {
        form.addEventListener("submit", function(event){
            event.preventDefault();

            const statusMessage = document.createElement('img');

            statusMessage.src = message.downloading;
            statusMessage.style.cssText = ` 
                display: block;
                margin: 0 auto; 
            `;
            form.insertAdjacentElement('afterend', statusMessage);



            
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data); 
                showThanksModal(message.success);
                statusMessage.remove(); 
            })
            .catch(() => {
                showThanksModal(message.error);
            })
            .finally(() => {
                form.reset(); 
            });

        });
    }

    function showThanksModal(message){
        const prevModal = document.querySelector('.modal__dialog');
        
        prevModal.classList.add('hide');
        openModal("[data-modalWindow]", modalTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('[data-modalWindow]').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            closeModal("[data-modalWindow]");
        }, 2000);
    }

}

export default forms;