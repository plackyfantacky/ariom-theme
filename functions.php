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

    add_shortcode('year', function() {
        return date('Y');
    });

    add_shortcode('technology', function() {
        //pick one random technology from the list
        $technologies = [
            'WordPress',
            'PHP',
            'JavaScript',
            'HTML',
            'CSS',
            'TypeScript',
            'React',
            'React Native',
        ];
        $technology = $technologies[array_rand($technologies)];
        return '<span class="font-semibold">'.$technology.'</span>';
    });

    add_shortcode('post_breadcrumbs', function() {
        //blog post home

        $blog_home_link = '<a class="blog-home-link" href="'.get_permalink(get_option('page_for_posts')).'">The Blog</a>';
        $current_category_link = '<a class="current-category-link" href="'.get_category_link(get_the_category()[0]->term_id).'">'.get_the_category()[0]->name.'</a>';
        $current_post_title = '<span class="current-post-title">' .get_the_title() . '</span>';
        $arrow = '<span class="arrow">→</span>';

        return <<<HTML
            <ul class="post-breadcrumbs">
                <li>$blog_home_link</li>
                <li>$arrow</li>
                <li>$current_category_link</li>
                <li>$arrow</li>
                <li>$current_post_title</li>
            </ul>
        HTML;
    });

    add_filter('wpcf7_form_elements', function($content) {
        
        $doc = new DOMDocument();
        $doc->loadHTML($content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_use_internal_errors(true);
        $xpath = new DOMXPath($doc);
        
        //find the span with the class name 'wpcf7-form-control-wrap'
        $spans = $xpath->query("//span[contains(@class, 'wpcf7-form-control-wrap')]");
        //with each span...
        foreach($spans as $span) {
            $parent = $span->parentNode;
            foreach($span->attributes as $attr) {
                //if attribute is a class, merge it with the parent class
                if ($attr->name === 'class') {
                    $parent->setAttribute('class', $parent->getAttribute('class') . ' ' . $attr->value);
                } else {
                    //otherwise, add the attribute to the parent
                    $parent->setAttribute($attr->name, $attr->value);
                }
            }
            //move the span's children to the end of the parent
            while($span->hasChildNodes()) {
                //$parent->appendChild($span->firstChild);
                $parent->insertBefore($span->firstChild, $parent->firstChild);
            }
            //remove the span
            $parent->removeChild($span);            
        }
        $content = $doc->saveHTML();
        return $content;
    });

    add_action('save_post', function($post_id) {
        //write the post content to a file
        // Check the logged in user has permission to edit this post
        if (!current_user_can('manage_options')) {
            return $post_id;
        }

        $object = get_post($post_id);
        $content = $object->post_content;
        $type = $object->post_type;
        $slug = $object->post_name;

        //revision, autosave, and nav_menu_item are not supported
        if($type === 'revision' || $type === 'nav_menu_item' || $type === 'auto-draft') { return $post_id;}

        $path = get_theme_file_path() ."/exported/$type/";
        $filename = $path . "$slug.txt";
        //if the directory doesn't exist, create it
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        //if file exists, overwrite it otherwise create it
        if (file_exists($filename)) {
            $file = fopen($filename, 'w');
        } else {
            $file = fopen($filename, 'x');
        }

        fwrite($file, $content);
        fclose($file);
    });

    add_filter('render_block_core/media-text', function($block_content, $block) {
        $grid = file_get_contents(get_theme_file_path() . '/assets/art/blueprint-grid.svg');
        $block_content = str_replace('</figure>','</figure>' . $grid, $block_content);
        return $block_content;
    }, 11, 2);

    add_filter('post_thumbnail_html', function($html, $post_id, $post_thumbnail_id) {
        if(empty($html)) { 
            $svg = file_get_contents(get_theme_file_path() . '/assets/logo-white-outline.svg');
            $html = <<<HTML
                <div class="image-placeholder">
                    <div class="w-24 h-24">
                        $svg
                    </div>
                </div>
            HTML;
        }
        return $html;
    }, 11, 3);