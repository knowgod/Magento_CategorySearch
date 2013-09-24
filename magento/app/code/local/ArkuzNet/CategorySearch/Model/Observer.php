<?php

/**
 * ArkuzNet
 *
 * CategorySearch observer
 *
 * @category    ArkuzNet
 * @package     ArkuzNet_CategorySearch
 * @copyright   Copyright (c) 2012 ArkuzNet
 * @author      Arkadij Kuzhel <arkuzhel@gmail.com>
 */
class ArkuzNet_CategorySearch_Model_Observer extends Varien_Object
{

    public function addCategorySearchToWidget($observer)
    {
        $action = $observer->getControllerAction();
        $this->_updateBody($action);

        $block = $action->getLayout()->createBlock('categorysearch/form')
            ->setTemplate('catalog/categorysearch/form.phtml')
            ->setPutScriptTag()
            ->setUniqId($action->getRequest()->getParam('uniq_id'));
        $action->getResponse()->appendBody($block->toHtml(), 'category_search');
    }

    public function addCategorySearchToProduct($observer)
    {
        $action = $observer->getControllerAction();
        $this->_updateBody($action);
    }

    protected function _updateBody(Mage_Core_Controller_Varien_Action $action)
    {
        $body = preg_replace(
            '#(\=\s*new Ext\.tree\.TreePanel)#',
            '= window.theTree $1',
            $action->getResponse()->getBody());
        $action->getResponse()->setBody($body);
    }

}

?>
