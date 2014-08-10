var settings = settings || {};

document.addEventListener('DOMContentLoaded', function() {
	function forEachChild(parent, callback) {
		var children = parent.children;
		for (var i = 0; i < children.length; ++i)
			callback(children[i]);
	}

	document.getElementById('body').addEventListener('click', function(e) {
		if (document.body.classList.contains('menu')) {
			document.body.classList.remove('menu');
			e.preventDefault();
		}
	});

	document.getElementById('menu').addEventListener('click', function(e) {
		e.preventDefault();
		document.body.classList.toggle('menu');
	});

	forEachChild(document.getElementById('settings'), function(child) {
		var handler = function() {
			if (child.tagName === 'INPUT') {
				if (child.value && /^[0-9]*(\.[0-9]+)?$/.test(child.value))
					settings[child.id] = parseFloat(child.value || "0");
				else
					child.value = settings[child.id];
			}
		};
		child.addEventListener('change', handler);
		handler();
	});

	forEachChild(document.getElementById('tabs'), function(node) {
		node.addEventListener('click', function(e) {
			e.preventDefault();
			forEachChild(document.getElementById('controls'), function(node2) {
				if (node2.id !== 'tabs')
					node2.classList[node2.id === node.dataset.id ? 'remove' : 'add']('hidden');
			});
			forEachChild(document.getElementById('tabs'), function(node2) {
				node2.classList[node2.dataset.id === node.dataset.id ? 'add' : 'remove']('active');
			});
		});
	});
});