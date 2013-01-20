(function( $, window, document, undefined ) {
	
	var ActiveMenu = {
		init: function(options) {
			
			// Set self
			var self = this;
			
			// Get and handle URL pathname
			self.pathname = window.location.pathname;
			self.pathname = self.split(self.pathname);
			self.pathname = self.cleanup(self.pathname);
			self.pathname = self.drop(self.pathname);
			
			// Get navigation container
			self.link = $(options.container).find('a');
			
			// Loop thru links and set 'avtive' class
			self.link.each(function() {
				self.set(this, options.parent, options.indicator);
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
		drop: function(array) {
			return $.each(array, function(key) {
				return array[key] = array[key].substr(0, array[key].lastIndexOf('.')) || array[key];
			});
		},
		set: function(link, parent, indicator) {
			
			// Set self, href value, element to add 'active' class
			var self = this,
				$link = $(link),
				href = $link.attr('href'),
				elem = (parent) ? $link.parent() : link;
			
			// Handle href pathname
			href = self.split(href);
			href = self.cleanup(href);
			href = self.drop(href);
			
			// Check for home link with or without 'index' in URL
			var withOutIndex = (href.length === 0 && self.pathname.length === 0),
				withIndex = (href.length === 0 && self.pathname.length === 1 && self.pathname[0] === 'index');
			
			// If home link with or without 'index' in URL append 'active' class
			if (withOutIndex || withIndex) {
				return elem.addClass(indicator);
			} else {
				// Get last element from href array
				var last = href[href.length-1];
				
				// Loop thru pathname array and if matches href array append 'active' class
				return $.each(self.pathname, function(key, value) {
					if (last === value) {
						return elem.addClass(indicator);
					}
				});
			}
		}
	};
	
	ActiveMenu.init({
		container: '.menu',
		parent: true,
		indicator: 'active'
	});

})( jQuery, window, document );