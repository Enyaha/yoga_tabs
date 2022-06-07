function form() {

    let message = {
        loading: 'Загрузка...',
        cuccess: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    const mainForm = document.querySelector('.main-form');
    const input = document.getElementsByTagName('input');
    const contactForm = document.getElementById('form');
    let statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function(e) {
            e.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);
            // let obj = {};
            // formData.forEach((value, key) => {
            //     obj[key] = value;
            // });
            // let json = JSON.stringify(obj);

            function postData(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();

                    request.open('POST', 'server.php');

                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    // request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    
                    request.onreadystatechange = function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4) {
                            if (request.readyState == 200 && request.readyState < 3) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    };

                    request.send(data);
                    // request.send(json);
                });
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }
            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => {
                    statusMessage.innerHTML = message.cuccess;
                })
                .catch(()=> statusMessage.innerHTML = message.failure)
                .then(clearInput);
        });
    }

    sendForm(mainForm);
    sendForm(contactForm);
}

module.exports = form;