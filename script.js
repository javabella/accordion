'use strict';

(function() {

	/**
	 * @constructor
	 */
	function Accordion() {
		this.setActiveItem = this.setActiveItem.bind(this);
		this.init = this.init.bind(this);
		this._onItemClick = this._onItemClick.bind(this);
	}

	Accordion.prototype = {

		/**
		 * @type {HTMLElement}
		 */
		element: document.querySelector('.accordion'),

		/**
		 * item selector
		 * @type {string}
		 * @private
		 */
		_itemSelector: '.accordion-item',

		/**
		 * classname of active item
		 * @type {String}
		 * @private
		 */
		_activeClass: 'active',

		/**
		 * @type {?Object<NodeList>}
		 */
		items: null,

		/**
		 * @param {number=} index
		 */
		setActiveItem: function(index) {
			var activeItem = this.element.getElementsByClassName(this._activeClass)[0];
			if (activeItem) {
				activeItem.classList.remove(this._activeClass);
			}

			if (!index) {
				index = 0;
			}
			this.items[index].classList.add(this._activeClass);
		},
		init: function() {
			this.items = document.querySelectorAll(this._itemSelector);
			this.setActiveItem();

			for (var i = 0; i < this.items.length; i++) {
				(function(i) {
					this.items[i].addEventListener('click', function() {
						this._onItemClick(i);
					}.bind(this));
				}.bind(this))(i);
			}
		},

		/**
		 * @listens click
		 * @param  {number=} index
		 * @private
		 */
		_onItemClick: function(index) {
			if (!this.items[index].classList.contains(this._activeClass)) {
				this.setActiveItem(index);
			}
		}
	}

	var accordion = new Accordion();
	accordion.init();
})();

