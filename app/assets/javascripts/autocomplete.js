$.fn.autocomplete = function(input, options) {
	var substrings = [], regexps = [], matches = [];
	var self = this;
	var length = input.split(' ').length;

	for (i = 0; i < length; i++) {
		if (!ignoreWord(input.split(' ')[i]) && input.split(' ')[i].length > 2) {
			substrings.push(input.split(' ')[i]);
		}
	}

	for (i = 0; i < substrings.length; i++) {
		regexps.push(new RegExp(substrings[i], "gi"));
	}
	
	for (i = 0; i < options.length; i++) {
		for (j = 0; j < substrings.length; j++) {
			if (checkForMatch(options[i], regexps[j])) {
				getMatch(options[i], substrings[j], regexps[j]);
			}
		}
	}
	
	matches.sort(function(a, b) {
		return b.relevance - a.relevance;
	});
	
	return matches;
	
	function checkForMatch(object, regexp) {
		var match = object.title.match(regexp);
		
		if (match && match.length > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	function getMatch(object, string, regexp) {
		var match = object.title.match(regexp);
		var title = getTitle(object);
		var substring = title;
		var substring_index = 0;
		var string_index = [];
		
		for (k = 0; k < match.length; k++) {
			substring_index = substring.indexOf(match[k]);
			if (k > 0) {
				string_index.push(string_index[k - 1] + substring_index + match[k - 1].length);
			} else {
				string_index.push(substring_index);
			}
		   	substring = title.substring(string_index[k] + match[k].length);
		}
		
		for (k = 0; k < string_index.length; k++) {
			title = [
				title.slice(0, string_index[k] + (7 * k)), "<b>",
				title.slice(string_index[k] + (7 * k), string_index[k] + (7 * k) + match[k].length), "</b>",
				title.slice(string_index[k] + (7 * k) + match[k].length)
			].join('');
		} 

		if (matches.length > 0) {
			for (k = 0; k < matches.length; k++) {
				if (object.id === matches[k].id) {
					matches[k].title = title;
					matches[k].relevance = matches[k].relevance + match.length;
					return;
				}
			}
			matches.push({
				id: object.id,
				title: title,
				relevance: match.length
			});
		} else {
			matches.push({
				id: object.id,
				title: title,
				relevance: match.length
			});
		}
	}
	
	function getTitle(object) {
		if (matches.length > 0) {
			for (l = 0; l < matches.length; l++) {
				if (matches[l].id === object.id) {
					return matches[l].title;
				} 
			}			
		}
		return object.title;
	}
	
	function ignoreWord(string) {
		var words = [
			"the",
			"and",
			"a",
			"an",
			"to",
			"<b>",
			"</b>",
			"<",
			">",
			"/",
			"b",
			"",
			"(",
			")"
		];
		
		for (k = 0; k < words.length; k++) {
			if (string.toLowerCase() === words[k]) {
				return true;
			}
		}
		
		return false;
	}
}