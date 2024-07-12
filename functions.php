<?php 

    add_action('wp_enqueue_scripts', 'ariom_enqueue_styles');
    function ariom_enqueue_styles() {
        wp_enqueue_style('ariom-style', get_stylesheet_directory_uri() . '/css/ariom.css', [], filemtime(get_stylesheet_directory() . '/css/ariom.css'));

        wp_enqueue_script('ariom-script', get_stylesheet_directory_uri() . '/js/frontend.js', [], filemtime(get_stylesheet_directory() . '/js/frontend.js'), true);
    }

    add_action('after_setup_theme', 'ariom_setup_theme');
    function ariom_setup_theme() {
        add_theme_support('editor-styles');
        add_editor_style('css/ariom.css');
    }
    
    add_shortcode('ariom_drawer', function($atts, $content = null) {
        $output = apply_filters('the_content', $content);
        return <<<HTML
            <div class="drawer ariom-drawer h-[500px]">
                <input type="checkbox" id="drawer-toggle" class="drawer-toggle" />
                $output
            </div>
        HTML;
    });

    add_shortcode('drawer_content', function($atts, $content = null) {
        $output = apply_filters('the_content', $content);
        return <<<HTML
            <div class="drawer-content h-full max-h-full">
                $output
            </div>
        HTML;
    });

    add_shortcode('drawer_side', function($atts, $content = null) {
        remove_filter('the_content', 'wpautop');
        $output = apply_filters('the_content', $content);
        add_filter('the_content', 'wpautop');
        return <<<HTML
            <div class="drawer-side">
                <label for="drawer-toggle" aria-label="close sidebar" class="drawer-overlay"></label>
                $output
            </div>
        HTML;
    });

    add_shortcode('drawer_button', function($atts, $content = null) {
        $output = apply_filters('the_content', $content);
        return <<<HTML
            <label for="drawer-toggle" class="drawer-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="black" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/></svg>
            </label>
        HTML;
    });

    add_shortcode('do_pattern', function($atts, $content = null) {
        extract(shortcode_atts([
            'slug' => 'default'
        ], $atts));
        
        $pattern = get_posts([
            'post_name' => $slug,
            'post_type' => 'wp_block',
            'numberposts' => 1
        ]);

        if (empty($pattern)) { return; }

        $pattern = $pattern[0];
        $pattern_content = apply_filters('the_content', $pattern->post_content);
        $pattern_output = do_blocks($pattern_content);


        
        return $pattern_output;
    });