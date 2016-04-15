import { HashtagCollection } from '../imports/api/hashtags.js';

SearchSource.defineSource('hashtags', function(searchText, options) {
    var options = {sort: {relevantPosts: -1}, limit: 20};
    
    // console.log("Search text -> "+searchText);

    if(searchText) {
        var regExp = buildRegExp(searchText);
        var selector = {text: regExp};
        // console.log("if clause");
        // console.log(HashtagCollection.find(selector, options).count());
        return HashtagCollection.find(selector, options).fetch();
    } else {
        // console.log("else clause");
        // console.log(HashtagCollection.find({}, options).count());
        return HashtagCollection.find({}, options).fetch();
    }
});


function buildRegExp(searchText) {
    var words = searchText.trim().split(/[ \-\:]+/);
    var exps = _.map(words, function(word) {
        return "(?=.*" + word + ")";
    });
    var fullExp = exps.join('') + ".+";
    return new RegExp(fullExp, "i");
}
