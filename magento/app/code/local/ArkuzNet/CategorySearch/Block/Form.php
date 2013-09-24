<?php

/**
 * ArkuzNet
 *
 * CategorySearch block
 *
 * @category    ArkuzNet
 * @package     ArkuzNet_CategorySearch
 * @copyright   Copyright (c) 2012 ArkuzNet
 * @author      Arkadij Kuzhel <arkuzhel@gmail.com>
 */
class ArkuzNet_CategorySearch_Block_Form extends Mage_Adminhtml_Block_Catalog_Category_Tree
{

    public function getScriptPath()
    {
        return Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_JS) . 'lib/categorysearch.js';
    }

}
