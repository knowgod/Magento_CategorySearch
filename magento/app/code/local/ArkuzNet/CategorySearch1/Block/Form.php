<?php

/**
 * ArkuzNet
 *
 * CategorySearch1 block
 *
 * @category    ArkuzNet
 * @package     ArkuzNet_CategorySearch1
 * @copyright   Copyright (c) 2012 ArkuzNet
 * @author      Arkadij Kuzhel <knowgod@arkuz.net>
 */
class ArkuzNet_CategorySearch1_Block_Form extends Mage_Adminhtml_Block_Catalog_Category_Tree
{

    public function getScriptPath()
    {
        return Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_JS) . 'lib/categorysearch.js';
    }

}
