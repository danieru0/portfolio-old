(function() {
	let headerImage = new Image();
	let loader = document.getElementById('loader');
	let header = document.getElementById('hero');
	headerImage.src = 'imgs/header.jpg';
	headerImage.onload = () => {
		// window.scrollTo({ top: 0, behavior: 'smooth' });
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
	projects.forEach(project => {
		project.addEventListener('click', () => showProjectInfo(project.id));
	});

	modalClose.addEventListener('click', closeModal);

	modalContainer.addEventListener('click', (e) => {
		if (e.target.className === 'project__modalContainer active') {
			closeModal();
		}
	});

	function closeModal() {
		modal.classList.remove('active');
		modalContainer.classList.remove('active');
		modalList.innerHTML = '';
	}

	function showProjectInfo(id) {
		modalContainer.classList.add('active');
		fetch('../assets/projects.json')
			.then(resp => resp.json())
			.then(resp => {
				let projectData = resp[id];
				modalTitle.textContent = projectData.title;
				modalDesc.textContent = projectData.description;
				modalImage.style.backgroundImage = `url('${projectData.image}')`;
				Object.keys(projectData.languages).map(item => {
					let lang = projectData.languages[item];
					let listItem = document.createElement('li');
					listItem.classList.add('modal__item');
					listItem.textContent = lang;
					modalList.appendChild(listItem);
				});
				modal.classList.add('active');
			});
	}

	let showMoreBtn = document.getElementById('showmore-btn');
	let allProjects = document.querySelectorAll('.projects__project');
	let activeProjectsDefault = 4;
	showMoreBtn.addEventListener('click', (e) => {
		if (e.target.textContent !== 'Mniej') {
			let disabledProjects = document.querySelectorAll('.projects__project.disabled');
			if (disabledProjects.length) {
				for (let i = 0; i < 4; i++) {
					activeProjectsDefault++;
					disabledProjects[i] ? disabledProjects[i].classList.remove('disabled') : '';
					activeProjectsDefault === allProjects.length ? e.target.textContent = 'Mniej' : '';
				}
			}
		} else {
			activeProjectsDefault = 4;
			e.target.textContent = 'Więcej';
			for (let i = 4; i < allProjects.length; i++) {
				allProjects[i].classList.add('disabled');
			}
		}
	});
})();
