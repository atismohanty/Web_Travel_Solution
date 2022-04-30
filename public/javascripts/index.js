

document.onload = (function() {
    var navbarTop = document.getElementById("navsec").offsetTop;
    var feedbackTop = document.getElementById("feedback").offsetTop;
    
    var sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight);
    // SendEmail();

    document.addEventListener('scroll', execScrollFuncs);

    function execScrollFuncs(event) {
        console.log('Position Y ', this.scrollY)
        const exec = [fixNavBar, transitionFeedback];
        exec.forEach(function(func) {
            func.call(this);
        })
    }
    
    function fixNavBar() {

        if(window.scrollY > Number(navbarTop)) {
            var navElem = document.getElementById("navsec");
          if (! navElem.classList.contains('fixed-pos')) {
            navElem.classList.add('fixed-pos')
           }
        } else {
            var navElem = document.getElementById("navsec");
            if ( navElem.classList.contains('fixed-pos')) {
                navElem.classList.remove('fixed-pos');
               }
        }
    }

    function transitionFeedback() {
        // feedbackTop = this.scrollY;  console.log(feedbackTop);
        if(window.scrollY + 400 > ( Number(feedbackTop) )) {
            var ctrElem = document.getElementById("feedback-container");
          if (! ctrElem.classList.contains('transition')) {
            ctrElem.classList.add('transition')
           }
        }
    }
})();

function submitForm(event) {
    event.preventDefault();
    const form =  document.forms[0];
    if (form && validateFrom(form)) {
        this.SendEmail(form);
    }
}

function validateFrom(form) {
    if(! form.checkValidity()) return false;
    if( ! form.elements.fullName.checkValidity()) {
        setErrorMessage('fullName-error', 'Please enter your full name.');
        return false;
    } else {
        setErrorMessage('fullName-error', '', true);
    }
    if( ! form.elements.contactNo.checkValidity() || !( form.elements.contactNo.value.length >= 10 && form.elements.contactNo.value.length <= 12)) {
        setErrorMessage('contactNo-error', 'Contact Number should be between 10-12 digit.');
        return false
    } else {
        setErrorMessage('contactNo-error', '', true);
    }
    if (! new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(form.elements.email.value)) {
        setErrorMessage('email-error', 'Please enter a correct email address.');
        return false;
    } else {
        setErrorMessage('email-error', '', true);
    }
    return true;

    function setErrorMessage(el, message, flag = false) {
        const errElem = document.getElementById(el);
        if(errElem && !flag) {
            errElem.style.display = 'block';
            errElem.innerHTML = message;
        } else if(flag){
            errElem.style.display = 'none';
            errElem.innerHTML = message;
        }
    }
}

function emailObj(form) {
    this.name = form.elements.fullName.value;
    this.email = form.elements.email.value;
    this.contactNo = form.elements.contactNo.value;
    this.comments = form.elements.additionalInfo.value;
}


function SendEmail(form) {
    var http =  new XMLHttpRequest();
    const body =  new emailObj(form);
    http.open('POST', 'http://localhost:3000/sendmail');
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            document.forms[0].reset();
            alert('Your request have been sent to the concerned person. You will shortly get a call on the number supplied.');
        }
    }
    http.send(JSON.stringify(body));
}

function showCardWindow(param) {
    let header ='';
    let body = [];
    switch(param) {
        case 'microHatch':
            header = 'Micro Hatchback Cars';
            body = [ 'A range of small cars that can mount 3 people excluding the driver', 'Cost : Starts from Rs 5/Km', 'Cars : Nisan Micra, Maruti Alto'];
            break;
        case 'miniHatch':
            header = 'Hatchback Cars';
            body = [ 
            'A range of small or mid segment cars that can mount 3-4 people excluding the driver. Compared to the micro hatchback cars thesecars have addiitonal bootspaces and leg spaces for better comfort', 
            'Cost : Starts from Rs 8/Km',
            'Cars : Hyundai i20, Maruti Suzuki Boleno'];
            break;
        case 'sedan':
            header = 'Hatchback Cars';
            body = [ 
            'A range of sedan class cars that can mount 3-4 people excluding the driver. These cars provide addiitonal bootspaces and leg spaces for better comfort', 
            'Cost : Starts from Rs 12/Km',
            'Cars : Hyundai Accent, Hyundai Verna, Honda City, Maruti Suzuki Swift Dezire'];
            break;
        case 'suv':
            header = 'Hatchback Cars';
            body = [ 
            'A range of sports class cars that can mount 5-7 people excluding the driver. These cars provide addiitonal bootspaces and leg spaces for better comfort', 
            'Cost : Starts from Rs 18/Km',
            'Cars : Mahindra Scorpio, Mahindra XUV500'];
            break;
    }
    $("#exampleModalCenter").modal();
    $('.modal-title')[0].innerText = header;
    let dialogtext = $('.modal-text-ctr');
    for(let i=0 ; i < dialogtext.length ; i++) {
        dialogtext[i].innerText = body?.[i] || '';
    }
    
}