requirejs.config({baseUrl: 'js/'});

requirejs(['questions', 'students'], (questions, students) => {
	console.log(questions.length, students.length);
	console.log(questions.length > students.length);
	
	const body = document.querySelector('body');
	const h2 = document.querySelector('h2');
	const h5 = document.querySelector('h5');
	const p = document.querySelector('p');
	const h6 = document.querySelector('h6');
	const qBtn = document.querySelector('#qBtn');
	const aBtn = document.querySelector('#aBtn');
	const emojis = ['🤓', '😟', '😫', '🤯', '🥺', '🤩', '🥳', '😜', '😗', '🤮', '🤢', '🥴', '🤑', '🙀', '🙈', '🙊', '🙉', '🐒', '🌝', '🌚', '👩', '👨', '💩'];

	const randomN = base => Math.floor(Math.random() * base);

	const showAnswer = answer => {
		h6.classList.add('showed');
		h6.innerText = `Answer: ${answer}`;
	};

	const isEmpty = data => data.length <= 0;

	const hideElements = (...params) => {
		for (const element of params) {
			element.style.display = 'none';
		}
	}

	const game = () => {
		let image = randomN(4);
		body.style.backgroundImage = `url(images/bg-pattern-0${image + 1}.png)`;

		let n = randomN(emojis.length);

		if (!isEmpty(questions)) {
			let rand = randomN(questions.length);

			h2.innerText = `Subject: ${questions[rand].subject}`;
			h5.innerText = `Victim: ${students[rand]}`;
			h6.innerText = '';
			h6.classList.remove('showed');
			p.innerText = `${emojis[n]} ${questions[rand].question} ${emojis[n]}`;

			let answer = questions[rand].answer;

			aBtn.style.display = 'inline-block';
			aBtn.addEventListener('click', showAnswer.bind(null, answer));

			questions.splice(rand, 1);
			students.splice(rand, 1);
			return;
		}

		h2.innerText = 'No hay más preguntas';
		h5.innerText = '🤓';
		p.innerText = '';
		h6.classList.remove('showed');
		hideElements(p, h6, qBtn, aBtn);
	}

	qBtn.addEventListener('click', game);
});
