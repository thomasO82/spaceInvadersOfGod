let mapContainer = document.querySelector('#gameContainer')
let ennemyInterval = null
let shootInterval = null
let map = [
    [2, 2, 2, 2, 2, 0, 0],
    [2, 2, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
]

ennemyInterval = setInterval(() => {
    moveEnnemy()
}, 1000)

shootInterval = setInterval(()=>{
    shoot()
},200)

window.addEventListener('keyup', (key) => {
    actionPlayer(key)
})

function displayMap() {
    mapContainer.innerHTML = ""
    map.forEach((row) => {
        let rowContainer = document.createElement('div')
        rowContainer.classList.add('row')
        mapContainer.appendChild(rowContainer)
        row.forEach((cell) => {
            let cellContainer = document.createElement('div')
            cellContainer.classList.add("cell")
            rowContainer.appendChild(cellContainer)
            switch (cell) {
                case 1:
                    cellContainer.innerHTML = "A"
                    break;
                case 2:
                    cellContainer.innerHTML = "O"
                    break;
                case 3:
                    cellContainer.innerHTML = "I"
                    break;
            }
        });
    })
}

function moveEnnemy() {
    let hasEnemmy = false
    for (let i = map.length - 2; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {
            if (map[i][j] == 2) {
                hasEnemmy = true
                if (i == map.length - 2) {
                    gameover()
                    return
                }
                if (j == map[i].length - 1) {
                    console.log("jdhfhjdjdh");
                    map[i][j] = 0
                    map[i + 1][0] = 2
                } else {
                    map[i][j] = 0
                    map[i][j + 1] = 2
                }

            }

        }
    }
    if (!hasEnemmy) {
        gameSuccess()
    }else{

        displayMap()
    }
}

function gameSuccess() {
    clearInterval(ennemyInterval)
    clearInterval(shootInterval)
    mapContainer.innerHTML = "Gagner !"
}

function gameover() {
    clearInterval(shootInterval)
    clearInterval(ennemyInterval)
    mapContainer.innerHTML = "GAME OVER"
}

function actionPlayer(key) {
    let ground = map[map.length - 1]
    let indexPlayer = ground.indexOf(1)
    switch (key.keyCode) {
        case 39:
            if (indexPlayer < map.length - 1) {
                ground[indexPlayer] = 0
                ground[indexPlayer + 1] = 1
            }
            break;
        case 37:
            if (indexPlayer > 0) {
                ground[indexPlayer] = 0
                ground[indexPlayer - 1] = 1
            }
            break;
        case 32:
            map[map.length - 2][indexPlayer] = 3
            break;
    }
    displayMap()
}

function shoot() {
    for (let i = 0; i < map.length; i++) {
       for (let j = 0 ; j < map[i].length; j++) {
        console.log('jdsjh');
        if (map[i][j] == 3) {
            map[i][j] = 0
            if (map[i - 1][j] == 2) {
                map[i - 1][j] = 0
            }else{
                map[i-1][j] = 3 
                console.log(map);

            }

            
        }
        displayMap()

       }
        
    }
}



displayMap()



