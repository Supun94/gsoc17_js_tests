<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_finder
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
namespace Joomla\Component\Finder\Administrator\View\Statistics;

defined('_JEXEC') or die;

use Joomla\CMS\MVC\View\HtmlView;

/**
 * Statistics view class for Finder.
 *
 * @since  2.5
 */
class Html extends HtmlView
{
	/**
	 * The index statistics
	 *
	 * @var  \JObject
	 *
	 * @since  3.6.1
	 */
	protected $data;

	/**
	 * Method to display the view.
	 *
	 * @param   string  $tpl  A template file to load. [optional]
	 *
	 * @return  mixed  A string if successful, otherwise a \JError object.
	 *
	 * @since   2.5
	 */
	public function display($tpl = null)
	{
		// Load the view data.
		$this->data = $this->get('Data');

		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			throw new \JViewGenericdataexception(implode("\n", $errors), 500);
		}

		return parent::display($tpl);
	}
}
