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

    add_shortcode('greetings', function() {
        //get the time of day of the users timezone
        return <<<HTML
            <p id="greetings">Greetings</p>
            <script>
                const date = new Date();
                const hours = date.getHours();
                let greeting = '';
                if (hours >= 0 && hours < 12) {
                    greeting = 'Good morning';
                } else if (hours >= 12 && hours < 18) {
                    greeting = 'Good afternoon';
                } else {
                    greeting = 'Good evening';
                }
                document.getElementById('greetings').textContent = greeting;
            </script>
        HTML;
        
    });