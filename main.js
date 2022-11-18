document.getElementById('reset').onclick = function() { localStorage.clear(); spanMaxScore.innerHTML = 1 };

const async = () => { return new Promise((res)=>{ setTimeout(()=>{ res();}, 1000);}); }

async function checkResponse(){ validatingResponse = true; fContinue = false
    
    pulsations++; parallels = check_parallels([]); StartGame(String(n))
        
    await async()
}

document.addEventListener("keydown", function(event) { n = event.which

    if(n === 27 || n === 81 || n === 96){ cleanKeyID(); }else { log('key pressed: ' + n,'game')

        if(n >= 37 && n <= 40){ 

            if(xy.get('c')[1] && keyID.length === 0){ keyID = n; }else { keyID = keyID + '' + n

                !validatingResponse && checkResponse()
            }
        }
    }
})
