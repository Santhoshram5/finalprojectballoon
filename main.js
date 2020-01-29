
// #region

let click_count = 0
let height = 120
let width = 100
let inflation_Rate = 20
let maxsize = 300
let highscore = 0
let currentpop_count = 0
let fixedtime = 15000
let clockid = 0
let timeremaining = 0
let currentplayer = {}
let currentcolor="yellow"
let possiblecolors=["red","green","blue","purple","pink"]
function startgame() {
    
    document.getElementById("game-controls").classList.remove("hidden")
    document.getElementById("controls").classList.add("hidden")
    document.getElementById("scoreboard").classList.add("hidden")

    startclock()
    setTimeout(stopgame, fixedtime)

}
function startclock() {
    timeremaining = fixedtime
    drawclock()
    clockid = setInterval(drawclock, 1000)
}
function stopclock() {
    clearInterval(clockid)
}
function drawclock() {
    let countdown_element = document.getElementById("countdown")
    countdown_element.innerText = (timeremaining / 1000).toString()
    timeremaining -= 1000
}
function pump() {
    click_count++
    height += inflation_Rate
    width += inflation_Rate
   checkballoonpop()
    draw()
}
function checkballoonpop()
{
    if (height >= maxsize) {
        console.log("pop")
        let balloon_element = document.getElementById("balloon")
        balloon_element.classList.remove(currentcolor)
        getrandomcolor()
        balloon_element.classList.add(currentcolor) 
        currentpop_count++
        height = 0
        width = 0
    }
}
function getrandomcolor()
{
    let index=Math.floor(Math.random()*possiblecolors.length)
    currentcolor=possiblecolors[index]
}
function draw() {
    let popcount_element = document.getElementById("pop-count")
    let balloon_element = document.getElementById("balloon")
    let highpopcount_element = document.getElementById("highpop-count")
    let playername_element= document.getElementById("player-name");
    balloon_element.style.height = height + "px"
    balloon_element.style.width = width + "px"
    let click_count_element = document.getElementById("click-count")
    click_count_element.innerText = click_count.toString()
    popcount_element.innerText = currentpop_count.toString()
    highpopcount_element.innerText = currentplayer.topScore.toString()
    playername_element.innerText=currentplayer.name
}
function stopgame() {
    console.log("Time up")
    document.getElementById("controls").classList.remove("hidden")
    document.getElementById("game-controls").classList.add("hidden")
    document.getElementById("scoreboard").classList.remove("hidden")
    
    click_count = 0
    height = 120
    width = 100
    if (currentpop_count > currentplayer.topScore) {
        currentplayer.topScore = currentpop_count
        saveplayers()
    }
    currentpop_count = 0
    stopclock()
    draw()
    drawscoreboard()
}
// #endregion

let players = []
loadPlayers()
function setplayer(event) {
    event.preventDefault()
    let form = event.target
    let playername = form.playername.value
    currentplayer = players.find(player => player.name == playername)
    if (!currentplayer) {
        currentplayer = { name: playername, topScore: 0 }
        players.push(currentplayer)
        saveplayers()
    }

    form.reset()
    document.getElementById("game").classList.remove("hidden")
    form.classList.add("hidden")
    draw()
    drawscoreboard()
}
function changeplayer()
{
    document.getElementById("player-form").classList.remove("hidden")
    document.getElementById("game").classList.add("hidden")
}
function saveplayers() {
    window.localStorage.setItem("players", JSON.stringify(players))
}
function loadPlayers() {
    let playersdata = JSON.parse(window.localStorage.getItem("players"))
    if (playersdata) {

        players = playersdata
    }
}
function drawscoreboard()
{
    let template=""
    players.sort((p1,p2)=>p2.topScore-p1.topScore)
    players.forEach(player => {
        template += `
        <div class="d-flex space-between">
                <span>
                    <i class="fa fa-user"></i>
                    ${player.name}
                </span>
                <span>
                    ${player.topScore}
                </span>
        </div>
            `
    })
    document.getElementById("players").innerHTML=template
}

drawscoreboard()