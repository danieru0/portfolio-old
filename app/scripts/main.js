(function() {
	let headerImage = new Image();
	let loader = document.getElementById('loader');
	headerImage.src = 'imgs/header.jpg';
	headerImage.onload = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		loader.classList.add('done');
	};
})();
