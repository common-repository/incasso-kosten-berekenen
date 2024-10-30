<?php
function incassokostenberekenen_scripts() {

/*IKB enque*/
//wp_enqueue_script( 'tammojs', plugin_dir_url(dirname(__FILE__)) . 'js/incassokostenberekenen.js','','',true);
wp_enqueue_script( 'tammojs1', plugin_dir_url(dirname(__FILE__)) . 'js/incasso-calc.js','','',true);
wp_enqueue_script( 'tammojs2', plugin_dir_url(dirname(__FILE__)) . 'js/incasso-calc-btw.js','','',true);
wp_enqueue_style( 'tammocss', plugin_dir_url(dirname(__FILE__)) . 'css/incassokostenberekenen.css');
}
add_action( 'wp_enqueue_scripts', 'incassokostenberekenen_scripts', 12,1 );
