function sleep(delay) {
  let start = new Date().getTime();
  while(new Date().getTime() > start + delay);
}

function drawSpirale(n_iters, delay=100) {
  let x = (container.offsetHeight - 80) / 2;
  let y = container.offsetWidth / 2;
  let direction = "left";
  let limit = 1, counter = 0, round = 0;

  for(let i=1; i<=n_iters; i++) {
    setTimeout(() => {
      placeANumber(i, x, y);
      
      // change direction
      if(counter == limit) {
        round++;
        counter = 0;
        direction = nextDirection(direction);

        if(round == 2) {
          limit++;
          round = 0;
        }
      }

      // get next positions
      [x, y] = nextPositions(x, y, direction);

      counter++;

    }, i * delay);

  }
}

function nextDirection(prevDirection) {
  if(prevDirection == "right") {
    return "down";
  } else if (prevDirection == "down") {
    return "left";
  } else if(prevDirection == "left") {
    return "up";
  } else if(prevDirection == "up") {
    return "right"
  }
}

function nextPositions(prev_x, prev_y, direction) {
  switch(direction) {
    case "right":
      prev_x -= 40;
      prev_y -= 40;
      break;
    case "down":
      break;
    case "left":
      prev_x += 40;
      prev_y -= 40;
      break;
    case "up":
      prev_y -= 80;
      break;
  }

  return [prev_x, prev_y];
}

function placeANumber(n, positionX, positionY) {
  const container = document.getElementById("container");
  let number = document.createElement("div");

  number.classList.add("number");
  if(isPrime(n)) {
    number.classList.add("prime");
  }
  number.innerText = n;
  number.style.top = positionY + "px";
  number.style.left = positionX + "px";

  container.appendChild(number);
}

function isPrime(n) {
  if(n <= 1) { return false; }

  for(let i=2; i<n; i++) {
    if(n%i == 0) { return false; }
  }

  return true;
}

drawSpirale(100, 10);