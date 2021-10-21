<?php
/*
Plugin Name: Dog Vs Cat
Plugin URI: http://kaomedia.com/dog-vs-cat
Description:  This plugin creates a voting system to answer the age old question: Dogs vs Cats! Images are pulled from the Flickr API. The images are not always accurate, it depends on how the user tagged the picture, but you get the picture :-) Tested with WP 5.8.1 and the stock Twenty Tweny-One theme. P.S. THE Javascript is ES6 and has not been "babelized" yet, so you will want to use a modern browser like the latest Chrome to test.
Author: Keith Otto
Version: 1.1
Author URI: http://kaomedia.com
*/

require_once(plugin_dir_path( __FILE__ ) . 'class.dogvscat.php');
require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

function dog_vs_cat(){
  wp_enqueue_script( "dogVsCatAjax", plugin_dir_url( __FILE__ ) . "/js/dog_vs_cat.js", ["jquery"] );
  wp_enqueue_style( "dogVsCatCss", plugin_dir_url( __FILE__ ) . "css/dog_vs_cat.css");
  wp_localize_script( "dogVsCatAjax", "dogVsCatAjax", array( "ajax_url" => admin_url("admin-ajax.php"), 'nonce' => wp_create_nonce("dogCatNonce")));
}

add_action( 'wp_enqueue_scripts', 'dog_vs_cat');
add_action("wp_ajax_voteForDogOrCat", ["DogVsCat", "voteForDogOrCat"]);
add_action("wp_ajax_nopriv_voteForDogOrCat", ["DogVsCat", "voteForDogOrCat"]);


register_activation_hook( __FILE__, ["DogVsCat", "dogVsCatInstall"] );
register_deactivation_hook( __FILE__, ["DogVsCat", "dogVsCatUnInstall"] );
