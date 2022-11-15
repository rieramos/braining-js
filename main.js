document.getElementById('reset').onclick = function() { localStorage.clear(); spanMaxScore.innerHTML = 1 };

document.addEventListener("keydown", function(event) { n = event.which

    keyID === '' && console.clear();

    if(n === 27 || n === 81 || n === 96){ cleanKeyID() } else{ log('key pressed: ' + n,'game')
    
        if(n >= 37 && n <= 40){ parallels = check_parallels([]); StartGame(String(n))}
    }
})
