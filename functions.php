<?php 

    add_action('wp_enqueue_scripts', 'ariom_enqueue_styles');
    function ariom_enqueue_styles() {
        wp_enqueue_style('ariom-style', get_stylesheet_directory_uri() . '/css/ariom.css', [], filemtime(get_stylesheet_directory() . '/css/ariom.css'));

        wp_enqueue_script('ariom-script', get_stylesheet_directory_uri() . '/js/frontend.js', [], filemtime(get_stylesheet_directory() . '/js/frontend.js'), true);
    }