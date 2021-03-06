/*
  * active-menu.js
  * Author & copyright (c) 2013: Kris Olszewski
  * Dual MIT & GPL license
  *
  * Repo: https://github.com/KrisOlszewski/ActiveMenu/
  */
(function($, window, document, undefined) {
  if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
      function F() {}
      F.prototype = obj;
      return new F();
    };
  }
  var ActiveMenu = {
    init: function(options, container) {
      var self = this;
      self.options = $.extend({}, $.fn.setActiveMenu.options, options);
      self.pathname = window.location.pathname;
      self.pathname = self.split(self.pathname);
      self.pathname = self.cleanup(self.pathname);
      self.pathname = self.dropExtension(self.pathname);
      self.pathname = self.lowerCase(self.pathname);
      self.link = $(container).find('a');
      self.link.each(function() {
        self.setState(this);
      });
    },
    split: function(obj) {
      return obj.split("/");
    },
    cleanup: function(array) {
      return $.grep(array, function(value) {
        return value !== '';
      });
    },
    dropExtension: function(array) {
      return $.each(array, function(key) {
        return array[key] = array[key].substr(0, array[key].lastIndexOf('.')) || array[key];
      });
    },
    lowerCase: function(array) {
      return $.each(array, function(key) {
        return array[key] = array[key].toLowerCase();
      });	
    },
    setState: function(link) {
      var self = this,
      $link = $(link),
      href = $link.attr('href'),
      elem = (self.options.parent) ? $link.parent() : $link;
      if (href === undefined) { return; }
      href = self.split(href);
      href = self.cleanup(href);
      href = self.dropExtension(href);
      href = self.lowerCase(href);
      var withOutIndex = (href.length === 0 && self.pathname.length === 0),
      withIndex = (href.length === 0 && self.pathname.length === 1 && self.pathname[0] === 'index');
      if (withOutIndex || withIndex) {
        return elem.addClass(self.options.indicator);
      } else {
        var last = href[href.length-1];
        return $.each(self.pathname, function(key, value) {
          if (last === value) {
            return elem.addClass(self.options.indicator);
          }
        });
      }
    }
  };
  $.fn.setActiveMenu = function(options) {
    return this.each(function() {
      var activeMenu = Object.create(ActiveMenu);
      activeMenu.init(options, this);
    });
  };
  $.fn.setActiveMenu.options = {
    parent: true,
    indicator: 'active'
  };
})(jQuery, window, document);
