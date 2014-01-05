// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require_tree .


/*
* EASYDROPDOWN - A Drop-down Builder for Styleable Inputs and Menus
* Version: 2.1.3
* License: Creative Commons Attribution 3.0 Unported - CC BY 3.0
* http://creativecommons.org/licenses/by/3.0/
* This software may be used freely on commercial and non-commercial projects with attribution to the author/copyright holder.
* Author: Patrick Kunka
* Copyright 2013 Patrick Kunka, All Rights Reserved
*/

(function(d){function e(){this.isField=!0;this.keyboardMode=this.hasLabel=this.cutOff=this.disabled=this.inFocus=this.down=!1;this.nativeTouch=!0;this.wrapperClass="dropdown";this.onChange=null}e.prototype={constructor:e,instances:[],init:function(a,c){var b=this;d.extend(b,c);b.$select=d(a);b.id=a.id;b.options=[];b.$options=b.$select.find("option");b.isTouch="ontouchend"in document;b.$select.removeClass(b.wrapperClass+" dropdown");b.$select.is(":disabled")&&(b.disabled=!0);b.$options.length&&(b.$options.each(function(a){var c=
d(this);c.is(":selected")&&(b.selected={index:a,title:c.text()},b.focusIndex=a);c.hasClass("label")&&0==a?(b.hasLabel=!0,b.label=c.text(),c.attr("value","")):b.options.push({domNode:c[0],title:c.text(),value:c.val(),selected:c.is(":selected")})}),b.selected||(b.selected={index:0,title:b.$options.eq(0).text()},b.focusIndex=0),b.render())},render:function(){var a=this;a.$container=a.$select.wrap('<div class="'+a.wrapperClass+(a.isTouch&&a.nativeTouch?" touch":"")+(a.disabled?" disabled":"")+'"><span class="old"/></div>').parent().parent();
a.$active=d('<span class="selected">'+a.selected.title+"</span>").appendTo(a.$container);a.$carat=d('<span class="carat"/>').appendTo(a.$container);a.$scrollWrapper=d("<div><ul/></div>").appendTo(a.$container);a.$dropDown=a.$scrollWrapper.find("ul");a.$form=a.$container.closest("form");d.each(a.options,function(){a.$dropDown.append("<li"+(this.selected?' class="active"':"")+">"+this.title+"</li>")});a.$items=a.$dropDown.find("li");a.maxHeight=0;a.cutOff&&a.$items.length>a.cutOff&&a.$container.addClass("scrollable");
for(i=0;i<a.$items.length;i++){var c=a.$items.eq(i);a.maxHeight+=c.outerHeight();if(a.cutOff==i+1)break}a.isTouch&&a.nativeTouch?a.bindTouchHandlers():a.bindHandlers()},bindTouchHandlers:function(){var a=this;a.$container.on("click.easyDropDown",function(){a.$select.focus()});a.$select.on({change:function(){var c=d(this).find("option:selected"),b=c.text(),c=c.val();a.$active.text(b);"function"===typeof a.onChange&&a.onChange.call(a.$select[0],{title:b,value:c})},focus:function(){a.$container.addClass("focus")},
blur:function(){a.$container.removeClass("focus")}})},bindHandlers:function(){var a=this;a.query="";a.$container.on({"click.easyDropDown":function(){a.down||a.disabled?a.close():a.open()},"mousemove.easyDropDown":function(){a.keyboardMode&&(a.keyboardMode=!1)}});d("body").on("click.easyDropDown."+a.id,function(c){c=d(c.target);var b=a.wrapperClass.split(" ").join(".");!c.closest("."+b).length&&a.down&&a.close()});a.$items.on({"click.easyDropDown":function(){var c=d(this).index();a.select(c);a.$select.focus()},
"mouseover.easyDropDown":function(){if(!a.keyboardMode){var c=d(this);c.addClass("focus").siblings().removeClass("focus");a.focusIndex=c.index()}},"mouseout.easyDropDown":function(){a.keyboardMode||d(this).removeClass("focus")}});a.$select.on({"focus.easyDropDown":function(){a.$container.addClass("focus");a.inFocus=!0},"blur.easyDropDown":function(){a.$container.removeClass("focus");a.inFocus=!1},"keydown.easyDropDown":function(c){if(a.inFocus){a.keyboardMode=!0;var b=c.keyCode;if(38==b||40==b||32==
b)c.preventDefault(),38==b?(a.focusIndex--,a.focusIndex=0>a.focusIndex?a.$items.length-1:a.focusIndex):40==b&&(a.focusIndex++,a.focusIndex=a.focusIndex>a.$items.length-1?0:a.focusIndex),a.down||a.open(),a.$items.removeClass("focus").eq(a.focusIndex).addClass("focus"),a.cutOff&&a.scrollToView(),a.query="";if(a.down)if(9==b||27==b)a.close();else{if(13==b)return c.preventDefault(),a.select(a.focusIndex),a.close(),!1;if(8==b)return c.preventDefault(),a.query=a.query.slice(0,-1),a.search(),clearTimeout(a.resetQuery),
!1;38!=b&&40!=b&&(c=String.fromCharCode(b),a.query+=c,a.search(),clearTimeout(a.resetQuery))}}},"keyup.easyDropDown":function(){a.resetQuery=setTimeout(function(){a.query=""},1200)}});a.$dropDown.on("scroll.easyDropDown",function(c){a.$dropDown[0].scrollTop>=a.$dropDown[0].scrollHeight-a.maxHeight?a.$container.addClass("bottom"):a.$container.removeClass("bottom")});if(a.$form.length)a.$form.on("reset.easyDropDown",function(){a.$active.text(a.hasLabel?a.label:a.options[0].title)})},unbindHandlers:function(){this.$container.add(this.$select).add(this.$items).add(this.$form).add(this.$dropDown).off(".easyDropDown");
d("body").off("."+this.id)},open:function(){var a=window.scrollY||document.documentElement.scrollTop,c=window.scrollX||document.documentElement.scrollLeft,b=this.notInViewport(a);this.closeAll();this.$select.focus();window.scrollTo(c,a+b);this.$container.addClass("open");this.$scrollWrapper.css("height",this.maxHeight+"px");this.down=!0},close:function(){this.$container.removeClass("open");this.$scrollWrapper.css("height","0px");this.focusIndex=this.selected.index;this.query="";this.down=!1},closeAll:function(){var a=
Object.getPrototypeOf(this).instances,c;for(c in a)a[c].close()},select:function(a){"string"===typeof a&&(a=this.$select.find("option[value="+a+"]").index()-1);var c=this.options[a],b=this.hasLabel?a+1:a;this.$items.removeClass("active").eq(a).addClass("active");this.$active.text(c.title);this.$select.find("option").removeAttr("selected").eq(b).prop("selected",!0).parent().trigger("change");this.selected={index:a,title:c.title};this.focusIndex=i;"function"===typeof this.onChange&&this.onChange.call(this.$select[0],
{title:c.title,value:c.value})},search:function(){var a=this,c=function(b){a.focusIndex=b;a.$items.removeClass("focus").eq(a.focusIndex).addClass("focus");a.scrollToView()};for(i=0;i<a.options.length;i++){var b=a.options[i].title.toUpperCase();if(0==b.indexOf(a.query)){c(i);return}}for(i=0;i<a.options.length;i++)if(b=a.options[i].title.toUpperCase(),-1<b.indexOf(a.query)){c(i);break}},scrollToView:function(){if(this.focusIndex>=this.cutOff){var a=this.$items.eq(this.focusIndex).outerHeight()*(this.focusIndex+
1)-this.maxHeight;this.$dropDown.scrollTop(a)}},notInViewport:function(a){var c=a+(window.innerHeight||document.documentElement.clientHeight),b=this.$dropDown.offset().top+this.maxHeight;return b>=a&&b<=c?0:b-c+5},destroy:function(){this.unbindHandlers();this.$select.unwrap().siblings().remove();this.$select.unwrap();delete Object.getPrototypeOf(this).instances[this.$select[0].id]},disable:function(){this.disabled=!0;this.$container.addClass("disabled");this.$select.attr("disabled",!0);this.down||
this.close()},enable:function(){this.disabled=!1;this.$container.removeClass("disabled");this.$select.attr("disabled",!1)}};var f=function(a,c){a.id=a.id?a.id:"EasyDropDown"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6).toUpperCase();var b=new e;b.instances[a.id]||(b.instances[a.id]=b,b.init(a,c))};d.fn.easyDropDown=function(){var a=arguments,c=[],b;b=this.each(function(){if(a&&"string"===typeof a[0]){var b=e.prototype.instances[this.id][a[0]](a[1],a[2]);b&&c.push(b)}else f(this,a[0])});
return c.length?1<c.length?c:c[0]:b};d(function(){"function"!==typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"===typeof"test".__proto__?function(a){return a.__proto__}:function(a){return a.constructor.prototype});d("select.dropdown").each(function(){var a=d(this).attr("data-settings");settings=a?d.parseJSON(a):{};f(this,settings)})})})(jQuery);

(function(d){function e(){this.isField=!0;this.keyboardMode=this.hasLabel=this.cutOff=this.disabled=this.inFocus=this.down=!1;this.nativeTouch=!0;this.wrapperClass="dropdown";this.onChange=null}e.prototype={constructor:e,instances:[],init:function(a,c){var b=this;d.extend(b,c);b.$select=d(a);b.id=a.id;b.options=[];b.$options=b.$select.find("option");b.isTouch="ontouchend"in document;b.$select.removeClass(b.wrapperClass+" dropdown");b.$select.is(":disabled")&&(b.disabled=!0);b.$options.length&&(b.$options.each(function(a){var c=
d(this);c.is(":selected")&&(b.selected={index:a,title:c.text()},b.focusIndex=a);c.hasClass("label")&&0==a?(b.hasLabel=!0,b.label=c.text(),c.attr("value","")):b.options.push({domNode:c[0],title:c.text(),value:c.val(),selected:c.is(":selected")})}),b.selected||(b.selected={index:0,title:b.$options.eq(0).text()},b.focusIndex=0),b.render())},render:function(){var a=this;a.$container=a.$select.wrap('<div class="'+a.wrapperClass+(a.isTouch&&a.nativeTouch?" touch":"")+(a.disabled?" disabled":"")+'"><span class="old"/></div>').parent().parent();
a.$active=d('<span class="selected">'+a.selected.title+"</span>").appendTo(a.$container);a.$carat=d('<span class="carat"/>').appendTo(a.$container);a.$scrollWrapper=d("<div><ul/></div>").appendTo(a.$container);a.$dropDown=a.$scrollWrapper.find("ul");a.$form=a.$container.closest("form");d.each(a.options,function(){a.$dropDown.append("<li"+(this.selected?' class="active"':"")+">"+this.title+"</li>")});a.$items=a.$dropDown.find("li");a.maxHeight=0;a.cutOff&&a.$items.length>a.cutOff&&a.$container.addClass("scrollable");
for(i=0;i<a.$items.length;i++){var c=a.$items.eq(i);a.maxHeight+=c.outerHeight();if(a.cutOff==i+1)break}a.isTouch&&a.nativeTouch?a.bindTouchHandlers():a.bindHandlers()},bindTouchHandlers:function(){var a=this;a.$container.on("click.easyDropDown",function(){a.$select.focus()});a.$select.on({change:function(){var c=d(this).find("option:selected"),b=c.text(),c=c.val();a.$active.text(b);"function"===typeof a.onChange&&a.onChange.call(a.$select[0],{title:b,value:c})},focus:function(){a.$container.addClass("focus")},
blur:function(){a.$container.removeClass("focus")}})},bindHandlers:function(){var a=this;a.query="";a.$container.on({"click.easyDropDown":function(){a.down||a.disabled?a.close():a.open()},"mousemove.easyDropDown":function(){a.keyboardMode&&(a.keyboardMode=!1)}});d("body").on("click.easyDropDown."+a.id,function(c){c=d(c.target);var b=a.wrapperClass.split(" ").join(".");!c.closest("."+b).length&&a.down&&a.close()});a.$items.on({"click.easyDropDown":function(){var c=d(this).index();a.select(c);a.$select.focus()},
"mouseover.easyDropDown":function(){if(!a.keyboardMode){var c=d(this);c.addClass("focus").siblings().removeClass("focus");a.focusIndex=c.index()}},"mouseout.easyDropDown":function(){a.keyboardMode||d(this).removeClass("focus")}});a.$select.on({"focus.easyDropDown":function(){a.$container.addClass("focus");a.inFocus=!0},"blur.easyDropDown":function(){a.$container.removeClass("focus");a.inFocus=!1},"keydown.easyDropDown":function(c){if(a.inFocus){a.keyboardMode=!0;var b=c.keyCode;if(38==b||40==b||32==
b)c.preventDefault(),38==b?(a.focusIndex--,a.focusIndex=0>a.focusIndex?a.$items.length-1:a.focusIndex):40==b&&(a.focusIndex++,a.focusIndex=a.focusIndex>a.$items.length-1?0:a.focusIndex),a.down||a.open(),a.$items.removeClass("focus").eq(a.focusIndex).addClass("focus"),a.cutOff&&a.scrollToView(),a.query="";if(a.down)if(9==b||27==b)a.close();else{if(13==b)return c.preventDefault(),a.select(a.focusIndex),a.close(),!1;if(8==b)return c.preventDefault(),a.query=a.query.slice(0,-1),a.search(),clearTimeout(a.resetQuery),
!1;38!=b&&40!=b&&(c=String.fromCharCode(b),a.query+=c,a.search(),clearTimeout(a.resetQuery))}}},"keyup.easyDropDown":function(){a.resetQuery=setTimeout(function(){a.query=""},1200)}});a.$dropDown.on("scroll.easyDropDown",function(c){a.$dropDown[0].scrollTop>=a.$dropDown[0].scrollHeight-a.maxHeight?a.$container.addClass("bottom"):a.$container.removeClass("bottom")});if(a.$form.length)a.$form.on("reset.easyDropDown",function(){a.$active.text(a.hasLabel?a.label:a.options[0].title)})},unbindHandlers:function(){this.$container.add(this.$select).add(this.$items).add(this.$form).add(this.$dropDown).off(".easyDropDown");
d("body").off("."+this.id)},open:function(){var a=window.scrollY||document.documentElement.scrollTop,c=window.scrollX||document.documentElement.scrollLeft,b=this.notInViewport(a);this.closeAll();this.$select.focus();window.scrollTo(c,a+b);this.$container.addClass("open");this.$scrollWrapper.css("height",this.maxHeight+"px");this.down=!0},close:function(){this.$container.removeClass("open");this.$scrollWrapper.css("height","0px");this.focusIndex=this.selected.index;this.query="";this.down=!1},closeAll:function(){var a=
Object.getPrototypeOf(this).instances,c;for(c in a)a[c].close()},select:function(a){"string"===typeof a&&(a=this.$select.find("option[value="+a+"]").index()-1);var c=this.options[a],b=this.hasLabel?a+1:a;this.$items.removeClass("active").eq(a).addClass("active");this.$active.text(c.title);this.$select.find("option").removeAttr("selected").eq(b).prop("selected",!0).parent().trigger("change");this.selected={index:a,title:c.title};this.focusIndex=i;"function"===typeof this.onChange&&this.onChange.call(this.$select[0],
{title:c.title,value:c.value})},search:function(){var a=this,c=function(b){a.focusIndex=b;a.$items.removeClass("focus").eq(a.focusIndex).addClass("focus");a.scrollToView()};for(i=0;i<a.options.length;i++){var b=a.options[i].title.toUpperCase();if(0==b.indexOf(a.query)){c(i);return}}for(i=0;i<a.options.length;i++)if(b=a.options[i].title.toUpperCase(),-1<b.indexOf(a.query)){c(i);break}},scrollToView:function(){if(this.focusIndex>=this.cutOff){var a=this.$items.eq(this.focusIndex).outerHeight()*(this.focusIndex+
1)-this.maxHeight;this.$dropDown.scrollTop(a)}},notInViewport:function(a){var c=a+(window.innerHeight||document.documentElement.clientHeight),b=this.$dropDown.offset().top+this.maxHeight;return b>=a&&b<=c?0:b-c+5},destroy:function(){this.unbindHandlers();this.$select.unwrap().siblings().remove();this.$select.unwrap();delete Object.getPrototypeOf(this).instances[this.$select[0].id]},disable:function(){this.disabled=!0;this.$container.addClass("disabled");this.$select.attr("disabled",!0);this.down||
this.close()},enable:function(){this.disabled=!1;this.$container.removeClass("disabled");this.$select.attr("disabled",!1)}};var f=function(a,c){a.id=a.id?a.id:"EasyDropDown"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6).toUpperCase();var b=new e;b.instances[a.id]||(b.instances[a.id]=b,b.init(a,c))};d.fn.easyDropDown=function(){var a=arguments,c=[],b;b=this.each(function(){if(a&&"string"===typeof a[0]){var b=e.prototype.instances[this.id][a[0]](a[1],a[2]);b&&c.push(b)}else f(this,a[0])});
return c.length?1<c.length?c:c[0]:b};d(function(){"function"!==typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"===typeof"test".__proto__?function(a){return a.__proto__}:function(a){return a.constructor.prototype});d("select.date-dropdown").each(function(){var a=d(this).attr("data-settings");settings=a?d.parseJSON(a):{};f(this,settings)})})})(jQuery);



/* jshint -W098 */

/*
 * Chained - jQuery / Zepto chained selects plugin
 *
 * Copyright (c) 2010-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/chained
 *
 * Version: 0.9.8
 *
 */

;(function($, window, document, undefined) {
    "use strict";

    $.fn.chained = function(parent_selector, options) {

        var settings = $.extend( {}, $.fn.chained.defaults, options);

        return this.each(function() {

            /* Save this to self because this changes when scope changes. */
            var self   = this;
            var backup = $(self).clone();

            /* Handles maximum two parents now. */
            $(parent_selector).each(function() {

                $(this).bind("change", function() {
                    $(self).html(backup.html());

                    /* If multiple parents build classname like foo\bar. */
                    var selected = "";
                    $(parent_selector).each(function() {
                        if ($(":selected", this).val()) {
                            selected += "\\" + $(":selected", this).val();
                        }
                    });
                    selected = selected.substr(1);

                    /* Zepto class regexp dies with classes like foo\bar. */
                    if (window.Zepto) {
                        selected = selected.replace("\\", "\\\\");
                    }
                    /* Also check for first parent without subclassing. */
                    /* TODO: This should be dynamic and check for each parent */
                    /*       without subclassing. */
                    var first;
                    if ($.isArray(parent_selector)) {
                        first = $(parent_selector[0]).first();
                    } else {
                        first = $(parent_selector).first();
                    }
                    var selected_first = $(":selected", first).val();

                    $("option", self).each(function() {
                        /* Remove unneeded items but save the default value. */
                        if (!$(this).hasClass(selected) &&
                            !$(this).hasClass(selected_first) && $(this).val() !== "") {
                                $(this).remove();
                        }
                    });

                    /* If we have only the default value disable select. */
                    if (1 === $("option", self).size() && $(self).val() === "") {
                        $(self).attr("disabled", "disabled");
                    } else {
                        $(self).removeAttr("disabled");
                    }
                    $(self).trigger("change");
                });

                /* Force IE to see something selected on first page load, */
                /* unless something is already selected */
                if (!$("option:selected", this).length) {
                    $("option", this).first().attr("selected", "selected");
                }

                /* Force updating the children. */
                $(this).trigger("change");

            });
        });
    };

    /* Alias for those who like to use more English like syntax. */
    $.fn.chainedTo = $.fn.chained;

    /* Default settings for plugin. */
    $.fn.chained.defaults = {};

})(window.jQuery || window.Zepto, window, document);