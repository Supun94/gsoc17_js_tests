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

define(['jquery', 'text!testsRoot/helpsite/fixtures/fixture.html', 'libs/helpsite', 'libs/core'], function ($, fixture) {
	$('body').append(fixture);
	
	helpSiteResponses = {
		success: {
			status: 200,
			statusText: 'HTTP/1.1 200 OK',
			responseText: '{"messages": {"message": "text"}}'
		},
		successInvalid: {
			status: 200,
			statusText: 'HTTP/1.1 200 OK',
			responseText: '{"messages": "text"}'
		},
		fail: {
			status: 404,
			statusText: 'HTTP/1.1 404 Not Found',
			responseText: 'Error'
		}
	};
	
	select_id   = 'rel';
	showDefault = 'showDefault';
	
	$('#helpsite').click(resetHelpSiteList);
});
