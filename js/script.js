window.addEventListener('DOMContentLoaded', () => {

    'use strict';
    const tab = document.querySelectorAll('.info-header-tab');
    const info = document.querySelector('.info-header');
    const tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Ttimer

    let deadline = '2022-05-30';
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t/1000) % 60);
        let minutes = Math.floor((t/1000/60) % 60);
        let hours = Math.floor((t/(1000 * 60 * 60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        const timer = document.getElementById(id);
        const hours = timer.querySelector('.hours');
        const minutes = timer.querySelector('.minutes');
        const seconds = timer.querySelector('.seconds');
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if (num <= 9) {
                    return `0${num}`;
                } else {
                    return num;
                }
            }
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    // Modal
    const btn = document.querySelectorAll('.description-btn, .more');
    // const more = document.querySelector('.more');
    const overlay = document.querySelector('.overlay');
    const close = document.querySelector('.popup-close');

    function showModal(button) {
        button.addEventListener('click', () => {
            overlay.style.display = 'block';
            button.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    }
    btn.forEach(showModal);

    function closeModal(button) {
        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            button.classList.remove('more-splash');
            document.body.style.overflow = '';
            statusMessage.classList.remove('sttus');
        });
    }

    btn.forEach(closeModal);

    // Form

    let message = {
        loading: 'Загрузка...',
        cuccess: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    const mainForm = document.querySelector('.main-form');
    const input = document.getElementsByTagName('input');
    const btnForm = document.querySelectorAll('.description-btn');
    const contactForm = document.querySelector('#form');
    let statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function requestForm(form) {
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        // request.send(formData);
        request.send(json);

        request.addEventListener('readystatechange', () => {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.cuccess;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }

    mainForm.addEventListener('submit', (event) => {
        event.preventDefault();
        mainForm.appendChild(statusMessage);
        requestForm(mainForm);
    });

    btnForm.forEach((item) => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();
            item.appendChild(statusMessage);
            requestForm(item);
        });
    });

    // не работает
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        contactForm.appendChild(statusMessage);
        requestForm(contactForm);
    });
});