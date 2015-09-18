﻿
var selectDate;

$(document).ready(function () {

    var finput = document.getElementById('fileInput');
    finput.addEventListener('change', function (e) {
        fileUploaded(e);

    });

    if (isInternetExplorer()) {
        document.getElementById("txtVersion").style.lineHeight = "0px";
        document.getElementById("txtTargetVersion").style.lineHeight = "0px";
    }

    $("#btRemoveProduct").prop("disabled", true);
    $("#btAddLanguage").prop("disabled", true);
    $("#btRemoveLanguage").prop("disabled", true);

    odtToggleUpdate();
    $("#updatesEnabled").change(odtToggleUpdate);

    odtToggleLogging();
    $("#loggingLevel").change(odtToggleLogging);

    odtToggleRemoveApp();
    $("#removeAllProducts").change(odtToggleRemoveApp());

    setActiveTab();

    resizeWindow();

    var xmlOutput = $.cookie("xmlcache");
    $('textarea#xmlText').val(xmlOutput);
    loadUploadXmlFile();

    $(window).resize(function () {
        resizeWindow();
    });

    //$(".alert").addClass("in").fadeOut(4500);

    $('#txtPidKey').keydown(function (e) {
        var currentText = this.value;
        var code = e.keyCode || e.which;

        var start = document.getElementById("txtPidKey").selectionStart;
        var end = document.getElementById("txtPidKey").selectionEnd;
        
        if (code == 189) {
            if (start != 5 && start != 11 && start != 17 && start != 23) {
                e.preventDefault();
            }
        }
        
        if (code == 8 || code == 46) {
            if (end < currentText.length) {
                var selPart = currentText.substring(start - 1, end);
                if (selPart.indexOf("-") > -1) {
                    e.preventDefault();
                }
            }
        }

        if (code == 8 || (code >= 37 && code <= 40)) return;
        if (code == 46 || code == 16) return;
        
        var strSplit = currentText.split('-');
        for (var t = 0; t < strSplit.length; t++) {
            var part = strSplit[t];
            if (part.length > 5) {
                //e.preventDefault();
            }
        }

        if (currentText.length > 28) {
            e.preventDefault();
        }
    });

    $('#txtPidKey').keyup(function () {
        validatePidKey(this);

        var currentText = this.value;
        if (currentText.length >= 27) {

            while (currentText.indexOf("-") > -1) {
                currentText = currentText.replace("-", "");
            }

            var newCode = currentText.substring(0, 5) + "-" +
                          currentText.substring(5, 10) + "-" +
                          currentText.substring(10, 15) + "-" +
                          currentText.substring(15, 20) + "-" +
                          currentText.substring(20, 25);

            var start = document.getElementById("txtPidKey").selectionStart;
            var end = document.getElementById("txtPidKey").selectionEnd;
            this.value = newCode;
            document.getElementById("txtPidKey").selectionStart = start;
            document.getElementById("txtPidKey").selectionEnd = end;
        }
    });


    $('#txtPACKAGEGUID').keydown(function (e) {
        var currentText = this.value;
        var code = e.keyCode || e.which;

        var start = document.getElementById("txtPACKAGEGUID").selectionStart;
        var end = document.getElementById("txtPACKAGEGUID").selectionEnd;

        if (code == 189) {
            if (start != 5 && start != 11 && start != 17 && start != 23) {
                e.preventDefault();
            }
        }

        if (code == 8 || code == 46) {
            if (end < currentText.length) {
                var selPart = currentText.substring(start - 1, end);
                if (selPart.indexOf("-") > -1) {
                    e.preventDefault();
                }
            }
        }

        if (code == 8 || (code >= 37 && code <= 40)) return;
        if (code == 46 || code == 16) return;

        var strSplit = currentText.split('-');
        for (var t = 0; t < strSplit.length; t++) {
            var part = strSplit[t];
            if (part.length > 5) {
                //e.preventDefault();
            }
        }

        if (currentText.length > 36) {
            e.preventDefault();
        }
    });

    $('#txtPACKAGEGUID').keyup(function () {
        validatePackageGuid(this);

        var currentText = this.value;
        if (currentText.length >= 31) {

            while (currentText.indexOf("-") > -1) {
                currentText = currentText.replace("-", "");
            }

            var newCode = currentText.substring(0, 8) + "-" +
                          currentText.substring(8, 12) + "-" +
                          currentText.substring(12, 16) + "-" +
                          currentText.substring(16, 20) + "-" +
                          currentText.substring(20, 32);

            var start = document.getElementById("txtPACKAGEGUID").selectionStart;
            var end = document.getElementById("txtPACKAGEGUID").selectionEnd;
            this.value = newCode;
            document.getElementById("txtPACKAGEGUID").selectionStart = start;
            document.getElementById("txtPACKAGEGUID").selectionEnd = end;
        }
    });

    $("#btAddProduct").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtAddProduct(xmlDoc);

        displayXml(xmlDoc);

        $("#btAddProduct").text('Edit Product');

        return false;
    });

    $("#btRemoveProduct").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtRemoveProduct(xmlDoc);

        displayXml(xmlDoc);

        return false;
    });

    $("#btAddLanguage").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtAddLanguage(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btRemoveLanguage").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtRemoveLanguage(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#cbProduct").change(function () {
        var end = this.value;
        changeSelectedProduct();
    });

    $("#cbLanguage").change(function () {
        var end = this.value;
        changeSelectedLanguage();
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        scrollXmlEditor();

        $.cookie("activeTab", e.target);

        var mainTabs = document.getElementById("myTab");
        if (mainTabs) {
            var target = $(e.target).attr("href");
            var liItems = mainTabs.getElementsByTagName("li");
            if (liItems) {
                
                for (var i = 0; i < liItems.length; i++) {
                    var liItem = liItems[i];
                    if ($("#" + liItem.id).hasClass("active")) {
                        
                    }
                }
            }
        }
    });

    $("#btAddExcludeApp").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtAddExcludeApp(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btRemoveExcludeApp").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtRemoveExcludeApp(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btAddRemoveProduct").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtAddRemoveApp(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btDeleteRemoveProduct").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtDeleteRemoveApp(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btAddRemoveLanguage").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtAddRemoveLanguage(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btRemoveRemoveLanguage").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtRemoveRemoveLanguage(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btSaveUpdates").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtSaveUpdates(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btRemovesUpdates").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtRemoveUpdates(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btSaveDisplay").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtSaveDisplay(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btRemoveDisplay").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtRemoveDisplay(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btSaveLogging").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtSaveLogging(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btRemoveLogging").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtRemoveLogging(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btSaveProperties").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtSaveProperties(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btRemoveProperties").on('click', function () {
        var xmlDoc = getXmlDocument();

        odtRemoveProperties(xmlDoc);

        displayXml(xmlDoc);
        return false;
    });

    $("#btViewOnGitHub").on('click', function () {
        window.open("https://github.com/OfficeDev/Office-IT-Pro-Deployment-Scripts/tree/master/Office-ProPlus-Deployment/CTROfficeXmlWebEditor");

        return false;
    });

    $(window).scroll(function() {
        scrollXmlEditor();
    });

    $('#the-basics .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'versions',
        source: substringMatcher(versions)
    });

    $('#txtVersion').keydown(function (e) {
        restrictToVersion(e);
    });

    $('#txtTargetVersion').keydown(function (e) {
        restrictToVersion(e);
    });

    setScrollBar();

});

function setScrollBar() {
    var optionDiv = document.getElementById("optionDiv");
    if (optionDiv) {
        var optionDivHeight = optionDiv.clientHeight;
        var bodyHeight = window.innerHeight;

        if (optionDivHeight > bodyHeight - 100) {
            document.body.style.overflow = "auto";
        } else {
            if (isInternetExplorer()) {
                document.body.style.overflow = "hidden";
            }
        }
    }
}

function scrollXmlEditor() {
    var scrollTop = $(window).scrollTop();
    var bodyWidth = window.innerWidth;

    var xmlEditorDiv = document.getElementById("xmlEditorDiv");
    if (xmlEditorDiv) {
        var clientLeft = getPos(xmlEditorDiv).x;

        if (clientLeft > 50) {
            if (scrollTop > 50) {
                xmlEditorDiv.style.top = (scrollTop - 50) + "px";
            } else {
                xmlEditorDiv.style.top = (0) + "px";
            }
        } else {
            xmlEditorDiv.style.top = (0) + "px";
        }
    }
}

function getPos(el) {
    // yay readability
    for (var lx = 0, ly = 0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return { x: lx, y: ly };
}

function isInternetExplorer() {
    if (window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    }
    return false;
}

var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        try {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        } catch(ex) {}
    };
};

function restrictToVersion(e) {
    var currentText = this.value;
    var code = e.keyCode || e.which;

    var start = document.getElementById("txtPidKey").selectionStart;
    var end = document.getElementById("txtPidKey").selectionEnd;

    if ((code >= 48 && code <= 57) || code == 190 || code == 8
       || code == 46 || (e.ctrlKey && code == 67) || code == 17
       || (e.ctrlKey && code == 86) || (code >= 37 && code <= 40)) {

    } else {
        e.preventDefault();
    }
}

function setActiveTab() {
    //var activeTab = $.cookie("activeTab");

    //if (activeTab) {
    //    if (activeTab.indexOf('#') > -1) {
    //        var tabSplit = activeTab.split('#');
    //        activeTab = tabSplit[tabSplit.length - 1];
    //    }
    //    //$('[data-toggle="tab"][href="#' + activeTab + '"]').tab('show');
    //}
}

function clickUpload() {
    var finput = document.getElementById('fileInput');
    finput.click();
}

function fileUploaded(e) {
    var control = document.getElementById('fileInput');

    var i = 0,
    files = control.files;
    var file = files[i];

    var reader = new FileReader();
    reader.onload = function (event) {
        var contents = event.target.result;
        var xmlOutput = vkbeautify.xml(contents);

        $('textarea#xmlText').val(xmlOutput);

        loadUploadXmlFile();
    };
    reader.onerror = function (event) {
        throw "File could not be read! Code " + event.target.error.code;
    };
    reader.readAsText(file);
}

function download() {
    var xmlDoc = getXmlDocument();
    var xmlString = (new XMLSerializer().serializeToString(xmlDoc.documentElement));
    var xmlOutput = vkbeautify.xml(xmlString);

    xmlOutput = xmlOutput.replace(/\n/g, "\r\n");

    var blob = new Blob([xmlOutput], { type: "text/xml" });
    saveAs(blob, "configuration.xml");
}

function validatePidKey(t) {
    //if (!this.value.match(/[0-9]/)) {
    //    this.value = this.value.replace(/[^0-9]/g, '');
    //}

    var firstPart = "";
    var secondPart = "";
    var thirdPart = "";
    var fourthPart = "";
    var fifthPart = "";

    var currentText = t.value;

    if (currentText.indexOf("--") > -1) {
        var start = document.getElementById("txtPidKey").selectionStart;
        var end = document.getElementById("txtPidKey").selectionEnd;
        t.value = t.value.replace("--", "-");
        document.getElementById("txtPidKey").selectionStart = start;
        document.getElementById("txtPidKey").selectionEnd = end;
        return;
    }

    if (currentText.length > 5) {
        firstPart = currentText.substring(0, 5);
        if (firstPart.indexOf("-") > -1) return;

        var dash1 = currentText.substring(5, 6);
        if (dash1 != "-") {
            var firstPart1 = currentText.substring(0, 5);
            var restPart1 = currentText.substring(5, currentText.length);

            firstPart1 = firstPart1.replace("-", "");

            firstPart = firstPart1 + "-" + restPart1;

            var startPos = document.getElementById("txtPidKey").selectionStart;

            t.value = firstPart;
            t.value = t.value.replace("--", "-");

            document.getElementById("txtPidKey").selectionStart = startPos + 1;
            document.getElementById("txtPidKey").selectionEnd = startPos + 1;
        }
    }

    if (currentText.length > 11) {
        secondPart = currentText.substring(6, 11);
        if (secondPart.indexOf("-") > -1) return;

        var dash2 = currentText.substring(11, 12);
        if (dash2 != "-" & dash2 != "") {
            var firstPart2 = currentText.substring(11, 15);
            var restPart2 = currentText.substring(15, currentText.length);

            if (restPart2) {
                thirdPart = firstPart2 + "-" + restPart2;
            } else {
                thirdPart = firstPart2;
            }
            
            var startPos = document.getElementById("txtPidKey").selectionStart;
            
            t.value = firstPart + "-" + secondPart + "-" + thirdPart;
            t.value = t.value.replace("--", "-");

            document.getElementById("txtPidKey").selectionStart = startPos + 1;
            document.getElementById("txtPidKey").selectionEnd = startPos + 1;
        }
    }

    if (currentText.length > 17) {
        thirdPart = currentText.substring(12, 17);;
        if (thirdPart.indexOf("-") > -1) return;

        var dash3 = currentText.substring(17, 18);
        if (dash3 != "-" & dash3 != "") {
            var firstPart3 = currentText.substring(17, 21);
            var restPart3 = currentText.substring(21, currentText.length);

            if (restPart3) {
                fourthPart = firstPart3 + "-" + restPart3;
            } else {
                fourthPart = firstPart3;
            }

            var startPos = document.getElementById("txtPidKey").selectionStart;

            t.value = firstPart + "-" + secondPart + "-" + thirdPart + "-" + fourthPart;
            t.value = t.value.replace("--", "-");

            document.getElementById("txtPidKey").selectionStart = startPos + 1;
            document.getElementById("txtPidKey").selectionEnd = startPos + 1;
        }
    }

    if (currentText.length > 23) {
        fourthPart = currentText.substring(18, 23);;
        if (fourthPart.indexOf("-") > -1) return;

        var dash4 = currentText.substring(23, 24);
        if (dash4 != "-" & dash4 != "") {
            var firstPart4 = currentText.substring(23, 27);
            var restPart4 = currentText.substring(27, currentText.length);

            if (restPart4) {
                fifthPart = firstPart4 + "-" + restPart4;
            } else {
                fifthPart = firstPart4;
            }

            var startPos = document.getElementById("txtPidKey").selectionStart;

            t.value = firstPart + "-" + secondPart + "-" + thirdPart + "-" + fourthPart + "-" + fifthPart;
            t.value = t.value.replace("--", "-");

            document.getElementById("txtPidKey").selectionStart = startPos + 1;
            document.getElementById("txtPidKey").selectionEnd = startPos + 1;
        }
    }


   

}

function validatePackageGuid(t) {
    //if (!this.value.match(/[0-9]/)) {
    //    this.value = this.value.replace(/[^0-9]/g, '');
    //}

    var firstPart = "";
    var secondPart = "";
    var thirdPart = "";
    var fourthPart = "";
    var fifthPart = "";

    var currentText = t.value;

    if (currentText.indexOf("--") > -1) {
        var start = document.getElementById("txtPACKAGEGUID").selectionStart;
        var end = document.getElementById("txtPACKAGEGUID").selectionEnd;
        t.value = t.value.replace("--", "-");
        document.getElementById("txtPACKAGEGUID").selectionStart = start;
        document.getElementById("txtPACKAGEGUID").selectionEnd = end;
        return;
    }

    if (currentText.length > 8) {
        firstPart = currentText.substring(0, 8);
        if (firstPart.indexOf("-") > -1) return;

        var dash1 = currentText.substring(8, 9);
        if (dash1 != "-") {
            var firstPart1 = currentText.substring(0, 8);
            var restPart1 = currentText.substring(8, currentText.length);

            firstPart1 = firstPart1.replace("-", "");

            firstPart = firstPart1 + "-" + restPart1;

            var startPos = document.getElementById("txtPACKAGEGUID").selectionStart;

            t.value = firstPart;
            t.value = t.value.replace("--", "-");

            document.getElementById("txtPACKAGEGUID").selectionStart = startPos + 1;
            document.getElementById("txtPACKAGEGUID").selectionEnd = startPos + 1;
        }
    }

    if (currentText.length > 13) {
        secondPart = currentText.substring(9, 13);
        if (secondPart.indexOf("-") > -1) return;

        var dash2 = currentText.substring(13, 14);
        if (dash2 != "-" & dash2 != "") {
            var firstPart2 = currentText.substring(13, 17);
            var restPart2 = currentText.substring(17, currentText.length);

            if (restPart2) {
                thirdPart = firstPart2 + "-" + restPart2;
            } else {
                thirdPart = firstPart2;
            }

            var startPos = document.getElementById("txtPACKAGEGUID").selectionStart;

            t.value = firstPart + "-" + secondPart + "-" + thirdPart;
            t.value = t.value.replace("--", "-");

            document.getElementById("txtPACKAGEGUID").selectionStart = startPos + 1;
            document.getElementById("txtPACKAGEGUID").selectionEnd = startPos + 1;
        }
    }

    if (currentText.length > 18) {
        thirdPart = currentText.substring(14, 18);;
        if (thirdPart.indexOf("-") > -1) return;

        var dash3 = currentText.substring(18, 19);
        if (dash3 != "-" & dash3 != "") {
            var firstPart3 = currentText.substring(18, 22);
            var restPart3 = currentText.substring(22, currentText.length);

            if (restPart3) {
                fourthPart = firstPart3 + "-" + restPart3;
            } else {
                fourthPart = firstPart3;
            }

            var startPos = document.getElementById("txtPACKAGEGUID").selectionStart;

            t.value = firstPart + "-" + secondPart + "-" + thirdPart + "-" + fourthPart;
            t.value = t.value.replace("--", "-");

            document.getElementById("txtPACKAGEGUID").selectionStart = startPos + 1;
            document.getElementById("txtPACKAGEGUID").selectionEnd = startPos + 1;
        }
    }

    if (currentText.length > 23) {
        fourthPart = currentText.substring(19, 23);
        if (fourthPart.indexOf("-") > -1) return;

        var dash4 = currentText.substring(23, 24);
        if (dash4 != "-" & dash4 != "") {
            var firstPart4 = currentText.substring(23, 27);
            var restPart4 = currentText.substring(27, currentText.length);

            if (restPart4) {
                fifthPart = firstPart4 + "-" + restPart4;
            } else {
                fifthPart = firstPart4;
            }

            var startPos = document.getElementById("txtPACKAGEGUID").selectionStart;

            t.value = firstPart + "-" + secondPart + "-" + thirdPart + "-" + fourthPart + "-" + fifthPart;
            t.value = t.value.replace("--", "-");

            document.getElementById("txtPACKAGEGUID").selectionStart = startPos + 1;
            document.getElementById("txtPACKAGEGUID").selectionEnd = startPos + 1;
        }
    }




}


function changeSelectedLanguage() {
    var selectedProduct = $("#cbProduct").val();
    var selectLanguage = $("#cbLanguage").val();

    var xmlDoc = getXmlDocument();
            
    $("#btAddLanguage").prop("disabled", false);

    var addNode = null;
    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];
    }

    if (addNode) {
        var productNode = getProductNode(addNode, selectedProduct);

        var langNode = getLanguageNode(productNode, selectLanguage);
        if (langNode) {
            $("#btAddLanguage").prop("disabled", true);
        }
    }
}

function changeSelectedProduct() {
    var productId = $('#cbProduct').val();

    var xmlDoc = getXmlDocument();

    $("#txtPidKey").val("");

    var productCount = getAddProductCount(xmlDoc);
    if (productCount > 0) {
        var productNode = getProductNode(xmlDoc, productId);
        if (productNode) {
            $("#btAddProduct").text('Edit Product');
            $("#btRemoveProduct").prop("disabled", false);

            var pidKey = productNode.getAttribute("PIDKEY");
            if (pidKey) {
                $("#txtPidKey").val(pidKey);
            }

            var excludeApps = productNode.getElementsByTagName("ExcludeApp");
            if (excludeApps.length == 0) {
                $("#btRemoveExcludeApp").prop("disabled", true);
                $("select#cbExcludeApp").prop('selectedIndex', 0);
            } else {
                $("#btRemoveExcludeApp").prop("disabled", false);

                var excludeApp = excludeApps[0];
                if (excludeApp) {
                    $("#cbExcludeApp").val(excludeApp.getAttribute("ID"));
                }
            }

        } else {
            $("#btAddProduct").text('Add Product');
            //$("#btRemoveProduct").prop("disabled", true);
            $("#btRemoveExcludeApp").prop("disabled", true);
            $("select#cbExcludeApp").prop('selectedIndex', 0);
        }
    } else {
        $("#btRemoveProduct").prop("disabled", true);
    }

    var langCount = getLanguageNodeCount(xmlDoc, productId);
    $("#btRemoveLanguage").prop("disabled", !(langCount > 1));
}


function resizeWindow() {
    var bodyHeight = window.innerHeight;
    var bodyWidth = window.innerWidth;
    var leftPaneHeight = bodyHeight - 180;

    var rightPaneHeight = bodyHeight - 100;

    var scrollTop = $(window).scrollTop();
    if (scrollTop > 50) {
        rightPaneHeight = rightPaneHeight + 50;
    }

    $("#xmlText").height(rightPaneHeight - 90);

    setScrollBar();
}

function cacheNodes(xmlDoc) {
    var propertyNameList = ["Remove", "Display", "Logging", "Property", "Updates"];
    var nodeList = [];

    for (var p = 0; p < propertyNameList.length; p++) {
        var propertyName = propertyNameList[p];

        var nodes = xmlDoc.documentElement.getElementsByTagName(propertyName);
        if (nodes.length > 0) {
            var nodeCount = nodes.length;
            for (var n = 0; n < nodeCount; n++) {
                var propNode = xmlDoc.documentElement.getElementsByTagName(propertyName)[0];
                nodeList.push(propNode);
                xmlDoc.documentElement.removeChild(propNode);
            }
        }

    }

    return nodeList;
}

function readdNodes(xmlDoc, nodeList) {
    for (var t = 0; t < nodeList.length; t++) {
        var addPropNode = nodeList[t];
        xmlDoc.documentElement.appendChild(addPropNode);
    }
}

function odtAddProduct(xmlDoc) {
    var selectedProduct = $("#cbProduct").val();
    var selectBitness = $("#cbEdition").val();
    var selectVersion = $("#txtVersion").val();
    var selectSourcePath = $("#txtSourcePath").val();
    var selectLanguage = $("#cbLanguage").val();
    var selectPidKey = $("#txtPidKey").val();

    var addNode = xmlDoc.createElement("Add");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];
    } else {
        var nodeList = cacheNodes(xmlDoc);

        xmlDoc.documentElement.appendChild(addNode);

        readdNodes(xmlDoc, nodeList);
    }

    if (selectSourcePath) {
        addNode.setAttribute("SourcePath", selectSourcePath);
    } else {
        addNode.removeAttribute("SourcePath");
    }

    if (selectVersion) {
        addNode.setAttribute("Version", selectVersion);
    } else {
        addNode.removeAttribute("Version");
    }

    addNode.setAttribute("OfficeClientEdition", selectBitness);

    var productNode = getProductNode(addNode, selectedProduct);
    if (!(productNode)) {
        productNode = xmlDoc.createElement("Product");
        productNode.setAttribute("ID", selectedProduct);
        addNode.appendChild(productNode);
    }

    if (selectPidKey) {
        productNode.setAttribute("PIDKEY", selectPidKey);
    } else {
        productNode.removeAttribute("PIDKEY");
    }

    var langNode = getLanguageNode(productNode, selectLanguage);
    if (!(langNode)) {
        langNode = xmlDoc.createElement("Language");
        langNode.setAttribute("ID", selectLanguage);
        productNode.appendChild(langNode);
    }

    var removeNode = null;
    var removeNodes = xmlDoc.documentElement.getElementsByTagName("Remove");
    if (removeNodes.length > 0) {
        removeNode = xmlDoc.documentElement.getElementsByTagName("Remove")[0];
    }

    if (removeNode) {
        var existingRemoveProduct = checkForRemoveProductNode(xmlDoc, selectedProduct);
        if (existingRemoveProduct) {
            removeNode.removeChild(existingRemoveProduct);
        }

        if (removeNode.childElementCount == 0) {
            xmlDoc.documentElement.removeChild(removeNode);
        }
    }

    var productCount = getAddProductCount(xmlDoc);
    if (productCount == 0) {
        $("#btRemoveProduct").prop("disabled", true);
        $("#btAddLanguage").prop("disabled", true);
        $("#btRemoveLanguage").prop("disabled", true);
    } else {
        $("#btRemoveProduct").prop("disabled", false);
        $("#btAddLanguage").prop("disabled", true);
    }
}

function odtRemoveProduct(xmlDoc) {
    var selectedProduct = $("#cbProduct").val();

    var addNode = null;

    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];

        var productNode = getProductNode(addNode, selectedProduct);
        if (productNode) {
            addNode.removeChild(productNode);
        }

        var products = addNode.getElementsByTagName("Product");
        if (products.length == 0) {
            addNode.parentNode.removeChild(addNode);
        }
    }

    var productCount = getAddProductCount(xmlDoc);
    if (productCount == 0) {
        $("#btRemoveProduct").prop("disabled", true);
        $("#btAddLanguage").prop("disabled", true);
        $("#btRemoveLanguage").prop("disabled", true);
    } else {
        $("#btRemoveProduct").prop("disabled", false);
        $("#btAddLanguage").prop("disabled", false);
    }

    //$("#removeAllProducts").removeClass('btn-primary');
    //$("#removeSelectProducts").removeClass('btn-primary');
    //$("#removeAllProducts").removeClass('active');
    //$("#removeSelectProducts").removeClass('active');

    $("#btAddProduct").text('Add Product');
}


function odtAddLanguage(xmlDoc) {
    var selectedProduct = $("#cbProduct").val();
    var selectLanguage = $("#cbLanguage").val();

    var addNode = xmlDoc.createElement("Add");

    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];

        var productNode = getProductNode(addNode, selectedProduct);
        if (productNode) {
            var langNode = getLanguageNode(productNode, selectLanguage);
            if (!(langNode)) {

                var langs = productNode.getElementsByTagName("Language");
                var lastLang = langs[langs.length - 1];

                var langList = [];
                for (var p = 0; p < langs.length; p++) {
                    var langChkNode1 = langs[p];
                    langList.push(langChkNode1);
                }

                for (var l = 0; l < langs.length; l++) {
                    var langChkNode2 = langs[l];
                    productNode.removeChild(langChkNode2);
                }

                for (var t = 0; t < langList.length ; t++) {
                    var langChkNode = langList[t];
                    productNode.appendChild(langChkNode);
                }

                langNode = xmlDoc.createElement("Language");
                langNode.setAttribute("ID", selectLanguage);
                productNode.appendChild(langNode, lastLang);

                $("#btAddLanguage").prop("disabled", true);
            }
        }
    }

    var langCount = getLanguageNodeCount(xmlDoc, selectedProduct);
    $("#btRemoveLanguage").prop("disabled", !(langCount > 1));
}

function odtRemoveLanguage(xmlDoc) {
    var selectedProduct = $("#cbProduct").val();
    var selectLanguage = $("#cbLanguage").val();

    var addNode = null;

    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];

        var productNode = getProductNode(addNode, selectedProduct);
        if (productNode) {
            if (getLanguageNodeCount(xmlDoc, selectedProduct) > 1) {
                var langNode = getLanguageNode(productNode, selectLanguage);
                if (langNode) {
                    productNode.removeChild(langNode);
                    $("#btAddLanguage").prop("disabled", false);
                }
            }
        }
    }

    var langCount = getLanguageNodeCount(xmlDoc, selectedProduct);
    $("#btRemoveLanguage").prop("disabled", !(langCount > 1));
}


function odtAddRemoveLanguage(xmlDoc) {
    var selectedProduct = $("#cbRemoveProduct").val();
    var selectLanguage = $("#cbRemoveLanguage").val();

    var removeNode = xmlDoc.createElement("Remove");

    var nodes = xmlDoc.documentElement.getElementsByTagName("Remove");
    if (nodes.length > 0) {
        removeNode = xmlDoc.documentElement.getElementsByTagName("Remove")[0];

        var productNode = getProductNode(removeNode, selectedProduct);
        if (productNode) {
            var langNode = getLanguageNode(productNode, selectLanguage);
            if (!(langNode)) {

                var langs = productNode.getElementsByTagName("Language");
                var lastLang = langs[langs.length - 1];

                langNode = xmlDoc.createElement("Language");
                langNode.setAttribute("ID", selectLanguage);
                productNode.insertBefore(langNode, lastLang);
            }
        }
    }

    var langCount = getRemoveLanguageNodeCount(xmlDoc, selectedProduct);
    $("#btRemoveRemoveLanguage").prop("disabled", !(langCount > 1));
}

function odtRemoveRemoveLanguage(xmlDoc) {
    var selectedProduct = $("#cbRemoveProduct").val();
    var selectLanguage = $("#cbRemoveLanguage").val();

    var removeNode = null;

    var nodes = xmlDoc.documentElement.getElementsByTagName("Remove");
    if (nodes.length > 0) {
        removeNode = xmlDoc.documentElement.getElementsByTagName("Remove")[0];

        var productNode = getProductNode(removeNode, selectedProduct);
        if (productNode) {
            if (getRemoveLanguageNodeCount(xmlDoc, selectedProduct) > 1) {
                var langNode = getLanguageNode(productNode, selectLanguage);
                if (langNode) {
                    productNode.removeChild(langNode);
                }
            }
        }
    }

    var langCount = getRemoveLanguageNodeCount(xmlDoc, selectedProduct);
    $("#btRemoveLanguage").prop("disabled", !(langCount > 1));
}

function removeAllSections() {
    document.getElementById("btRemoveDisplay").click();
    document.getElementById("btRemoveExcludeApp").click();
    document.getElementById("btRemoveLanguage").click();
    document.getElementById("btRemoveLogging").click();
    document.getElementById("btRemoveProduct").click();
    document.getElementById("btRemoveProperties").click();
    document.getElementById("btRemoveRemoveLanguage").click();
    document.getElementById("btRemovesUpdates").click();
}


function odtToggleRemoveApp() {
    var $RemoveApp = $("#removeAllProducts")[0];
    if (!($RemoveApp.checked)) {
        $("#cbRemoveProduct").removeProp("disabled");
        $("#cbRemoveLanguage").removeProp("disabled");
    } else {
        $("#cbRemoveProduct").prop("disabled", "true");
        $("#cbRemoveLanguage").prop("disabled", "true");
    }
}

function odtAddRemoveApp(xmlDoc) {
    var selectedProduct = $("#cbRemoveProduct").val();
    var selectLanguage = $("#cbRemoveLanguage").val();

    var $removeAll = $("#removeAllProducts")[0];

    var removeNode = xmlDoc.createElement("Remove");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Remove");
    if (nodes.length > 0) {
        removeNode = xmlDoc.documentElement.getElementsByTagName("Remove")[0];
    } else {
        xmlDoc.documentElement.appendChild(removeNode);
    }

    var removeAll = $removeAll.checked;

    //var $removeSelect = $("#removeSelectProducts");
    //if ($removeSelect.hasClass('btn-primary')) {
    if(!removeAll){
        removeNode.removeAttribute("All");

        var productNode = getProductNode(removeNode, selectedProduct);
        if (!(productNode)) {
            productNode = xmlDoc.createElement("Product");
            productNode.setAttribute("ID", selectedProduct);
            removeNode.appendChild(productNode);
        }

        var langNode = getLanguageNode(productNode, selectLanguage);
        if (!(langNode)) {
            langNode = xmlDoc.createElement("Language");
            langNode.setAttribute("ID", selectLanguage);
            productNode.appendChild(langNode);
        }
    } else {
        removeAll = true;

        removeNode.setAttribute("All", "TRUE");
        if (removeNode.childElementCount > 0) {
            var products = removeNode.getElementsByTagName("Product");
            var prodLength = products.length;
            for (var v = 0; v < prodLength; v++) {
                removeNode.removeChild(products[0]);
            }
        }
    }

    var addNode = null;
    var addNodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (addNodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];
    }

    if (addNode) {
        var existingAddProduct = checkForAddProductNode(xmlDoc, selectedProduct);
        if (existingAddProduct) {
            addNode.removeChild(existingAddProduct);
        }

        if (addNode.childElementCount == 0 || removeAll) {
            xmlDoc.documentElement.removeChild(addNode);
        }
    }
}

function odtDeleteRemoveApp(xmlDoc) {
    var selectedProduct = $("#cbRemoveProduct").val();
    var selectLanguage = $("#cbRemoveLanguage").val();

    var removeNode = xmlDoc.createElement("Remove");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Remove");
    if (nodes.length > 0) {
        removeNode = xmlDoc.documentElement.getElementsByTagName("Remove")[0];
    } else {
        xmlDoc.documentElement.appendChild(removeNode);
    }

    var $removeSelect = $("#removeSelectProducts");
    if ($removeSelect.hasClass('btn-primary')) {
        removeNode.removeAttribute("All");

        var productNode = getProductNode(removeNode, selectedProduct);
        if (productNode) {

            removeNode.removeChild(productNode);
        }
    }

    var products = removeNode.getElementsByTagName("Product");
    if (products.length == 0) {
        removeNode.parentNode.removeChild(removeNode);
    }
}


function odtAddExcludeApp(xmlDoc) {
    var selectedProduct = $("#cbProduct").val();
    var selectExcludeApp = $("#cbExcludeApp").val();

    var addNode = null;

    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];

        var productNode = getProductNode(addNode, selectedProduct);
        if (productNode) {
            var exNode = getExcludeAppNode(productNode, selectExcludeApp);
            if (!(exNode)) {
                var excludeApps = productNode.getElementsByTagName("ExcludeApp");
                var excludeNode = excludeApps[excludeApps.length - 1];

                exNode = xmlDoc.createElement("ExcludeApp");
                exNode.setAttribute("ID", selectExcludeApp);

                if (excludeNode) {
                    productNode.insertBefore(exNode, excludeNode);
                } else {
                    productNode.appendChild(exNode);
                }
            }
        }
    }

    var exCount = getExcludeAppNodeCount(xmlDoc, selectedProduct);
    $("#btRemoveExcludeApp").prop("disabled", !(exCount > 0));
}

function odtRemoveExcludeApp(xmlDoc) {
    var selectedProduct = $("#cbProduct").val();
    var selectExcludeApp = $("#cbExcludeApp").val();

    var addNode = null;

    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];

        var productNode = getProductNode(addNode, selectedProduct);
        if (productNode) {
            if (getExcludeAppNodeCount(xmlDoc, selectedProduct) > 0) {
                var exNode = getExcludeAppNode(productNode, selectExcludeApp);
                if (exNode) {
                    productNode.removeChild(exNode);
                }
            }
        }
    }

    var langCount = getExcludeAppNodeCount(xmlDoc, selectedProduct);
    $("#btRemoveExcludeApp").prop("disabled", !(langCount > 0));
}


function getExcludeAppNode(excludeAppNode, selectedExcludeApp) {
    var exNode = null;
    var excludeApps = excludeAppNode.getElementsByTagName("ExcludeApp");
    for (var i = 0; i < excludeApps.length; i++) //looping xml childnodes
    {
        var excludeApp = excludeApps[i];
        var excludeAppId = excludeApp.getAttribute("ID");

        if (excludeAppId == selectedExcludeApp) {
            exNode = excludeApp;
        }
    }
    return exNode;
}

function getExcludeAppNodeCount(xmlDoc, productId) {
    var addNode = xmlDoc.createElement("Add");

    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];

        var productNode = getProductNode(addNode, productId);
        if (productNode) {
            var excludeApps = productNode.getElementsByTagName("ExcludeApp");
            return excludeApps.length;
        }
    }

    return 0;
}


function odtToggleUpdate() {
    var $UpdatesEnabled = $("#updatesEnabled")[0];
    if ($UpdatesEnabled.checked) {
        $("#txtUpdatePath").removeProp("disabled");
        $("#txtTargetVersion").removeProp("disabled");
        $('#txtDeadline').removeProp("disabled");
    } else {
        $("#txtUpdatePath").prop("disabled", "true");
        $("#txtTargetVersion").prop("disabled", "true");
        $('#txtDeadline').prop("disabled", "true");
    }
}

function odtSaveUpdates(xmlDoc) {
    var selectUpdatePath = $("#txtUpdatePath").val();
    var selectTargetVersion = $("#txtTargetVersion").val();
    var date = $('#txtDeadline').val();
    var $UpdatesEnabled = $("#updatesEnabled")[0];
    if (date) {
        date = new Date(date);
        var options = {
            year: "numeric", month: "2-digit",
            day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false
        };
        var selectedDate = date.toLocaleString("en-us", options);//.format("MM/DD/YYYY HH:mm");
    }

    var updateNode = xmlDoc.createElement("Updates");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Updates");
    if (nodes.length > 0) {
        updateNode = xmlDoc.documentElement.getElementsByTagName("Updates")[0];
    } else {
        xmlDoc.documentElement.appendChild(updateNode);
    }

    if (selectUpdatePath) {
        updateNode.setAttribute("UpdatePath", selectUpdatePath);
    } else {
        updateNode.removeAttribute("UpdatePath");
    }

    if (selectTargetVersion) {
        updateNode.setAttribute("TargetVersion", selectTargetVersion);
    } else {
        updateNode.removeAttribute("TargetVersion");
    }

    if (selectedDate) {
        updateNode.setAttribute("Deadline", selectedDate);
    } else {
        updateNode.removeAttribute("Deadline");
    }

    if ($UpdatesEnabled.checked) {
        updateNode.setAttribute("Enabled", "TRUE");
    } else {
        updateNode.setAttribute("Enabled", "FALSE");
        updateNode.removeAttribute("UpdatePath");
        updateNode.removeAttribute("TargetVersion");
        updateNode.removeAttribute("Deadline");
    }
}

function odtRemoveUpdates(xmlDoc) {
    var addNode = xmlDoc.createElement("Updates");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Updates");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Updates")[0];
        if (addNode) {
            xmlDoc.documentElement.removeChild(addNode);
        }
    }

    $("#updatesEnabled")[0].checked = false;
    odtToggleUpdate();
}


function odtSaveDisplay(xmlDoc) {
    var addNode = xmlDoc.createElement("Display");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Display");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Display")[0];
    } else {
        xmlDoc.documentElement.appendChild(addNode);
    }

    var $displayLevel = $("#displayLevel")[0];
    var $AcceptEula = $("#acceptEULA")[0];

    if ($displayLevel.checked) {
        addNode.setAttribute("Level", "Full");
    } else {
        addNode.setAttribute("Level", "None");
    }
    
    if ($AcceptEula.checked) {
        addNode.setAttribute("AcceptEULA", "TRUE");
    } else {
        addNode.setAttribute("AcceptEULA", "FALSE");
    }
    
}

function odtRemoveDisplay(xmlDoc) {
    var addNode = xmlDoc.createElement("Display");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Display");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Display")[0];
        if (addNode) {
            xmlDoc.documentElement.removeChild(addNode);
        }
    }

    $("#btLevelNone").removeClass('btn-primary');
    $("#btLevelFull").removeClass('btn-primary');
    $("#btLevelNone").removeClass('active');
    $("#btLevelFull").removeClass('active');

    $("#btAcceptEULAEnabled").removeClass('btn-primary');
    $("#btAcceptEULAEnabled").removeClass('active');
    $("#btAcceptEULADisabled").removeClass('btn-primary');
    $("#btAcceptEULADisabled").removeClass('active');
}


function odtSaveProperties(xmlDoc) {
    var autoActivateNode = null;
    var forceShutDownNode = null;
    var sharedComputerLicensingNode = null;
    var packageguidNode = null;

    var nodes = xmlDoc.documentElement.getElementsByTagName("Property");
    if (nodes.length > 0) {
        for (var n = 0; n < nodes.length; n++) {
            propNode = xmlDoc.documentElement.getElementsByTagName("Property")[n];
            if (propNode) {
                var attrValue = propNode.getAttribute("Name");
                if (attrValue) {
                    if (propNode.getAttribute("Name").toUpperCase() == "AUTOACTIVATE") {
                        autoActivateNode = propNode;
                    }
                    if (propNode.getAttribute("Name").toUpperCase() == "FORCEAPPSHUTDOWN") {
                        forceShutDownNode = propNode;
                    }
                    if (propNode.getAttribute("Name").toUpperCase() == "SHAREDCOMPUTERLICENSING") {
                        sharedComputerLicensingNode = propNode;
                    }
                    if (propNode.getAttribute("Name").toUpperCase() == "PACKAGEGUID") {
                        packageguidNode = propNode;
                    }
                }
            }
        }
    }

    var $AutoActivate = $("#autoActivate")[0];
    var $ForceAppShutdown = $("#forceAppShutdown")[0];
    var $SharedComputerLicensing = $("#sharedComputerLicensing")[0];

    var packageguidVal = $("#txtPACKAGEGUID").val();
    if (packageguidVal) {
        if (packageguidVal.length > 0) {
            if (IsGuid(packageguidVal)) {
                if (!(packageguidNode)) {
                    packageguidNode = xmlDoc.createElement("Property");
                    xmlDoc.documentElement.appendChild(packageguidNode);
                }

                packageguidNode.setAttribute("Name", "PACKAGEGUID");
                packageguidNode.setAttribute("Value", packageguidVal);
            }
        }   
    }

    if (!(autoActivateNode)) {
        autoActivateNode = xmlDoc.createElement("Property");
        xmlDoc.documentElement.appendChild(autoActivateNode);
    }

    if ($AutoActivate.checked) {
        autoActivateNode.setAttribute("Name", "AUTOACTIVATE");
        autoActivateNode.setAttribute("Value", "1");
    } else {
        autoActivateNode.setAttribute("Name", "AUTOACTIVATE");
        autoActivateNode.setAttribute("Value", "0");
    }

    if (!(forceShutDownNode)) {
        forceShutDownNode = xmlDoc.createElement("Property");
        xmlDoc.documentElement.appendChild(forceShutDownNode);
    }

    if ($ForceAppShutdown.checked) {
        forceShutDownNode.setAttribute("Name", "FORCEAPPSHUTDOWN");
        forceShutDownNode.setAttribute("Value", "TRUE");
    } else {
        forceShutDownNode.setAttribute("Name", "FORCEAPPSHUTDOWN");
        forceShutDownNode.setAttribute("Value", "FALSE");
    }

    if (!(sharedComputerLicensingNode)) {
        sharedComputerLicensingNode = xmlDoc.createElement("Property");
        xmlDoc.documentElement.appendChild(sharedComputerLicensingNode);
    }

    if ($SharedComputerLicensing.checked) {
        sharedComputerLicensingNode.setAttribute("Name", "SharedComputerLicensing");
        sharedComputerLicensingNode.setAttribute("Value", "1");
    } else {
        sharedComputerLicensingNode.setAttribute("Name", "SharedComputerLicensing");
        sharedComputerLicensingNode.setAttribute("Value", "0");
    }
}

function odtRemoveProperties(xmlDoc) {
    var propNode = null;
    var nodes = xmlDoc.documentElement.getElementsByTagName("Property");
    if (nodes.length > 0) {
        var nodeCount = nodes.length;
        for (var n = 0; n < nodeCount; n++) {
            propNode = xmlDoc.documentElement.getElementsByTagName("Property")[0];
            if (propNode) {
                xmlDoc.documentElement.removeChild(propNode);
            }
        }
    }

    $("#btAutoActivateYes").removeClass('btn-primary');
    $("#btAutoActivateNo").removeClass('btn-primary');
    $("#btAutoActivateYes").removeClass('active');
    $("#btAutoActivateNo").removeClass('active');

    $("#btForceAppShutdownTrue").removeClass('btn-primary');
    $("#btForceAppShutdownTrue").removeClass('active');
    $("#btForceAppShutdownFalse").removeClass('btn-primary');
    $("#btForceAppShutdownFalse").removeClass('active');

    $("#btSharedComputerLicensingYes").removeClass('btn-primary');
    $("#btSharedComputerLicensingYes").removeClass('active');
    $("#btSharedComputerLicensingNo").removeClass('btn-primary');
    $("#btSharedComputerLicensingNo").removeClass('active');
}


function odtToggleLogging() {
    var $loggingLevel = $("#loggingLevel")[0];
    if ($loggingLevel.checked) {
        $("#txtLoggingUpdatePath").removeProp("disabled");
    } else {
        $("#txtLoggingUpdatePath").prop("disabled", "true");
    }
}

function odtSaveLogging(xmlDoc) {
    var loggingUpdatePath = $("#txtLoggingUpdatePath").val();
    var $loggingLevel = $("#loggingLevel")[0];

    var addNode = xmlDoc.createElement("Logging");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Logging");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Logging")[0];
    } else {
        xmlDoc.documentElement.appendChild(addNode);
    }

    if ($loggingLevel.checked) {
        addNode.setAttribute("Level", "Standard");

        if (loggingUpdatePath) {
            addNode.setAttribute("Path", loggingUpdatePath);
        }
    } else {
        addNode.setAttribute("Level", "Off");
        addNode.removeAttribute("Path");
    }
}

function odtRemoveLogging(xmlDoc) {
    var addNode = xmlDoc.createElement("Logging");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Logging");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Logging")[0];
        if (addNode) {
            xmlDoc.documentElement.removeChild(addNode);
        }
    }
    var $loggingLevel = $("#loggingLevel")[0];
    $loggingLevel.checked = false;
    odtToggleLogging();
}


function getProductNode(addNode, selectedProduct) {
    var productNode = null;
    var products = addNode.getElementsByTagName("Product");
    for (var i = 0; i < products.length; i++) //looping xml childnodes
    {
        var product = products[i];
        var productId = product.getAttribute("ID");

        if (productId == selectedProduct) {
            productNode = product;
        }
    }
    return productNode;
}

function getAddProductCount(xmlDoc) {
    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        var addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];

        var products = addNode.getElementsByTagName("Product");
        return products.length;
    }
    return 0;
}

function checkForAddProductNode(xmlDoc, selectedProduct) {
    var addNode = xmlDoc.createElement("Add");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];
    } else {
        xmlDoc.documentElement.appendChild(addNode);
    }

    var productNode = getProductNode(addNode, selectedProduct);
    return productNode;
}

function checkForRemoveProductNode(xmlDoc, selectedProduct) {
    var removeNode = xmlDoc.createElement("Remove");
    var nodes = xmlDoc.documentElement.getElementsByTagName("Remove");
    if (nodes.length > 0) {
        removeNode = xmlDoc.documentElement.getElementsByTagName("Remove")[0];
    } else {
        xmlDoc.documentElement.appendChild(removeNode);
    }

    var productNode = getProductNode(removeNode, selectedProduct);
    return productNode;
}



function getLanguageNode(productNode, selectedLanguage) {
    var langNode = null;
    var languages = productNode.getElementsByTagName("Language");
    for (var i = 0; i < languages.length; i++) //looping xml childnodes
    {
        var language = languages[i];
        var languageId = language.getAttribute("ID");

        if (languageId == selectedLanguage) {
            langNode = language;
        }
    }
    return langNode;
}

function getLanguageNodeCount(xmlDoc, productId) {
    var addNode = xmlDoc.createElement("Add");

    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];

        var productNode = getProductNode(addNode, productId);
        if (productNode) {
            var languages = productNode.getElementsByTagName("Language");
            return languages.length;
        }
    }

    return 0;
}

function getRemoveLanguageNodeCount(xmlDoc, productId) {
    var addNode = xmlDoc.createElement("Remove");

    var nodes = xmlDoc.documentElement.getElementsByTagName("Remove");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Remove")[0];

        var productNode = getProductNode(addNode, productId);
        if (productNode) {
            var languages = productNode.getElementsByTagName("Language");
            return languages.length;
        }
    }

    return 0;
}


function loadUploadXmlFile(inXmlDoc) {
    var xmlDoc = inXmlDoc;
    if (!(xmlDoc)) {
        xmlDoc = getXmlDocument();
    }

    var addNode = null;
    var nodes = xmlDoc.documentElement.getElementsByTagName("Add");
    if (nodes.length > 0) {
        addNode = xmlDoc.documentElement.getElementsByTagName("Add")[0];

        var selectBitness = addNode.getAttribute("OfficeClientEdition");
        $("#cbEdition").val(selectBitness);

        var products = addNode.getElementsByTagName("Product");
        if (products.length > 0) {
            var product = products[0];
            var productId = product.getAttribute("ID");

            $("#cbProduct").val(productId);

            var pidKey = product.getAttribute("PIDKEY");
            $("#txtPidKey").val(pidKey);

            var exApps = product.getElementsByTagName("ExcludeApp");
            if (exApps.length > 0) {
                var exApp = exApps[0];
                var excludeAppId = exApp.getAttribute("ID");
                $("#cbExcludeApp").val(excludeAppId);

                $("#btRemoveExcludeApp").prop("disabled", false);
            } else {
                $("#btRemoveExcludeApp").prop("disabled", true);
            }
        }

        var version = addNode.getAttribute("Version");
        $("#txtVersion").val(version);

        var version = addNode.getAttribute("SourcePath");
        $("#txtSourcePath").val(version);
    }

    var removeNode = null;
    var remvoeNodes = xmlDoc.documentElement.getElementsByTagName("Remove");
    if (remvoeNodes.length > 0) {
        removeNode = xmlDoc.documentElement.getElementsByTagName("Remove")[0];
        if (removeNode) {
            var removeProducts = removeNode.getElementsByTagName("Product");
            if (removeProducts.length > 0) {
                var removeproduct = removeProducts[0];
                var removeproductId = removeproduct.getAttribute("ID");

                $("#cbRemoveProduct").val(removeproductId);

                var removeLangs = removeproduct.getElementsByTagName("Language");
                if (removeLangs.length > 0) {
                    var removeLangId = removeLangs[0].getAttribute("ID");
                    $("#cbRemoveLanguage").val(removeLangId);
                }

                $("#removeAllProducts")[0].checked = false;
            } else {
                $("#removeAllProducts")[0].checked = true;
            }
            odtToggleRemoveApp();
        }
    }

    var updateNodes = xmlDoc.documentElement.getElementsByTagName("Updates");
    if (updateNodes.length > 0) {
        var updateNode = xmlDoc.documentElement.getElementsByTagName("Updates")[0];

        var updatesEnabled = updateNode.getAttribute("Enabled");
        var selectUpdatePath = updateNode.getAttribute("UpdatePath");
        var selectTargetVersion = updateNode.getAttribute("TargetVersion");
        var selectDeadline = updateNode.getAttribute("Deadline");

        if (updatesEnabled == "TRUE") {
            $("#updatesEnabled")[0].checked = true;
            $("#txtUpdatePath").val(selectUpdatePath);
            $("#txtTargetVersion").val(selectTargetVersion);
            $("#txtDeadline").val(selectDeadline);
        } else {
            $("#updatesEnabled")[0].checked = false;
            $("#txtUpdatePath").val("");
            $("#txtTargetVersion").val("");
            $("#txtDeadline").val("");
        }
        odtToggleUpdate();
    }

    var displayNodes = xmlDoc.documentElement.getElementsByTagName("Display");
    if (displayNodes.length > 0) {
        var displayNode = xmlDoc.documentElement.getElementsByTagName("Display")[0];

        var logLevel = displayNode.getAttribute("Level");
        var acceptEula = displayNode.getAttribute("AcceptEULA");

        if (logLevel == "None") {
            $("#displayLevel")[0].checked = false;
        } else {
            $("#displayLevel")[0].checked = true;
        }

        if (acceptEula == "TRUE") {
            $("#acceptEULA")[0].checked = true;
        } else {
            $("#acceptEULA")[0].checked = false;
        }
    }

    var propertyNodes = xmlDoc.documentElement.getElementsByTagName("Property");
    if (propertyNodes.length > 0) {
        var autoActivateNode = null;
        var forceShutDownNode = null;
        var sharedComputerLicensingNode = null;
        var packageguidNode = null;

        nodes = xmlDoc.documentElement.getElementsByTagName("Property");
        if (nodes.length > 0) {
            for (var n = 0; n < nodes.length; n++) {
                var propNode = xmlDoc.documentElement.getElementsByTagName("Property")[n];
                if (propNode) {
                    var attrValue = propNode.getAttribute("Name");
                    if (attrValue) {
                        if (propNode.getAttribute("Name").toUpperCase() == "AUTOACTIVATE") {
                            autoActivateNode = propNode;
                        }
                        if (propNode.getAttribute("Name").toUpperCase() == "FORCEAPPSHUTDOWN") {
                            forceShutDownNode = propNode;
                        }
                        if (propNode.getAttribute("Name").toUpperCase() == "SHAREDCOMPUTERLICENSING") {
                            sharedComputerLicensingNode = propNode;
                        }
                        if (propNode.getAttribute("Name").toUpperCase() == "PACKAGEGUID") {
                            packageguidNode = propNode;
                        }
                    }
                }
            }
        }

        var autoActivate = "";
        if (autoActivateNode) {
            autoActivate = autoActivateNode.getAttribute("Value");
        }

        var forceShutDown = "";
        if (forceShutDownNode) {
            forceShutDown = forceShutDownNode.getAttribute("Value");
        }

        var sharedComputerLicensing = "";
        if (sharedComputerLicensingNode) {
            sharedComputerLicensing = sharedComputerLicensingNode.getAttribute("Value");
        }

        var packageguid = "";
        if (packageguidNode) {
            packageguid = packageguidNode.getAttribute("Value");
        }

        if (packageguid) {
            if (packageguid.length > 0) {
                $("#txtPACKAGEGUID").val(packageguid);
            }
        }

        if (autoActivate == "1") {
            $("#autoActivate")[0].checked = true;
        } else {
            $("#autoActivate")[0].checked = false;
        }

        if (forceShutDown == "TRUE") {
            $("#forceAppShutdown")[0].checked = true;
        } else {
            $("#forceAppShutdown")[0].checked = false;
        }

        if (sharedComputerLicensing == "1") {
            $("#sharedComputerLicensing")[0].checked = true;
        } else {
            $("#sharedComputerLicensing")[0].checked = false;
        }
    } else {
        document.getElementById("btRemoveProduct").click();
    }

    var loggingNodes = xmlDoc.documentElement.getElementsByTagName("Logging");
    if (loggingNodes.length > 0) {
        var loggingNode = xmlDoc.documentElement.getElementsByTagName("Logging")[0];

        var logLevel = loggingNode.getAttribute("Level");
        var path = loggingNode.getAttribute("Path");

        if (logLevel == "Off") {
            $("#loggingLevel")[0].checked = false;
        } else {
            $("#loggingLevel")[0].checked = true;
        }
        odtToggleLogging();
        $("#txtLoggingUpdatePath").val(path);
    }

    var productCount = getAddProductCount(xmlDoc);
    if (productCount == 0) {
        $("#btRemoveProduct").prop("disabled", true);
    } else {
        $("#btRemoveProduct").prop("disabled", false);
    }

}

function sendMail() {
    var xmlSource = $('textarea#xmlText').val();

    var link = "mailto:"
             + "&subject=" + escape("Office Click-To-Run Configuration XML")
             + "&body=" + escape(xmlSource)
    ;

    window.location.href = link;
}


function clearXml() {
    $('textarea#xmlText').val("");
    $("#txtDeadline").val("");
    $("#txtLoggingUpdatePath").val("");
    $("#txtPidKey").val("");
    $("#txtSourcePath").val("");
    $("#txtTargetVersion").val("");
    $("#txtUpdatePath").val("");
    $("#txtVersion").val("");

    var resetDropDowns = document.getElementsByTagName("select");
    for (var t = 0; t < resetDropDowns.length; t++) {
        var dropDown = resetDropDowns[t];
        $("#" + dropDown.id).prop('selectedIndex', 0);
    }

    var resetToggles = $("input:checkbox");
    for (var t = 0; t < resetToggles.length; t++) {
        var toggle = resetToggles[t];
        $("#" + toggle.id)[0].checked = false;
    }

    odtToggleLogging();
    odtToggleRemoveApp();
    odtToggleUpdate();

    $.cookie("xmlcache", "");

    $("#btAddProduct").text('Add Product');
}

function getXmlDocument() {
    var xmlSource = $('textarea#xmlText').val();
    if (!(xmlSource)) {
        xmlSource = "<Configuration></Configuration>";
    }
    var xmlDoc = createXmlDocument(xmlSource);
    return xmlDoc;
}

function createXmlDocument(string) {
    var doc;
    if (window.DOMParser) {
        parser = new DOMParser();
        doc = parser.parseFromString(string, "application/xml");
    }
    else // Internet Explorer
    {
        doc = new ActiveXObject("Microsoft.XMLDOM");
        doc.async = "false";
        doc.loadXML(string);
    }
    return doc;
}

function displayXml(xmlDoc) {
    var xmlString = (new XMLSerializer().serializeToString(xmlDoc.documentElement));
    var xmlOutput = vkbeautify.xml(xmlString);
    $('textarea#xmlText').val(xmlOutput);
    $.cookie("xmlcache", xmlOutput);
}

function toggleTextBox(id, enabled) {
    if (enabled) {
        $("#" + id).prop("disabled", false);
        $("#" + id).css("background-color", "");
        $("#" + id).css("border-color", "");
    } else {
        $("#" + id).prop("disabled", true);
        $("#" + id).css("background-color", "#eeeeee");
        $("#" + id).css("border-color", "#e1e1e1");
    }
}

function toggleInfo(calloutId, icon) {
    var disp = $("#" + calloutId)[0].style.display;
    if (disp == "none") {
        showInfo(calloutId, icon);
    } else {
        hideInfo(calloutId);
    }
}

function showInfo(calloutId, icon) {
    var pos = $("#" + icon.id).position();
    var iconWidth = $("#" + icon.id).width();
    var iconHeight = $("#" + icon.id).height();
    var nTop = pos.top - 60;
    var nLeft = pos.left + iconWidth - 5;
    $("#" + calloutId)[0].style.top = nTop.toString() + "px";
    $("#" + calloutId)[0].style.left = nLeft.toString() + "px";
    $("#" + calloutId)[0].style.display = 'block';
}

function hideInfo(calloutId) {
    $("#" + calloutId)[0].style.display = 'none';
}

function showAbout() {
    $("#aboutDialog")[0].style.display = 'block';
}

function hideAbout() {
    $("#aboutDialog")[0].style.display = 'none';
}

function IsGuid(value) {
    var rGx = new RegExp("\\b(?:[A-F0-9]{8})(?:-[A-F0-9]{4}){3}-(?:[A-F0-9]{12})\\b");
    return rGx.exec(value) != null;
}

function setTemplate(template) {
    var url = document.getElementById(template.id).getAttribute("href");
        
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", url, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            var allText = rawFile.responseText;
            if (allText) {
                $('textarea#xmlText').val(allText);
                loadUploadXmlFile();
            }
        }
    }

    rawFile.send();

}

var versions = [
'15.0.4745.1001',
'15.0.4727.1003',
'15.0.4719.1002',
'15.0.4711.1003',
'15.0.4701.1002',
'15.0.4693.1002',
'15.0.4693.1001',
'15.0.4675.1002',
'15.0.4667.1002',
'15.0.4659.1001',
'15.0.4649.1003',
'15.0.4649.1001',
'15.0.4641.1003',
'15.0.4631.1004',
'15.0.4631.1002',
'15.0.4623.1003',
'15.0.4615.1002',
'15.0.4605.1003',
'15.0.4569.1508',
'15.0.4569.1507',
'15.0.4551.1512',
'15.0.4551.1011',
'15.0.4551.1005',
'15.0.4535.1511',
'15.0.4535.1004',
'15.0.4517.1509',
'15.0.4517.1005',
'15.0.4505.1510',
'15.0.4505.1006',
'15.0.4481.1510'
];
