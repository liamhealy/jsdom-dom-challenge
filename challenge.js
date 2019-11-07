// /**
//   * clearInterval() and setInterval(function, 1000) for the time based counter, h1 has innerText that needs to be parsed
// ​
//   * every second
//   * plus and minus buttons are simple, they have IDs
// ​
//   * Comments are appendChildren of Comments > div#list as p-tags
//   * Heart reads current counter value, assigns a like
//   *
//  */
// ​
// let counter = document.querySelector('#counter');
// ​
// let commentContainer = document.querySelector('#list');
// let commentForm = document.getElementById('comment-form');
// ​
// let buttons = document.querySelectorAll('button');
// ​
// let counterLikes = {};
// ​
// // functions
// function benchmark(cb) {
//     t1 = Date.now();
//     cb();
//     t2 = Date.now();
//     console.log(`Took ${t2 - t1} to run.`);
// }

// const toggleButtons = () => {
//   [...buttons]
//     .filter(button => button.id !== 'pause')
//     .forEach(button => {
//       button.toggleAttribute('disabled');
//     });
// };
// ​
// const countIncrementor = () => {
//   let currentCount = parseInt(counter.innerText, 10);
//   currentCount += 1;
//   counter.innerText = currentCount;
// };
// ​
// const countDecrementor = () => {
//   let currentCount = parseInt(counter.innerText, 10);
//   currentCount -= 1;
//   counter.innerText = currentCount;
// };
// ​
// const likeLister = (num, likes) => {
//   let likeContainer = document.querySelector('.likes');
//   let listItem = document.createElement('li');
// ​
//   listItem.dataset.num = num;
//   listItem.innerHTML = `${num} has been liked <span>${likes}</span> times`;
//   likeContainer.appendChild(listItem);
// };
// ​
// const newComment = submitEvent => {
//   submitEvent.preventDefault();
//   let commentString = submitEvent.target[0].value;
// ​
//   let parComment = document.createElement('p');
//   parComment.innerText = commentString;
// ​
//   commentContainer.appendChild(parComment);
// ​
//   commentForm.reset();
// };
// ​
// // storing the return of setInterval so that we can clear it later
// let countyBoy = setInterval(countIncrementor, 1000);
// ​
// // listeners
// ​
// document.body.addEventListener('click', e => {
//   let minusButton = document.querySelector('#minus');
//   let plusButton = document.querySelector('#plus');
//   let heartButton = document.querySelector('#heart');
//   let pauseButton = document.querySelector('#pause');
// ​
//   if (e.target === minusButton) {
//     countDecrementor();
//   }
//   if (e.target === plusButton) {
//     countIncrementor();
//   }
//   if (e.target === heartButton) {
//     const currentCount = parseInt(counter.innerText, 10);
// ​
//     // object keeping track of likes per number
//     if (counterLikes[`${currentCount}`]) {
//       counterLikes[`${currentCount}`].likes += 1;
//     } else {
//       counterLikes[`${currentCount}`] = { likes: 1 };
//     }
// ​
//     // get a li with the data-num= currentCount
//     // either edit or create a new one
//     if (document.querySelector(`li[data-num="${currentCount}"]`)) {
//       document.querySelector(
//         `li[data-num="${currentCount}"] span`,
//       ).textContent = counterLikes[`${currentCount}`].likes;
//     } else {
//       likeLister(currentCount, counterLikes[`${currentCount}`].likes);
//     }
//   }
//   if (e.target === pauseButton && e.target.innerText === 'pause') {
//     // clearInterval clears out countyBoy and stops the function
//     clearInterval(countyBoy);
//     e.target.innerText = 'resume';
//     toggleButtons();
//   } else if (e.target === pauseButton) {
//     // set return value of setInterval back into countyBoy
//     countyBoy = setInterval(countIncrementor, 1000);
//     e.target.innerText = 'pause';
//     toggleButtons();
//   }
// });
// ​
// commentForm.addEventListener('submit', newComment);
// ​
// // in the timer function push each value into an object
// ​
// // arrayOfNums = {
// //   0: {
// //     likes: 3
// //   },
// // }

const counter = document.getElementById('counter');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const heart = document.getElementById('heart');
const commentInput = document.getElementById('comment-input');
const commentSubmit = document.getElementById('submit');
const commentList = document.getElementById('list');

const commentForm = document.getElementById('comment-form');

const incrementCounter = () => {
  counter.innerText = parseInt(counter.innerText) + 1;
}

const decrementCounter = () => {
  counter.innerText = parseInt(counter.innerText) - 1;
}

const likeComment = () => {
  const ul = document.getElementsByTagName('ul')[0];
  const currentTimeLi = document.querySelector(`[data-id='${counter.innerText}']`);
  if (!currentTimeLi) {
    let li = document.createElement('li');
    li.dataset.id = counter.innerText;
    li.dataset.likes = 1;
    li.innerText = `${counter.innerText} has been liked ${li.dataset.likes} time.`;
    ul.appendChild(li);
  } else {
    currentTimeLi.dataset.likes++;
    currentTimeLi.innerText = `${currentTimeLi.dataset.id} has been liked ${currentTimeLi.dataset.likes} times.`;
  }
}

const pauseAndDisable = () => {
  clearInterval(timer);
  minus.disabled = true;
  plus.disabled = true;
  heart.disabled = true;
  commentInput.disabled = true;
  commentSubmit.disabled = true;
}

const resumeAndEnable = () => {
  timer = setInterval(incrementCounter, 1000);
  minus.disabled = false;
  plus.disabled = false;
  heart.disabled = false;
  commentInput.disabled = false;
  commentSubmit.disabled = false;
}


document.addEventListener('click', event => {
  if (event.target.id === 'minus') {
    decrementCounter();
  } else if (event.target.id === 'plus') {
    incrementCounter();
  } else if (event.target.id === 'heart') {
    likeComment();
  } else if (event.target.id === 'pause') {
    pauseAndDisable();
    event.target.id = 'resume';
    event.target.innerText = 'resume';
  } else if (event.target.id === 'resume') {
    resumeAndEnable();
    event.target.id = 'pause';
    event.target.innerText = 'pause';
  }
})

commentForm.addEventListener('submit', event => {
  event.preventDefault();
  if (event.target[0].value) {
    let newComment = document.createElement('p');
    newComment.innerText = event.target[0].value;
    commentList.append(newComment);
  }
  commentForm.reset();

})

let timer = window.setInterval(incrementCounter, 1000);