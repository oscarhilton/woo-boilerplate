<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber::get_context();


//1493766000

$args = array(
	'post_type' => 'product',
	'posts_per_page' => -1
);

$args2 = array(
	'post_type' => 'post',
	'posts_per_page' => 3
);

$context['products'] = Timber::get_posts($args);
$context['posts'] = Timber::get_posts($args2);

$products = $context['products'];


//
// var_dump($context['products']);

$templates = array( 'index.twig' );
if ( is_home() ) {
	array_unshift( $templates, 'home.twig' );
}
Timber::render( $templates, $context );
