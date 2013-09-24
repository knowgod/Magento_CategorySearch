
/**
 * CategorySearch JavaScript
 *
 * @see /js/extjs/ext-tree.js
 *
 * @category    ArkuzNet
 * @package     js
 * @copyright   Copyright (c) 2012 ArkuzNet
 * @author      Arkadij Kuzhel <arkuzhel@gmail.com>
 */


var categoryTreeSearch = {
    searchField: false,
    nodeList: [],
    initiated: false,
    resetInitAfterFilter: false,
    interval: false,
    filteredNodes: [],

    init: function(searchField) {
        if (!categoryTreeSearch.interval) {
            window.theTree = window.theTree || tree;
            if ('undefined' == window.theTree) {
                return;
            }
            if (searchField) {
                categoryTreeSearch.searchField = searchField;
                categoryTreeSearch.searchField.disabled = 'disabled';
            }
            if ('object' == typeof(window.theTree.nodeHash)) {
                for (var id in window.theTree.nodeHash) {
                    if (!window.theTree.nodeHash[id].expanded)
                        categoryTreeSearch.nodeList.push(id);
                }
            }
            window.theTree.expandAll();
            categoryTreeSearch.interval = setInterval(categoryTreeSearch.checkLoaded, 250);
            categoryTreeSearch.checkLoaded();
        }
    },

    checkLoaded: function() {
        if ('object' == typeof(window.theTree.nodeHash)) {
            for (var id in window.theTree.nodeHash) {
                if (!window.theTree.nodeHash[id].expanded) {
                    return;
                } else {
                }
            }
            clearInterval(categoryTreeSearch.interval);
            categoryTreeSearch.interval = false;
            categoryTreeSearch.searchField.disabled = false;

            categoryTreeSearch.initiated = true;
            categoryTreeSearch.filter(categoryTreeSearch.searchField);
        }
    },

    filter: function(searchField, uninitThen) {
        if (!searchField || searchField.value == searchField.oldvalue) {
            return;
        }
        if ('undefined' != uninitThen && !categoryTreeSearch.resetInitAfterFilter) {
            categoryTreeSearch.resetInitAfterFilter = uninitThen;
        }

        if (!categoryTreeSearch.initiated) {
            categoryTreeSearch.init(searchField);
            return;
        }
        searchField.disabled = false;
        var search = searchField.value;

        categoryTreeSearch.isMatch(search);
        searchField.oldvalue = searchField.value;

        if (categoryTreeSearch.resetInitAfterFilter) {
            categoryTreeSearch.initiated = false;
        }
    },

    isMatch: function(search, node) {
        node = node || window.theTree.root;
        var result = {
            match: false,
            contains: false
        };
        if ('object' == typeof(node)) {
            if (search.length) {
                var re = new RegExp(search, "i");

                if (node.text && node.text.match(re)) {
                    result.match = true;
                }

                if (node.childNodes.length) {
                    var children;
                    node.childNodes.each(function(childNode) {
                        children = categoryTreeSearch.isMatch(search, childNode);
                        result.contains = ((children.contains || children.match) ? true : false) || result.contains;
                    });
                }

                if ("undefined" != typeof(node.ui.getTextEl())) {
                    if (result.contains || result.match) {
                        node.ui.show();
                        if (result.match) {
                            node.ui.getTextEl().innerText.bold();
                        }
                    } else {
                        node.ui.hide();
                    }
                    categoryTreeSearch.nodeMatch(node, result.match);
                }
            } else {
                if (node.childNodes.length) {
                    node.childNodes.each(function(childNode) {
                        categoryTreeSearch.isMatch(search, childNode);
                    });
                }
                node.ui.show();
                categoryTreeSearch.nodeMatch(node, 0);
            }
        }
        return result;
    },

    nodeMatch: function(node, isOn) {
        if ("undefined" != typeof(node.ui.getTextEl())) {
            node.ui.getTextEl().style.fontWeight = isOn ? '700' : '400';
        }
    }
};
