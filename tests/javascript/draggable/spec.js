/**
 * @package     Joomla.Tests
 * @subpackage  JavaScript Tests
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 *
 * @since       3.6.3
 * @version     1.0.0
 */

define(['jquery', 'testsRoot/draggable/spec-setup', 'jasmineJquery'], function ($) {
	
	describe('Draggable tests', function () {
		it('should assign task to form.task.value', function () {
			var contentLoadedEvent = document.createEvent("Event");
			contentLoadedEvent.initEvent("DOMContentLoaded", true, true);
			window.document.dispatchEvent(contentLoadedEvent);
			var value = document.querySelectorAll('js-draggable');
			
			
			
		});
	});
});
