let deckId = null;
let remainingCards = 0;
let sum = 0
 
function drawCard() {
  if (deckId === null || remainingCards === 0) {
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => response.json())
      .then(data => {
        deckId = data.deck_id;
        remainingCards = data.remaining;
        drawCard();
      })
      .catch(error => console.error(error));
  } else if (remainingCards > 0) {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(response => response.json())
      .then(data => {
        console.log(`Вытащена карта: ${data.cards[0].value} of ${data.cards[0].suit}`);
        if (data.cards[0].value === 'KING'){
          sum = sum + 4
        }
        else if (data.cards[0].value === 'JACK'){
          sum = sum + 2
        }
        else if (data.cards[0].value === 'QUEEN'){
          sum = sum + 3
        }
        else if (data.cards[0].value === '10'){
          sum = sum + 10
        } 
        else if ((data.cards[0].value === 'ACE')){ 
          const btn = document.getElementById('drawCardButton');
          btn.style.display = 'none';
          const button1 = document.createElement('button');
          button1.textContent = '1';
          button1.id = 'myButton1';
          document.body.appendChild(button1);
          const button1click = document.getElementById('myButton1');
          button1click.addEventListener('click', () => {sum = sum + 1, button1.remove(),button2.remove(),sumDisplay.textContent = sum.toString(), btn.style.display = 'block';});
          const button2 = document.createElement('button');
          button2.textContent = '10';
          button2.id = 'myButton2';
          document.body.appendChild(button2);
          const button2click = document.getElementById('myButton2');
          button2click.addEventListener('click', () => {sum = sum + 10, button1.remove(),button2.remove(),sumDisplay.textContent = sum.toString(), btn.style.display = 'block'});
        }
        else{
          sum = sum + (Number(data.cards[0].code[0]))
        }
        console.log(sum)
        remainingCards = data.remaining;
        const cardList = document.getElementById('cardList');
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = data.cards[0].image;
        li.appendChild(img);
        cardList.appendChild(li);
        const sumDisplay = document.getElementById('sumDisplay');
        sumDisplay.textContent = sum.toString();
        if (sum > 21){
          sumDisplay.textContent = ("Сумма больше 21");
        }
        if (sum == 21){
          sumDisplay.textContent = ("Сумма равна 21");
        }
      })
      .catch(error => console.error(error));
  } else {
    console.log('В колоде больше нет карт, создаем новую колоду');
    deckId = null;
  }
}
 
const drawCardButton = document.getElementById('drawCardButton');
drawCardButton.addEventListener('click', drawCard);