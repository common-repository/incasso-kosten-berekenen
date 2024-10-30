<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.tammohaan.nl
 * @since             1.0.6
 *
 * @wordpress-plugin
 * Plugin Name:       Incassokosten berekenen
 * Plugin URI:        https://www.tammohaan.nl
 * Description:       Bereken incassokosten. Nederlandse formule om incassokosten te berekenen. Gebruik [incasso-berekenen] shortcode om te plaatsen.
 * Version:           1.0.6
 * Author:            Tammo Haan
 * Author URI:        https://www.tammohaan.nl
 * License:           GPL-2.0+
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.txt
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once(plugin_dir_path(__FILE__).'components/enqueuing.php' );



function berekenincasso_function(){
	return '
	<form id="IKB_incasso_calculator" action="#" method="post">
			<table style="width:100%">
			<tbody align="left">
			<tr>
			<th style="width:50%"><label for="amount">Bedrag</label></th> 
			<th><input name="amount" id="amount" type="text" placeholder="Bedrag"></th> 
			</tr> 
			<tr>
			<td style="width:50%"> <label for="kosten">Incassokosten excl. BTW</label> </td> 
			<td><input name="kosten" class="taxedkosten" id="kosten" type="text" readonly="readonly" placeholder="Incassokosten"></td> 
			</tr> 
			<tr>
			<td style="width:50%"><label for="tax">BTW</label></td> 
			<td><input name="taxedkosten" class="taxedkosten" id="tax" type="text" readonly="readonly" placeholder=""></td> 
			</tr> 
			<tr>
			<td style="width:50%"> <label for="taxedkosten">Incassokosten incl. BTW</label></td> 
			<td><input name="taxedkosten" class="taxedkosten" id="taxedkosten" type="text" readonly="readonly" placeholder=""></td> 
			</tr> 
			</tbody> 
			</table> 
	</form>';
	
}
add_shortcode('incasso-berekenen', 'berekenincasso_function'); 



