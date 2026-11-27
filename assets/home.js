// Home page: the Psalm 119:11 "try it" verse and the parrot's one wave.
(function () {
  var section = document.getElementById('try');
  if (!section) return;
  var heart = document.getElementById('heart');
  var text = section.querySelector('.msg .text');
  var again = section.querySelector('.msg .again');
  var bird = section.querySelector('.bird');
  var heartChip = section.querySelector('[data-word="heart"]');
  var shakes = 0;

  section.querySelectorAll('.chip[data-word]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (section.classList.contains('done')) return;
      section.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('shakeA', 'shakeB'); });
      if (chip.dataset.word === 'heart') {
        section.classList.add('done');
        heart.classList.add('on');
        chip.classList.add('used');
        chip.disabled = true;
        text.textContent = 'Word for word. That is how it sticks.';
        again.focus();
      } else {
        shakes += 1;
        void chip.offsetWidth; // let the shake run again on a second wrong tap
        chip.classList.add(shakes % 2 ? 'shakeA' : 'shakeB');
        text.textContent = 'Not quite. Try another word.';
      }
      section.querySelector('.msg').classList.toggle('good', section.classList.contains('done'));
    });
  });

  again.addEventListener('click', function () {
    section.classList.remove('done');
    heart.classList.remove('on');
    heartChip.classList.remove('used');
    heartChip.disabled = false;
    section.querySelector('.msg').classList.remove('good');
    text.textContent = 'Which word is missing?';
    heartChip.focus();
  });

  // The parrot waves once, the first time half of it is on screen.
  if ('IntersectionObserver' in window && bird) {
    var seen = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) {
        bird.classList.add('seen');
        seen.disconnect();
      }
    }, { threshold: 0.5 });
    seen.observe(bird);
  }
})();
