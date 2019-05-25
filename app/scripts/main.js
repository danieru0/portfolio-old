(function() {
	let headerImage = new Image();
	let loader = document.getElementById('loader');
	let header = document.getElementById('hero');
	headerImage.src = 'imgs/header.jpg';
	headerImage.onload = () => {
		loader.classList.add('done');
		header.classList.add('show');
	};

	let projects = document.querySelectorAll('.projects__project');
	let modalContainer = document.getElementById('modal-container');
	let modal = document.getElementById('modal');
	let modalClose = document.getElementById('modal-close');
	let modalTitle = document.getElementById('modal-title');
	let modalDesc = document.getElementById('modal-desc');
	let modalList = document.getElementById('modal-list');
	let modalImage = document.getElementById('modal-image');
	let modalLiveLink = document.getElementById('modal-live');
	let modalSrcLink = document.getElementById('modal-src');
	let focusGuardLast = document.getElementById('focusguard-last');
	let focusGuardFirst = document.getElementById('focusguard-first');

	focusGuardLast.addEventListener('focus', () => {
		modalClose.focus();
	});

	focusGuardFirst.addEventListener('focus', () => {
		if (modalSrcLink.style.display === 'inline') {
			modalSrcLink.focus();
		} else if (modalLiveLink.style.display === 'inline') {
			modalLiveLink.focus();
		}
	});

	projects.forEach(project => {
		project.addEventListener('click', () => showProjectInfo(project.id));
		project.addEventListener('keypress', (e) => {
			if (!modal.classList.contains('active')) {
				e.key === 'Enter' ? showProjectInfo(project.id, true) : '';
			}
		});
	});

	modalClose.addEventListener('click', closeModal);
	modalContainer.addEventListener('click', (e) => {
		if (e.target.className === 'project__modalContainer active') {
			closeModal();
		}
	});

	document.addEventListener('keyup', (e) => {
		if (modal.classList.contains('active')) {
			e.key === 'Escape' ? closeModal() : '';
		}
	});

	function closeModal() {
		modal.classList.remove('active');
		modalContainer.classList.remove('active');
		modalList.innerHTML = '';
	}

	function showProjectInfo(id, keyboard) {
		modalContainer.classList.add('active');
		fetch('../assets/projects.json')
			.then(resp => resp.json())
			.then(resp => {
				let projectData = resp[id];
				modalTitle.textContent = projectData.title;
				modalDesc.textContent = projectData.description;
				modalImage.style.backgroundImage = `url('${projectData.image}')`;
				if (projectData.live !== 'None') {
					modalLiveLink.style.display = 'inline';
					modalLiveLink.href = projectData.live;
				} else {
					modalLiveLink.style.display = 'none';
				}
				if (projectData.src !== 'None') {
					modalSrcLink.style.display = 'inline';
					modalSrcLink.href = projectData.src;
				} else {
					modalSrcLink.style.display = 'none';
				}
				Object.keys(projectData.languages).map(item => {
					let lang = projectData.languages[item];
					let listItem = document.createElement('li');
					listItem.classList.add('modal__item');
					listItem.textContent = lang;
					modalList.appendChild(listItem);
				});
				modal.classList.add('active');
				if (keyboard) {
					setTimeout(() => {
						modalClose.focus();
					}, 400);
				}
			});
	}

	let showMoreBtn = document.getElementById('showmore-btn');
	let allProjects = document.querySelectorAll('.projects__project');
	let activeProjectsDefault = 4;
	showMoreBtn.addEventListener('click', () => {
		if (document.querySelector('.more-btn__text').textContent !== 'Mniej') {
			let disabledProjects = document.querySelectorAll('.projects__project.disabled');
			if (disabledProjects.length) {
				for (let i = 0; i < 4; i++) {
					activeProjectsDefault++;
					disabledProjects[i] ? disabledProjects[i].classList.remove('disabled') : '';
					activeProjectsDefault === allProjects.length ? document.querySelector('.more-btn__text').textContent = 'Mniej' : '';
				}
			}
		} else {
			activeProjectsDefault = 4;
			document.querySelector('.more-btn__text').textContent = 'Więcej';
			for (let i = 4; i < allProjects.length; i++) {
				allProjects[i].classList.add('disabled');
			}
		}
	});
})();
