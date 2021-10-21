<?php

class DogVsCat{

  /**
   * Cast your vote!
   */
  public static function voteForDogOrCat() {

    if ( !wp_verify_nonce( $_POST['nonce'], "dogCatNonce")) {
      die();
    }

    global $wpdb;

    $tableName = $wpdb->prefix . 'dog_vs_cat';

    $result = $wpdb->query(
      $wpdb->prepare(
        "UPDATE `$tableName` SET count = count + 1 WHERE animal_type = %s", $_POST['type']
      ),
      ARRAY_A);
      if( $result ){
        $counts = $wpdb->get_results( "SELECT * FROM `$tableName`" , ARRAY_A);
      }
      echo json_encode($counts);

      die();
    }

    /**
     * Install table and rows on activation
     */
    public static function dogVsCatInstall() {
      global $wpdb;

      $tableName = $wpdb->prefix . 'dog_vs_cat';

      $charsetCollate = $wpdb->get_charset_collate();

      $sql = "CREATE TABLE IF NOT EXISTS $tableName (
        `id` int(2) NOT NULL AUTO_INCREMENT,
        `animal_type` varchar(55) NOT NULL,
        `count` int(11) NOT NULL,
        PRIMARY KEY  (id)
      ) $charsetCollate;";

      dbDelta( $sql );

      $wpdb->query("INSERT INTO `$tableName` (`animal_type`, `count`) VALUES
      ('dog', 0),
      ('cat', 0)"
    );

  }

  /**
   * Uninstall table on plugin deactivation
   */
  public static function dogVsCatUnInstall() {

    global $wpdb;

    $tableName = $wpdb->prefix . 'dog_vs_cat';

    $sql = "DROP TABLE $tableName";

    $wpdb->query($sql);
  }
}
