{
	/**
	 * Gather all containers of tabbed groups.
	 *
	 * @type {NodeList}
	 */
	const containers = document.querySelectorAll('.js-tabbed-groups');

	/**
	 * Open a tabbed group of content.
	 *
	 * @param {number} tabIndex The index of the tab to open.
	 * @param {number} containerIndex The index of the tab's container.
	 */
	const openTabbedGroup = (tabIndex, containerIndex) => {
		const tabs = containers[containerIndex].querySelectorAll(
			':scope >.wp-block-buttons > .wp-block-button > .wp-block-button__link'
		);

		tabs.forEach((tab, newIndex) => {
			const group = tab.closest('.wp-block-buttons').nextElementSibling;

			if (tabIndex !== newIndex) {
				tab.ariaSelected = false;
				group.classList.add('is-inactive');
			} else {
				tab.ariaSelected = true;
				group.classList.remove('is-inactive');
			}
		});
	};

	/**
	 * Setup an individual tabbed group within a container.
	 *
	 * @param {HTMLElement} tab The tab element.
	 * @param {number} tabIndex The index of the tab.
	 * @param {number} containerIndex The index of the tab's container.
	 */
	const setupTabbedGroup = (tab, tabIndex, containerIndex) => {
		const group = tab.closest('.wp-block-buttons').nextElementSibling;

		/*
		 * Setup the tab, a "button" element in the WordPress block editor,
		 * which is actually an anchor.
		 */
		tab.id = 'tab-' + containerIndex + '-' + tabIndex;
		tab.tabIndex = 0; // Enable keyboard focus on the "button", which is an anchor.
		tab.role = 'tab';
		tab.setAttribute(
			'aria-controls',
			'panel-' + containerIndex + '-' + tabIndex
		);

		/**
		 * Setup the group, which is a WordPress group block adjacent to the current
		 * buttons block.
		 */
		group.role = 'tabpanel';
		group.id = 'panel-' + containerIndex + '-' + tabIndex;
		group.setAttribute(
			'aria-labelledby',
			'tab-' + containerIndex + '-' + tabIndex
		);

		// Hide all tabs except the first one.
		if (tabIndex !== 0) {
			tab.ariaSelected = false;
			group.classList.add('is-inactive');
		} else {
			tab.ariaSelected = true;
		}

		tab.addEventListener('click', function (event) {
			event.preventDefault();
			openTabbedGroup(tabIndex, containerIndex);
		});

		tab.addEventListener('keydown', function (event) {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				openTabbedGroup(tabIndex, containerIndex);
			}
		});
	};

	containers.forEach((container, containerIndex) => {
		const tabs = container.querySelectorAll(
			'.js-tabbed-groups > .wp-block-buttons .wp-element-button'
		);

		// Only setup tabbed groups if there are tabs.
		if (!tabs.length) {
			return;
		}

		container.role = 'tablist';

		tabs.forEach((tab, index) => {
			setupTabbedGroup(tab, index, containerIndex);
		});
	});
}
