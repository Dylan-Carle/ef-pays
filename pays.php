<?php 
/**
 * Package Pays
 * Version 1.0.0
 */
/*
Plugin name: Pays
Plugin uri: https://github.com/Dylan-Carle
Version: 1.0.0
Description: Permet d'afficher les destinations disponibles dans les plus beaux pays du monde
*/
function eddym_enqueue3()
{
// filemtime // retourne en milliseconde le temps de la dernière modification
// plugin_dir_path // retourne le chemin du répertoire du plugin
// __FILE__ // le fichier en train de s'exécuter
// wp_enqueue_style() // Intègre le link:css dans la page
// wp_enqueue_script() // intègre le script dans la page
// wp_enqueue_scripts // le hook

$version_css = filemtime(plugin_dir_path( __FILE__ ) . "sass/style.css");
$version_js = filemtime(plugin_dir_path(__FILE__) . "js/pays.js");
wp_enqueue_style(   'em_plugin_pays_css',
                     plugin_dir_url(__FILE__) . "sass/style.css",
                     array(),
                     $version_css);

wp_enqueue_script(  'em_plugin_pays_js',
                    plugin_dir_url(__FILE__) ."js/pays.js",
                    array(),
                    $version_js,
                    true);
}
add_action('wp_enqueue_scripts', 'eddym_enqueue3');
/* Création de la liste des destinations en HTML */
function creation_destinations_pays(){

    $lesPays = array(
        "France",
        "États-Unis", 
        "Canada", 
        "Argentine", 
        "Chili", 
        "Belgique", 
        "Maroc", 
        "Mexique", 
        "Japon", 
        "Italie", 
        "Islande", 
        "Chine", 
        "Grèce", 
        "Suisse"
    );
    $contenu = "<div class = 'contenu__pays'>";
    foreach ($lesPays as $pays) {
        $contenu .= "<button class='bouton__categorie bouton__pays' id=" .$pays. ">".$pays."</button>";
    }
    $contenu .= "</div>";
    $contenu .= "<div class='contenu__restapi_pays'></div>";
    return $contenu;
}

add_shortcode('pays', 'creation_destinations_pays');
?>