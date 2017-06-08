<?php
/**
 * Show messages
 *
 * @author      brasofilo
 * @package     WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! $messages ) return;

foreach ( $messages as $message ) :
    // The message does not contain the "add to cart" string, so print the message
    // http://stackoverflow.com/q/4366730/1287812
    if ( strpos( $message, 'added to your cart' ) === false ) :
        ?>
            <div class="shop-message"><?php echo wp_kses_post( $message ); ?></div>
        <?php
    endif;
endforeach;
