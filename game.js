let opp_num = 3// מספר השחקנים חוץ מהמשתמש
let score = {}//הניקוד של השחקנים במשחק הנוכחי
let allscore = {}//הניקוד של השחקנים מכל המשחקים יחד 
let count_user_drop = 0   //ספירת קלפים זרוקים של המשתמש const all_five_cards = {};
let Pdiv;

let playersNames = {}
const all_five_cards = {};
let user_opened13 = 0;


function onload() {
    randplace();
    get_board();
    Pdiv = document.querySelectorAll(".user_five_cards");

    all_five_cards[1] = Pdiv
    for (let i = 2; i <= opp_num + 1; i++) {
        Pdiv = document.getElementById(`hold_five_cards${i}`);
        all_five_cards[i] = Array.from(Pdiv.children);
    }
    setTimeout(() => {
        for (let i = 1; i <= opp_num + 1; i++)
            for (let j = 0; j < 5; j++) {

                all_five_cards[i][j].style.transform = 'rotateY(180deg)';
            }
    }, 500);
}

// יצירת הלוח של תחילת המשחק
function get_board() {
    // ********** יצירת השחקנים מולם משחק המשתמש **********   
    for (let i = 2; i <= opp_num + 1; i++) {
        playersNames[i] = "player" + i

        score[i] = 0;
        const opp_board = document.createElement("div");
        opp_board.id = "opp_board" + i;
        opp_board.className = "opp_board";
        const hold_five_cards = document.createElement("div");
        hold_five_cards.id = "hold_five_cards" + i;
        hold_five_cards.className = "hold_five_cards";
        for (let j = 0; j < 5; j++) {
            const img_front = document.createElement("img");
            img_front.alt = "card";
            img_front.src = `images/${colors[cards5[i][j].color]}/${cards5[i][j].number}.jpg`;
            //חדשששששששששש שתי שורות
            img_front.number = cards5[i][j].number;
            img_front.color = colors[cards5[i][j].color];
            img_front.draggable = false;
            const front = document.createElement("div");
            front.className = "card-front";
            front.id = "card-front" + i;
            front.appendChild(img_front);

            const img_back = document.createElement("img");
            img_back.class = "img_back";
            img_back.alt = "card-back";
            img_back.src = `images/backCards/${colors[i - 1]}.png`;
            img_back.draggable = false;
            const back = document.createElement("div");
            back.id = "card-back" + i;
            back.className = "card-back";
            back.appendChild(img_back);

            const five_cards = document.createElement("div");
            five_cards.id = `five_cards${j}_opp${i}`;
            five_cards.className = "five_cards";
            five_cards.appendChild(front);
            five_cards.appendChild(back);

            hold_five_cards.appendChild(five_cards);

        }
        opp_board.appendChild(hold_five_cards);
        const img_back = document.createElement("img");
        img_back.class = "img_back";
        img_back.alt = "card-back";
        img_back.src = `images/backCards/${colors[i - 1]}.png`;
        img_back.draggable = false;

        const back = document.createElement("div");
        back.id = "card-back1"
        back.className = "card-back";
        back.appendChild(img_back);
        const img_front = document.createElement("img");
        img_front.class = "img_front";
        img_front.alt = "card-front";
        img_front.src = `images/${colors[cards13[i][cards13[i].length - 1].color]}/${cards13[i][cards13[i].length - 1].number}.jpg`;
        img_front.draggable = false;

        const front = document.createElement("div");
        front.id = "card-front1"
        front.className = "card-front";
        front.appendChild(img_front);

        const thirteen = document.createElement("div");
        thirteen.id = `thirteen${i}`;
        thirteen.className = "thirteen";
        thirteen.appendChild(front);
        thirteen.appendChild(back);

        opp_board.append(thirteen);

        const open_game_cards = document.createElement("div");
        open_game_cards.id = `open_game_cards${i}`;
        open_game_cards.className = "open_game_cards";


        const close_game_cards = document.createElement("div");
        close_game_cards.id = `close_game_cards${i}`;
        close_game_cards.className = "close_game_cards";

        const cards = document.createElement("div");
        cards.id = `game_cards${i}`;
        cards.className = "game_cards";
        cards.appendChild(open_game_cards);
        cards.appendChild(close_game_cards);

        const opponent = document.createElement("div");
        opponent.id = `opp${i}`;
        opponent.className = "opponent";
        opponent.appendChild(opp_board);
        opponent.appendChild(cards);

        const opponents_div = document.getElementById("players");
        opponents_div.appendChild(opponent);
        // הצגת הקלפים של ה 3 חדשששששששששש
        const img_back2 = document.createElement("img");
        img_back2.className = "img_back";
        img_back2.id = "img_back3";
        img_back2.alt = "card-back";
        img_back2.src = `images/backCards/${colors[i - 1]}.png`;
        let back2 = document.getElementById(`close_game_cards${i}`);
        img_back2.draggable = false;

        back2.appendChild(img_back2);
        const img_front2 = document.createElement("img");
        img_front2.className = "img_front";
        img_front2.id = "img_front3";
        img_front2.alt = "card-front";
        img_front2.hidden = true;
        img_front2.number = 0;
        img_front2.color = 0
        img_front2.draggable = false;

        let back3 = document.getElementById(`open_game_cards${i}`);
        back3.appendChild(img_front2);
    }


    // ********** יצירת לוח המשחק **********   
    const board = document.getElementById("board");


    for (let i = 0; i < 16; i++) {
        const pile = document.createElement("div");
        pile.id = `pile${i}`;
        pile.className = "pile";
        pile.number = 0;
        pile.setAttribute("ondrop", "dropImage(event)");
        pile.setAttribute("ondragover", "allowDrop(event)");

        rot = Math.ceil(Math.random() * 50);
        zero = Math.floor(Math.random() * 2);
        if (zero)
            rot = 'rotate(' + rot + 'deg)';
        else
            rot = 'rotate(' + -rot + 'deg)';
        pile.style.transform = rot;
        board.appendChild(pile);
    }


    // ********** יצירת לוח הקלפים של המשתמש **********   
    const user_board = document.createElement("div");
    playersNames[1] = "אני";

    score[1] = 0
    user_board.id = "user_board";
    user_board.className = "user_board";
    for (let j = 0; j < 5; j++) {
        const img_back = document.createElement("img");
        img_back.class = "img_back";
        img_back.alt = "card-back";
        img_back.src = `images/backCards/${colors[0]}.png`;
        const back = document.createElement("div");
        back.id = "card-back1";
        back.className = "card-back";
        back.appendChild(img_back);

        const img_front = document.createElement("img");
        img_front.id = `from-five${j}`;
        img_front.draggable = true;
        img_front.number = cards5[1][j].number;
        img_front.color = colors[cards5[1][j].color];
        img_front.className = "img_front";
        img_front.alt = "card";
        img_front.src = `images/${colors[cards5[1][j].color]}/${cards5[1][j].number}.jpg`;
        // Add dragstart event listener 
        img_front.setAttribute("ondragstart", "dragStart(event)");
        img_front.setAttribute("ondragend", "dragEnd(event)");

        const front = document.createElement("div");
        front.className = "card-front";
        front.id = "card-front1"
        front.appendChild(img_front);


        const user_five_cards = document.createElement("div");
        user_five_cards.id = `user_five_cards${j}`;
        user_five_cards.className = "user_five_cards";
        user_five_cards.appendChild(back);
        user_five_cards.appendChild(front);
        user_board.appendChild(user_five_cards);
    }


    const img_back = document.createElement("img");
    img_back.class = "img_back";
    img_back.alt = "card-back";
    img_back.src = `images/backCards/${colors[0]}.png`;
    img_back.draggable = false;

    const back = document.createElement("div");
    back.id = "card-back1"
    back.className = "card-back";
    back.appendChild(img_back);


    const user_thirteen = document.createElement("div");
    user_thirteen.id = "user_thirteen";
    user_thirteen.className = "user_thirteen";
    user_thirteen.appendChild(back);
    user_board.append(user_thirteen);

    const user_open_game_cards = document.createElement("div");
    user_open_game_cards.id = "user_open_game_cards";
    user_open_game_cards.className = "user_open_game_cards";


    const game_img_back = document.createElement("img");
    game_img_back.class = "img_back";
    game_img_back.alt = "card-back";
    game_img_back.src = `images/backCards/${colors[0]}.png`;
    game_img_back.draggable = false;


    const game_back = document.createElement("div");
    game_back.id = "card-back1";
    game_back.className = "card-back";
    game_back.appendChild(game_img_back);
    game_img_back.setAttribute("onclick", "click_user_cards3()");
    game_img_back.setAttribute("ondragstart", "dragStart(event)");


    const user_close_game_cards = document.createElement("div");
    user_close_game_cards.id = "user_close_game_cards";
    user_close_game_cards.className = "user_close_game_cards";
    user_close_game_cards.appendChild(game_back);
    const user_cards = document.createElement("div");
    user_cards.id = "user_game_cards";
    user_cards.className = "user_game_cards";
    user_cards.appendChild(user_open_game_cards);
    user_cards.appendChild(user_close_game_cards);

    const user_div = document.getElementById("user");
    user_div.appendChild(user_board);
    user_div.appendChild(user_cards);
}




let cardsP = {};//array for place
let cards3 = {};//array for 3
let cards13 = {};//array for 13
let cards5 = {};//array for 5
let index_cards3 = {}

const colors = ['blue', 'red', 'green', 'yellow'];
const users = ['blue', 'red', 'green', 'yellow', 'wblue', 'per'];
const users_colors = ['#09417c', '#c41819', '#7db30c', '#fde204', '#008697', '#6b1a5f'];


onload();

const game_board = document.getElementById("board");
const piles = Array.from(game_board.children); //מערך ערימות
const empty_piles = []
for (let i = 0; i < 16; i++) {
    empty_piles.push(i);

}


function randplace() {//to rand number & color
    for (let index = 1; index <= opp_num + 1; index++) {
        index_cards3[index] = 0;
        cardsP[index] = [];
        cards3[index] = [];
        cards13[index] = [];
        cards5[index] = [];
        for (let i = 0; i < 52; i++) {
            x = Math.ceil(Math.random() * 13);//for number
            y = Math.floor(Math.random() * 4);//for color
            while (!search(cardsP[index], x, y)) {
                x = Math.ceil(Math.random() * 13);
                y = Math.floor(Math.random() * 4);
            }
            cardsP[index].push({ color: y, number: x });
        }
        cards13[index] = cardsP[index].slice(5, 18);
        cards3[index] = cardsP[index].slice(18, 52);
        cards5[index] = cardsP[index].slice(0, 5);
    }
}


function search(array, x, y) {//to check if exist
    for (let i = 0; i < array.length; i++) {
        if (array[i].number == x && array[i].color == y)
            return false;
    }
    return true;
}
let flag = {}
for (let k = 2; k <= opp_num + 1; k++) {
    flag[k] = false;
    const setInterval1 = setInterval(() => {
        if (!flag[k]) {
            flag[k] = true;
            count = 0, countY = 0;
            let rightCard = is_able_to_open(k);
            if (rightCard != null) {
                count++;
                if (rightCard.is_start) {
                    let r = Math.floor(Math.random() * 16)
                    while (!search_empty_piles(r)) {
                        r = Math.floor(Math.random() * 16)
                    }
                    put_opp_card(rightCard, k, r)
                }
                else if (rightCard.is_stop) {
                    let r;
                    for (let index = 0; index < piles.length; index++) {
                        if (piles[index].number === 12) {
                            r = index;
                            break;
                        }
                    }
                    put_opp_card(rightCard, k, r)
                }
                else {
                    put_opp_card(rightCard, k, rightCard.num_of_pile)
                }
            }
            else {
                for (let j = 0; j < 5; j++) {
                    let img_five;
                    img_five = all_five_cards[k][j].querySelector(`#card-front${k}`).getElementsByTagName('img')[0];
                    if (img_five.number === 0) {
                        let card13 = cards13[k][cards13[k].length - 1];
                        cards13[k].splice(cards13[k].length - 1, 1);
                        img_five.src = `images/${colors[card13.color]}/${card13.number}.jpg`;
                        img_five.style.display = "block";
                        img_five.number = card13.number;
                        img_five.color = colors[card13.color];
                        img_five.className = "img_front";
                        img_five.id = "img_front_five"
                        img_five.draggable = false;

                        if (cards13[k].length === 0)
                            roundWin(k);
                        break;
                    }
                    flag[k] = false;

                }
                if (is_able_to_open(k) === null) {
                    setTimeout(() => {
                        if (index_cards3[k] == cards3[k].length - 1) {
                            index_cards3[k] = 0;
                            let temp = cards3[k][0];
                            cards3[k].splice(0, 1);
                            cards3[k].push(temp);
                        }
                        else {
                            index_cards3[k] += 3;
                            if (index_cards3[k] > cards3[k].length - 1)
                                index_cards3[k] = cards3[k].length - 1;
                        }
                        //

                        if (index_cards3[k] > cards3[k].length - 1)
                            index_cards3 = cards3[k].length - 1
                        if (index_cards3[k] == cards3[k].length - 1) {
                            index_cards3[k] = 0;
                            let temp = cards3[k][0];
                            cards3[k].splice(0, 1);
                            cards3[k].push(temp);
                        }
                        else {
                            index_cards3[k] += 3;
                            if (index_cards3[k] > cards3[k].length - 1)
                                index_cards3[k] = cards3[k].length - 1;
                        }
                        for (let i = 2; i >= 0; i--) {
                            if (index_cards3[k] === 0)
                                i = 0;
                            else
                                if (index_cards3[k] === 1)
                                    i = 1;
                            let open_card3 = document.getElementById(`open_game_cards${k}`);
                            let img_open = document.createElement("img");
                            img_open.className = "img_front"
                            img_open.number = cards3[k][index_cards3[k] - i].number;
                            img_open.color = cards3[k][index_cards3[k] - i].color;
                            img_open.src = `images/${colors[cards3[k][index_cards3[k] - i].color]}/${cards3[k][index_cards3[k] - i].number}.jpg`;
                            open_card3.appendChild(img_open);
                            img_open.draggable = false;
                            flag[k] = false;
                        }
                    }, 500);
                }
            }
        }
    }
        , 1000);
}
function is_able_to_open(oppNum) {
    let rightCard = {}
    let image1, image2;
    for (let i = 0; i < 5; i++) {
        image1 = all_five_cards[oppNum][i].children[0].querySelector('img');
        if (image1.number === 1) {
            rightCard.color = image1.color;
            rightCard.number = image1.number;
            rightCard.indexCard = i;
            rightCard.is_start = true;
            rightCard.is_stop = false;
            rightCard.num_of_pile = -1;
            rightCard.is_from_five = true;
            return rightCard;
        }
        for (let j = 0; j < piles.length; j++) {
            if (piles[j].number != 0) {
                if (image1.number - 1 === piles[j].number && (image1.color === piles[j].color || image1.number === 2)) {
                    rightCard.color = image1.color;
                    rightCard.number = image1.number;
                    rightCard.indexCard = i;
                    rightCard.is_start = false;
                    rightCard.is_stop = false;
                    rightCard.num_of_pile = j;
                    rightCard.is_from_five = true;
                    return rightCard;
                }
                if (image1.number === 13 && piles[j].number === 12) {
                    rightCard.color = image1.color;
                    rightCard.number = image1.number;
                    rightCard.indexCard = i;
                    rightCard.is_start = false;
                    rightCard.is_stop = true;
                    rightCard.num_of_pile = j;
                    rightCard.is_from_five = true;
                    return rightCard;
                }

            }
        }
    }
    let open_cards = Array.from(document.getElementById(`open_game_cards${oppNum}`).children);
    image2 = open_cards[open_cards.length - 1]
    if (image2.number === 1) {
        rightCard.color = colors[image2.color];
        rightCard.number = image2.number;
        rightCard.indexCard = 6;
        rightCard.is_start = true;
        rightCard.is_stop = false;
        rightCard.num_of_pile = -1;
        rightCard.is_from_five = false;
        return rightCard;
    }
    if (image2.number != 0) {
        for (let i = 0; i < piles.length; i++) {
            if (piles[i].number != 0) {
                if (image2.number - 1 === piles[i].number && (colors[image2.color] === piles[i].color || image2.number === 2)) {
                    rightCard.color = colors[image2.color];
                    rightCard.number = image2.number;
                    rightCard.indexCard = 6;
                    rightCard.is_start = false;
                    rightCard.is_stop = false;
                    rightCard.is_from_five = false;
                    rightCard.num_of_pile = i;
                    return rightCard;
                }
                if (image2.number === 13 && piles[i].number === 12) {
                    rightCard.color = colors[image2.color];
                    rightCard.number = image2.number;
                    rightCard.indexCard = 6;
                    rightCard.is_start = false;
                    rightCard.is_stop = true;
                    rightCard.num_of_pile = i;
                    rightCard.is_from_five = false;
                    return rightCard;
                }

            }
        }
    }

    return null;
}
function search_empty_piles(r) {
    for (let i = 0; i < empty_piles.length; i++) {
        if (empty_piles[i] === r) {
            empty_piles.splice(i, 1);
            return true;
        }
    }
    return false;
}
function put_opp_card(rightCard, i, r) {
    let img_pile = document.createElement("img");
    img_pile.src = `images/${rightCard.color}/${rightCard.number}.jpg`
    img_pile.className = "img_front";
    img_pile.number = rightCard.number;
    if (rightCard.is_from_five)
        img_pile.color = rightCard.color;
    else
        img_pile.color = colors[rightCard.color]
    let card;
    if (rightCard.is_from_five) {
        card = document.getElementById(`five_cards${rightCard.indexCard}_opp${i}`).querySelector(`#card-front${i}`).getElementsByTagName('img')[0];
    }
    else {
        let open_cards = Array.from(document.getElementById(`open_game_cards${i}`).children);
        let img = open_cards[open_cards.length - 1]
        card = img
    }

    card.className = "img_front"
    let playingSurface = document.getElementById(`pile${r}`);
    let cardRect = card.getBoundingClientRect();
    let playingSurfaceRect = playingSurface.getBoundingClientRect();
    let targetX = playingSurfaceRect.left + playingSurfaceRect.width / 2 - cardRect.width / 2;
    let targetY = playingSurfaceRect.top + playingSurfaceRect.height / 2 - cardRect.height / 2;
    let currentX = cardRect.left;
    let currentY = cardRect.top;
    let speed = 10;
    function moveCard() {
        const directionX = targetX - currentX;
        const directionY = targetY - currentY;
        const distanceToTarget = Math.hypot(directionX, directionY);
        const unitDirectionX = directionX / distanceToTarget;
        const unitDirectionY = directionY / distanceToTarget;
        const moveAmountX = unitDirectionX * speed;
        const moveAmountY = unitDirectionY * speed;
        currentX += moveAmountX;
        currentY += moveAmountY;
        card.style.transform = `translate(${currentX - cardRect.left}px, ${currentY - cardRect.top}px)`;
        if (distanceToTarget > speed) {
            if (rightCard.is_start === false) {
                if ((piles[r].number === 0 && piles[r].number === 13) || (piles[r].number === rightCard.number)) {
                    if (rightCard.is_from_five) {
                        playingSurface = document.getElementById(`five_cards${rightCard.indexCard}_opp${i}`).querySelector(`#card-front${i}`)
                    }
                    else {
                        playingSurface = document.getElementById(`open_game_cards${i}`);
                    }
                    playingSurfaceRect = playingSurface.getBoundingClientRect();
                    cardRect = card.getBoundingClientRect();
                    targetX = playingSurfaceRect.left + playingSurfaceRect.width / 2 - cardRect.width / 2;
                    targetY = playingSurfaceRect.top + playingSurfaceRect.height / 2 - cardRect.height / 2;
                    currentX = cardRect.left;
                    currentY = cardRect.top;
                    speed = 10;
                    moveBack(img_pile, rightCard, card, cardRect, targetX, targetY, currentX, currentY, speed, i);
                    return;
                }
            }
            requestAnimationFrame(moveCard);
        } else {
            card.remove()
            let new_image = document.createElement("img");
            new_image.number = 0;
            new_image.color = "";
            new_image.className = "img_front";
            new_image.style.display = "none";
            new_image.src = "";
            if (rightCard.is_from_five)
                document.getElementById(`five_cards${rightCard.indexCard}_opp${i}`).querySelector(`#card-front${i}`).appendChild(new_image);
            else {
                cards3[i].splice(index_cards3[i], 1)
            }
            playingSurface.appendChild(img_pile);
            img_pile.draggable = false;
            new_image.draggable = false;
            piles[r].number = rightCard.number;
            piles[r].color = rightCard.color;
            if (rightCard.number === 13)
                explode_finish_pile(r);
            score[i] += 1;
            countY++;
            flag[i] = false;
        }
    }
    moveCard();
}
let source;
function dragStart(event) {
    event.dataTransfer.setData("sourceId", event.target.id);
    source = document.getElementById(event.target.id)
}

function dragEnd(event) {
    for (let i = 0; i < empty_piles.length; i++) {
        piles[empty_piles[i]].style.background = "none";
    }
}

// Function to handle dragover event
function allowDrop(event) {
    event.preventDefault();
    if (source.number == 1)
        for (let i = 0; i < empty_piles.length; i++) {
            piles[empty_piles[i]].style.backgroundColor = "rgb(200, 200, 200)";
        }
}
function dropImage(event) {
    // event.preventDefault();
    const sourceId = event.dataTransfer.getData("sourceId");
    const draggedImg = document.getElementById(sourceId);
    switch (draggedImg.number) {
        case 1:
            // Append the dragged image to the target pile
            if (draggedImg.number == event.target.number + 1) {
                prev_id = draggedImg.id;
                para_draggedImg = draggedImg.parentElement;
                draggedImg.id = "from-player-1";
                event.target.number = draggedImg.number;
                event.target.appendChild(draggedImg);
                score[1]++;
                cards3[1].splice(index_cards3[1], 1)
                // cards5.splice(cards5[1].length - 1, 1);
                for (let i = 0; i < empty_piles.length; i++) {
                    piles[empty_piles[i]].style.background = "none";
                }
                for (let i = 0; i < empty_piles.length; i++) {
                    if ("pile" + empty_piles[i] === event.target.id)
                        empty_piles.splice(i, 1);
                }
                draggedImg.draggable = false;
                // הוספה ל-13 של המשתמש אירוע קליק לפתיחת קלף חדש
                user13 = document.getElementById("user_thirteen");
                user13.setAttribute("onclick", "user_thirteen_click(user13, prev_id, para_draggedImg)");
                draggedImg.draggable = false;
                draggedImg.style.position = "absolute";
                break;
            }
        case 2:
            if (draggedImg.number == event.target.parentElement.number + 1) {
                draggedImg.style.position = "absolute";
                prev_id = draggedImg.id;
                para_draggedImg = draggedImg.parentElement;
                event.target.parentElement.color = draggedImg.color;
                event.target.parentElement.number = draggedImg.number;
                //event.target.removeChild(event.target.firstChild);
                // Append the dragged image to the target pile
                draggedImg.id = "from-player-1";
                event.target.parentElement.appendChild(draggedImg);
                score[1]++;
                cards3[1].splice(index_cards3[1], 1);
                draggedImg.draggable = false;
                // הוספה ל-13 של המשתמש אירוע קליק לפתיחת קלף חדש
                user13 = document.getElementById("user_thirteen");
                user13.setAttribute("onclick", "user_thirteen_click(user13, prev_id, para_draggedImg)");
                draggedImg.draggable = false;
            }
            break;
        case 13:
            if (draggedImg.number == event.target.parentElement.number + 1) {
                draggedImg.style.position = "absolute";
                prev_id = draggedImg.id;
                para_draggedImg = draggedImg.parentElement;
                // event.target.removeChild();
                // Append the dragged image to the target pile
                draggedImg.id = "from-player-1";
                event.target.parentElement.appendChild(draggedImg);
                score[1]++;
                cards3[1].splice(index_cards3[1], 1);
                draggedImg.draggable = false;
                // הוספה ל-13 של המשתמש אירוע קליק לפתיחת קלף חדש
                user13 = document.getElementById("user_thirteen");
                user13.setAttribute("onclick", "user_thirteen_click(user13, prev_id, para_draggedImg)");
            }
            break;
        default:
            if (draggedImg.color == event.target.parentElement.color && draggedImg.number == event.target.parentElement.number + 1) {
                draggedImg.style.position = "absolute";
                event.target.parentElement.color = draggedImg.color;
                event.target.parentElement.number = draggedImg.number;
                // event.target.removeChild();
                prev_id = draggedImg.id;
                para_draggedImg = draggedImg.parentElement;

                // Append the dragged image to the target pile
                draggedImg.id = "from-player-1";
                event.target.parentElement.appendChild(draggedImg);
                score[1]++;
                cards3[1].splice(index_cards3[1], 1);
                draggedImg.draggable = false;

                // הוספה ל-13 של המשתמש אירוע קליק לפתיחת קלף חדש
                user13 = document.getElementById("user_thirteen");
                user13.setAttribute("onclick", "user_thirteen_click(user13, prev_id, para_draggedImg)");
            }
    }
}


function user_thirteen_click(pile13, id_to_add) {
    const cards_board = document.getElementById('user_board')// .childElementCount;
    const cards = Array.from(cards_board.children);
    for (let i = 0; i < 5; i++) {
        if (cards[i].getElementsByTagName('div')[1].childElementCount == 0) {
            const card_to_add = document.createElement("img");
            card_to_add.className = "img_front"
            card_to_add.src = `images/${colors[cards13[1][cards13[1].length - 1].color]}/${cards13[1][cards13[1].length - 1].number}.jpg`;
            cards13[1].splice(cards13[1].length - 1, 1);
            card_to_add.number = cards13[1][cards13[1].length - 1].number;
            card_to_add.color = colors[cards13[1][cards13[1].length - 1].color];
            card_to_add.id = id_to_add;
            card_to_add.setAttribute("ondragstart", "dragStart(event)");
            cards[i].getElementsByTagName('div')[1].appendChild(card_to_add);
            if (cards13[1].length === 0) {
                roundWin(1)
                break;
            }
        }
        if (i == 4)
            pile13.setAttribute("onclick", null);
    }
}

function click_user_cards3() {
    if (index_cards3[1] == cards3[1].length - 1) {
        index_cards3[1] = 0;
        let temp = cards3[1][0];
        cards3[1].splice(0, 1);
        cards3[1].push(temp);
    }
    else {
        index_cards3[1] += 3;
        if (index_cards3[1] > cards3[1].length - 1)
            index_cards3[1] = cards3[1].length - 1;
    }
    let images = {};
    let countCards = 0;
    for (let i = 2; i >= 0; i--) {
        if (index_cards3[1] === 0)
            i = 0;
        else
            if (index_cards3[1] === 1)
                i = 1;
        countCards++;
        images[i] = `images/${colors[cards3[1][index_cards3[1] - i].color]}/${cards3[1][index_cards3[1] - i].number}.jpg`
        const game_img_front = document.createElement("img");
        game_img_front.draggable = true;
        game_img_front.className = "img_front";
        game_img_front.id = "img_user_card3" + cards3[1][index_cards3[1] - i].number + "/" + colors[cards3[1][index_cards3[1] - i].color];
        game_img_front.number = cards3[1][index_cards3[1] - i].number;
        game_img_front.color = colors[cards3[1][index_cards3[1] - i].color];
        game_img_front.alt = "card";
        game_img_front.src = `images/${colors[cards3[1][index_cards3[1] - i].color]}/${cards3[1][index_cards3[1] - i].number}.jpg`;
        user_open_game_cards.appendChild(game_img_front);
        game_img_front.setAttribute("ondragstart", "dragStart(event)");
    }
    flip3cards(images, countCards)
    let close_cards = document.querySelector("#user_close_game_cards")
    let arrFlip = Array.from(close_cards.children)
    for (let index = 1; index < arrFlip.length; index++) {
        arrFlip[index].remove();
    }

}
function moveBack(img_pile, rightCard, card, cardRect, targetX, targetY, currentX, currentY, speed, i) {
    const directionX = targetX - currentX;
    const directionY = targetY - currentY;
    const distanceToTarget = Math.hypot(directionX, directionY);
    const unitDirectionX = directionX / distanceToTarget;
    const unitDirectionY = directionY / distanceToTarget;
    const moveAmountX = unitDirectionX * speed;
    const moveAmountY = unitDirectionY * speed;
    currentX += moveAmountX;
    currentY += moveAmountY;
    card.style.transform = `translate(${currentX - cardRect.left}px, ${currentY - cardRect.top}px)`;
    if (distanceToTarget > speed) {
        requestAnimationFrame(() => moveBack(img_pile, rightCard, card, cardRect, targetX, targetY, currentX, currentY, speed, i));
    } else {
        card.remove()
        if (rightCard.is_from_five)
            document.getElementById(`five_cards${rightCard.indexCard}_opp${i}`).querySelector(`#card-front${i}`).appendChild(img_pile);
        else {
            document.getElementById(`open_game_cards${i}`).appendChild(img_pile);
        }
        flag[i] = false;
    }
}

// אירועים של החלונית של הנקודות
document.querySelector('.peekaboo-container').addEventListener('mouseover', function () {
    this.style.left = '-5em';
    text = "";
    for (let i = 1; i <= opp_num + 1; i++) {
        text += playersNames[i] + ": " + score[i] + "<br>";
    }
    document.getElementById("content-tab-text").innerHTML = text;
});

document.querySelector('.peekaboo-container').addEventListener('mouseout', function () {
    this.style.left = '-10.56%';
});

function fill_score() {
    text = "";
    for (let i = 1; i <= opp_num + 1; i++) {
        text += playersNames[i] + ": " + score[i] + "<br>";
    }
    document.getElementById("content-tab-text").innerHTML = text;
}

fill_score();
function roundWin(k) {
    alert(`השחקן ${k} ניצח!!`)
}
function explode_finish_pile(r) {
    empty_piles.push(r);
    pile = document.getElementById(`pile${r}`)

    pile_images = Array.from(pile.children);
    for (let i = 0; i < pile_images.length; i++) {
        pile_images[i].remove();
    }
    pile.number = 0;
    pile.color = "";

}

//יצירת האנימציה לדפדוף 3 קלפים
function flip3cards(img_src, numOfCards) {
    for (let i = 0; i < numOfCards; i++) {
        let card = document.createElement("div");
        card.className = "flip-card-inner";

        let front = document.createElement("div");
        front.className = "flip-card-front";

        let img_front = document.createElement("img");
        img_front.src = img_src[i];
        front.appendChild(img_front);

        let back = document.createElement("div");
        back.className = "flip-card-back";

        let img_back = document.createElement("img");
        img_back.src = `images/backCards/${colors[0]}.png`;
        back.appendChild(img_back);

        card.appendChild(front);
        card.appendChild(back);
        document.getElementById("user_close_game_cards").appendChild(card);

    }










































}