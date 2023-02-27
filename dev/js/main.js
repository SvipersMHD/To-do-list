var btnHide = document.querySelector(".hide")
var btnAddTask = document.querySelector(".btn__add")
var btnDelette = document.querySelector(".btn__removeall")
var input = document.querySelector("input")
var askWrapper = document.querySelector(".ask__box")
var askWrapperBox = document.querySelector(".ask__wrapper")
var error = document.querySelector(".error")
var errorHide = document.querySelector(".error__hide")
var showDiv = document.createElement(`div`)
var askDataFromLocalStorage = localStorage.getItem('askData');

// Chargement du localstorage aux chargement de la page 
if (askDataFromLocalStorage) {
    askWrapper.innerHTML = askDataFromLocalStorage;
}

showDiv.innerHTML = "Show list"
showDiv.classList.add("show")
btnHide.innerHTML = "Hide list"
btnHide.classList.add("hide")

function rajoutTask(){
    if(input.value.length >= 1 && document.querySelector(".hide")){
        error.style.display = "none"
        errorHide.style.display = "none"
        var inputData = input.value
        var askData = 
        `
        <div class="ask">
        <span>${inputData}</span>
        <button class="btn__remove">remove</button>
        </div>
        `
        // askWrapper.innerHTML += askData
        
        askWrapper.insertAdjacentHTML('afterbegin', askData);
        // Sauvegarde des données
        localStorage.setItem('askData', askWrapper.innerHTML); 
        
        var askTranslate = document.querySelector(".ask")
        gsap.fromTo(
            askTranslate,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
            
            
            input.value = ""
            
            var btnRemoveTask = document.querySelectorAll(".btn__remove")
            
            btnRemoveTask.forEach(function(removeTask){
                removeTask.addEventListener("click", function(){
                    removeTask.closest("div").remove()
                    localStorage.setItem('askData', askWrapper.innerHTML);
                })
            });
            btnDelette.addEventListener("click", function(){
                askWrapper.innerHTML = ""
                localStorage.removeItem('askData');
            })
        }
        else if(input.value.length >= 1) {
            error.style.display = "none"
            errorHide.style.display = "block"
        } 
        else if(document.querySelector(".hide")) {
            errorHide.style.display = "none"
            error.style.display = "block"
        }
    }
    function enlever(){
        var btnRemoveTask = document.querySelectorAll(".btn__remove")
        btnRemoveTask.forEach(function(removeTask){
            removeTask.addEventListener("click", function(){
                removeTask.closest("div").remove()
                localStorage.setItem('askData', askWrapper.innerHTML);
            })
        });
        btnDelette.addEventListener("click", function(){
            askWrapper.innerHTML = ""
            localStorage.removeItem('askData');
        })
    }
    // SHOW HIDE 
    btnHide.addEventListener("click", function(){
        var tailleWrapper = askWrapperBox.offsetHeight
        gsap.to(askWrapperBox, {
            y: (-tailleWrapper),
            duration: 0.5,
        })
        
        btnHide.replaceWith(showDiv)
    })
    showDiv.addEventListener("click", function(){
        var tailleWrapper = askWrapperBox.offsetHeight
        gsap.to(askWrapperBox, {
            y: tailleWrapper - tailleWrapper,
            duration: 0.5,
        })
        showDiv.replaceWith(btnHide)
    })
    ///////
    document.addEventListener("keydown", function(enter){
        if(enter.key === "Enter") {  
            rajoutTask() 
        }
    });
    btnAddTask.addEventListener("click", function(){
        rajoutTask()
    });
    
    window.addEventListener('load', function() {
        var askDataFromLocalStorage = localStorage.getItem('askData');
        if (askDataFromLocalStorage) {
            askWrapper.innerHTML = askDataFromLocalStorage;
        }
        enlever()
    });
