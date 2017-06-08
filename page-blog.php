<?php

global $paged;
if (!isset($paged) || !$paged){
    $paged = 1;
}
$context = Timber::get_context();

$args = array(
  'posts_per_page' => 5,
  'paged' => $paged
);

query_posts($args);

$context['posts'] = Timber::get_posts();
$context['categories'] = Timber::get_terms('category');
$context['post'] =  new TimberPost();

Timber::render( 'page-blog.twig', $context );
