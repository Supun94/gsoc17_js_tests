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
//D:\xampp\htdocs\gsoc\test-permission\gsoc17_js_tests\media\system\js\draggable.js
//D:\xampp\htdocs\gsoc\test-permission\gsoc17_js_tests\media/vendor/dragula/js/dragula.js

define(['jquery', 'text!testsRoot/draggable/fixtures/fixture.html', 'libs/draggable', 'dragula'], function ($, fixture) {
	$('body').append(fixture);
});
