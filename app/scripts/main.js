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
	projects.forEach(project => {
		project.addEventListener('click', () => showProjectInfo(project));
	});

	function showProjectInfo() {
		fetch('../assets/projects.json')
			.then(resp => resp.json())
			.then(resp => console.log(resp));
	}
})();
