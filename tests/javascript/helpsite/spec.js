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

define(['jquery', 'testsRoot/helpsite/spec-setup', 'jasmineJquery'], function ($) {
	
	describe('Helpsite', function () {
		beforeAll(function() {
			jasmine.Ajax.install();
			
			renderFn = Joomla.renderMessages;
			removeFn = Joomla.removeMessages;
			ajxerrFn = Joomla.ajaxErrorsMessages;
			scrollFn = window.scrollTo;
			
			Joomla.renderMessages = jasmine.createSpy('renderMessages');
			Joomla.removeMessages = jasmine.createSpy('removeMessages');
			Joomla.ajaxErrorsMessages = jasmine.createSpy('ajaxErrorsMessages');
			window.scrollTo = jasmine.createSpy('scrollTo');
			
			$('#helpsite').click();
		});
		
		afterAll(function () {
			jasmine.Ajax.uninstall();
			
			Joomla.renderMessages = renderFn;
			Joomla.removeMessages = removeFn;
			Joomla.ajaxErrorsMessages = ajxerrFn;
			window.scrollTo = scrollFn;
		});
		
		describe("on success with typeof item.value !== '' ", function() {
			beforeAll(function() {
				request = jasmine.Ajax.requests.mostRecent();
				request.respondWith(helpSiteResponses.successInvalid);
			});
			
			it("should call Joomla.resetHelpSiteList({})", function() {
				expect(resetHelpSiteList).not.toHaveBeenCalledWith({});
			});
		});
		
	});
});
