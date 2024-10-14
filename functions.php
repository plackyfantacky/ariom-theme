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

    add_action('init', 'ariom_init');
    function ariom_init() {
        register_post_type('case-study', [
            'labels' => [
                'name' => 'Case Studies',
                'singular_name' => 'Case Study',
                'add_new' => 'Add New',
                'add_new_item' => 'Add New Case Study',
                'edit_item' => 'Edit Case Study',
                'new_item' => 'New Case Study',
                'view_item' => 'View Case Study',
                'search_items' => 'Search Case Studies',
                'not_found' => 'No Case Studies found',
                'not_found_in_trash' => 'No Case Studies found in Trash',
                'parent_item_colon' => 'Case Study Case Study:',
                'all_items' => 'All Case Studies',
                'archives' => 'Case Study Archives',
                'insert_into_item' => 'Insert into Case Study',
                'uploaded_to_this_item' => 'Uploaded to this Case Study',
                'featured_image' => 'Featured Image',
                'set_featured_image' => 'Set featured image',
                'remove_featured_image' => 'Remove featured image',
                'use_featured_image' => 'Use as featured image',
                'filter_items_list' => 'Filter Case Studies list',
                'items_list_navigation' => 'Case Studies list navigation',
                'items_list' => 'Case Studies list',
                'item_published' => 'Case Study published.',
                'item_published_privately' => 'Case Study published privately.',
                'item_reverted_to_draft' => 'Case Study reverted to draft.',
                'item_scheduled' => 'Case Study scheduled.',
                'item_updated' => 'Case Study updated.',
            ],
            'public' => true,
            'menu_icon' => 'dashicons-layout',
            'menu_position' => 20,
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions'],
            'has_archive' => true,
            'show_in_rest' => true,
            'rewrite' => ['slug' => 'case-studies', 'with_front' => false],
        ]);
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
            'React',
            'React Native',
        ];
        $technology = $technologies[array_rand($technologies)];
        return '<span class="font-semibold">'.$technology.'</span>';
    });

    add_shortcode('post_breadcrumbs', function() {
        //blog post home

        $blog_home_link = '<a class="major-link" href="'.get_permalink(get_option('page_for_posts')).'">The Blog</a>';
        $current_category_link = '<a class="major-link" href="'.get_category_link(get_the_category()[0]->term_id).'">'.get_the_category()[0]->name.'</a>';
        $current_post_title = '<span class="current-link">' .get_the_title() . '</span>';
        $arrow = '<span class="arrow">→</span>';
        //$links = implode(' ', [$blog_home_link, $arrow, $current_category_link, $arrow, $current_post_title]);

        return <<<HTML

            <div class="breadcrumbs-outer">
                <ul class="breadcrumbs">
                    <li>$blog_home_link</li>
                    <li>$arrow</li>
                    <li>$current_category_link</li>
                    <li>$arrow</li>
                    <li>$current_post_title</li>
                </ul>
            </div>
        HTML;
    });

    add_shortcode('case_study_breadcrumbs', function() {
        //case study home
        $case_study_home_link = '<a class="major-link" href="'.get_post_type_archive_link('case-study').'">Case Studies</a>';
        $current_case_study_title = '<span class="current-link">' .get_the_title() . '</span>';
        $arrow = '<span class="arrow">→</span>';

        return <<<HTML
            <div class="breadcrumbs-outer">
                <ul class="breadcrumbs">
                    <li>$case_study_home_link</li>
                    <li>$arrow</li>
                    <li>$current_case_study_title</li>
                </ul>
            </div>
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

    //google analytics
    add_action('wp_head', function() {
        $tracking_id = 'G-JQJD93X1EZ';
        echo <<<HTML
            <script async src="https://www.googletagmanager.com/gtag/js?id=$tracking_id"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '$tracking_id');
            </script>
        HTML;
    });

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