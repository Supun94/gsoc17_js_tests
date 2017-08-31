/**
 * @copyright	Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * JavaScript behavior to add front-end hover edit icons with tooltips for modules and menu items.
 *
 */
Joomla = window.Joomla || {};

(function(Joomla) {

	Joomla.fn.extend({
		/**
		 * This jQuery custom method makes the elements absolute, and with true argument moves them to end of body to avoid CSS inheritence
		 *
		 * @param   rebase boolean
		 * @returns {jQuery}
		 */
		jEditMakeAbsolute: function(rebase) {

			return this.each(function() {

				var el = this;
				var pos,rect;

				if (rebase) {
					rect = el.getBoundingClientRect();
					pos = {
						top: rect.top + document.body.scrollTop,
						left: rect.left + document.body.scrollLeft
					};
				} else {
					pos = {
						top: el.offsetTop,
						left: el.offsetLeft
					};
				}

				elements.forEach(function(el) {
					el.style.position = "absolute";
					el.style.marginLeft = 0;
					el.style.marginTop = 0;
					el.style.top = pos.top;
					el.style.left = pos.left;
					el.style.bottom = 'auto';
					el.style.right = 'auto';
				});

				if (rebase) {
					elements.forEach(function(el) {
						el.remove().append(el);
					});

				}
			});

		}
	});

		// Tooltip maximal dimensions for intelligent placement:
		var actualWidth = 200;
		var actualHeight = 100;
		// Tooltip smart tooltip placement function:
		var tooltipPlacer = function(tip, element) {
			var element, above, below, boundBottom, boundLeft, boundRight, boundTop, elementAbove, elementBelow, elementLeft, elementRight, isWithinBounds, left, pos, right;
			isWithinBounds = function(elementPosition) {
				return boundTop < elementPosition.top && boundLeft < elementPosition.left && boundRight > (elementPosition.left + actualWidth) && boundBottom > (elementPosition.top + actualHeight);
			};
			element = document.querySelector('element');

			var rect = element.getBoundingClientRect();
			var offset = {
				top: rect.top + document.body.scrollTop,
				left: rect.left + document.body.scrollLeft
			};

			var extend = function(out) {
				out = out || {};

				for (var i = 1; i < arguments.length; i++) {
					if (!arguments[i])
						continue;

					for (var key in arguments[i]) {
						if (arguments[i].hasOwnProperty(key))
							out[key] = arguments[i][key];
					}
				}

				return out;
			};

			pos = extend({}, offset, {
				width: element.offsetWidth,
				height: element.offsetHeight
			});
			boundTop = document.scrollTop;
			boundLeft = document.scrollLeft;
			boundRight = boundLeft + parseInt(getComputedStyle(window).width);
			boundBottom = boundTop + parseInt(getComputedStyle(window).height);
			elementAbove = {
				top: pos.top - actualHeight,
				left: pos.left + pos.width / 2 - actualWidth / 2
			};
			elementBelow = {
				top: pos.top + pos.height,
				left: pos.left + pos.width / 2 - actualWidth / 2
			};
			elementLeft = {
				top: pos.top + pos.height / 2 - actualHeight / 2,
				left: pos.left - actualWidth
			};
			elementRight = {
				top: pos.top + pos.height / 2 - actualHeight / 2,
				left: pos.left + pos.width
			};
			above = isWithinBounds(elementAbove);
			below = isWithinBounds(elementBelow);
			left = isWithinBounds(elementLeft);
			right = isWithinBounds(elementRight);
			if (above) {
				return "top";
			} else {
				if (below) {
					return "bottom";
				} else {
					if (left) {
						return "left";
					} else {
						if (right) {
							return "right";
						} else {
							return "right";
						}
					}
				}
			}
		};

		// Modules edit icons:

		Joomla.frontEditing = {};
		Joomla.frontEditing.mouseHoundling = function(elements) {
			elements.on({
				mouseenter: function () {

					// Get module editing URL and tooltip for module edit:
					var moduleEditUrl = event.target.data('jmodediturl');
					var moduleTip     = event.target.data('jmodtip');
					var moduleTarget  = event.target.data('target');

					// Stop timeout on previous tooltip and remove it:
					$('body>.btn.jmodedit').clearQueue().tooltip('dispose').remove();

					// Add editing button with tooltip:
					$(this).addClass('jmodinside')
						.prepend('<a class="btn jmodedit" href="#" target="' + moduleTarget + '"><span class="icon-edit"></span></a>')
						.children(":first").attr('href', moduleEditUrl).attr('title', moduleTip)
						.tooltip({"container": false, html: true, placement: tooltipPlacer})
						.jEditMakeAbsolute(true);

					$('.btn.jmodedit')
						.on({
							mouseenter: function () {
								// Stop delayed removal programmed by mouseleave of .jmoddiv or of this one:
								$(this).clearQueue();
							},
							mouseleave: function () {
								// Delay remove editing button if not hovering it:
								$(this).delay(500).queue(function (next) {
									$(this).tooltip('dispose').remove();
									next();
								});
							}
						});
				},
				mouseleave: function () {

					// Delay remove editing button if not hovering it:
					$('body>.btn.jmodedit').delay(500).queue(function (next) {
						$(this).tooltip('dispose').remove();
						next();
					});
				}
			});
		};


		// Menu items edit icons:

		Joomla.frontEditing.mouseClick = function(elements) {
			var activePopover = null;

			elements.on({
				mouseenter: function () {

					// Get menu ItemId from the item-nnn class of the li element of the menu:
					var itemids = /\bitem-(\d+)\b/.exec($(this).attr('class'));
					if (typeof itemids[1] == 'string') {
						// Find module editing URL from enclosing module:
						var enclosingModuleDiv = $(this).closest('.jmoddiv');
						var moduleEditUrl = enclosingModuleDiv.data('jmodediturl');
						// Transform module editing URL into Menu Item editing url:
						var menuitemEditUrl = moduleEditUrl.replace(/\/index.php\?option=com_config&view=modules([^\d]+).+$/, '/administrator/index.php?option=com_menus&view=item&layout=edit$1' + itemids[1]);

					}

					// Get tooltip for menu items from enclosing module
					var menuEditTip = enclosingModuleDiv.data('jmenuedittip').replace('%s', itemids[1]);

					var content = $('<div><a class="btn jfedit-menu" href="#" target="_blank"><span class="icon-edit"></span></a></div>');
					content.children('a.jfedit-menu').prop('href', menuitemEditUrl).prop('title', menuEditTip);

					if (activePopover) {
						$(activePopover).popover('hide');
					}
					$(this).popover({
						html: true,
						content: content.html(),
						container: 'body',
						trigger: 'manual',
						animation: false,
						placement: 'bottom'
					}).popover('show');
					activePopover = this;

					$('body>div.popover')
						.on({
							mouseenter: function () {
								if (activePopover) {
									$(activePopover).clearQueue();
								}
							},
							mouseleave: function () {
								if (activePopover) {
									$(activePopover).popover('hide');
								}
							}
						})
						.find('a.jfedit-menu').tooltip({"container": false, html: true, placement: 'bottom'});
				},
				mouseleave: function () {
					$(this).delay(1500).queue(function (next) {
						$(this).popover('hide');
						next()
					});
				}
			});
		};

	$(document).ready(function() {
		tooltipPlacer();
		Joomla.frontEditing.mouseHoundling($('.jmoddiv'));
		Joomla.frontEditing.mouseClick($('.jmoddiv[data-jmenuedittip] .nav li,.jmoddiv[data-jmenuedittip].nav li,.jmoddiv[data-jmenuedittip] .nav .nav-child li,.jmoddiv[data-jmenuedittip].nav .nav-child li'));
	});
})(Joomla);
