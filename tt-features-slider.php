<?php
/**
 * Plugin Name: Trasform Trading Features Slider
 * Description: Autoscroll Slider to display Transform Trading features.  
 * Version: 0.1
 * Author: Rafael Fu
 * Author URI: mailto:hi@rafaelfu.me
 */

 //Creates Shortcode
 add_action( 'init', 'tt_features_shortcode' );
 function tt_features_shortcode(){
    add_shortcode( 'tt_features', 'tt_features_slider' );
 }

  //Load Shortcode Resources
 add_action('wp_enqueue_scripts', 'tt_features_resources');
 function tt_features_resources(){
    global $post;
    if(has_shortcode( $post->post_content, 'tt_features' )){
        wp_enqueue_script('ttFeatures',  plugins_url( 'ttFeatures.js', __FILE__ ));
        wp_register_style('ttfeaturesstyle', plugin_dir_url( __FILE__ ) . 'ttfeaturesstyle.css');
        wp_enqueue_style('ttfeaturesstyle');
	}	
 }


 //Shortcode Content
 function tt_features_slider(){
    global $post;
    if(has_shortcode( $post->post_content, 'tt_features' )){
		
        echo '<div class="container">
        <section id="slider1" class="splide" aria-label="Splide Basic HTML Example">
        <div class="splide__track">
              <ul id="list" class="splide__list">
                  <p>Loading</p>
              </ul>
        </div>
        <div class="my-carousel-progress">
          <div class="my-carousel-progress-bar"></div>
        </div>
      </section>
      </div>';
    }
 }