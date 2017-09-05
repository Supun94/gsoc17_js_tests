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
	
	describe('Draggable trigger DOMContentLoaded event', function () {
		
		var spyEvent;
		// Set up the script
		beforeEach(function () {
			var contentLoadedEvent = document.createEvent("Event");
			contentLoadedEvent.initEvent("DOMContentLoaded", true, true);
			window.document.dispatchEvent(contentLoadedEvent);
			
		});
		
		it('Should have draggable class', function () {
			var rows = document.querySelector('.js-draggable');
			console.log('aaa'+document);
			expect(rows).toHaveClass('js-draggable')
		});
		// it('Should have "tr" element whose class name begins with "row"', function () {
		// 	var length = document.querySelectorAll('tr[class^="row"]').length;
		// 	expect(length).toBeGreaterThan(0);
		// });
		// it('Should have trigger the click event of multiselect-row', function () {
		// 	spyEvent = spyOnEvent('#multiselect-row', 'click');
		// 	$('#multiselect-row').trigger("click");
		//
		// 	expect('click').toHaveBeenTriggeredOn('#multiselect-row');
		// 	expect(spyEvent).toHaveBeenTriggered();
		// });
		// it('Should have "checkall-toggle" elements', function () {
		// 	var checkallToggle = document.getElementsByName('checkall-toggle')[0];
		// 	expect(checkallToggle).not.toBeNull();
		// });
	});
});
