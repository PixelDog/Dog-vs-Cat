This a fun Wordpress plugin that creates a voting system to answer the age old question: Dogs vs Cats!

On plugin activation, it creates a table in the WP database to track votes. The table is deleted on deactivation.

It's just for fun. The images are pulled from the public Flickr API. The images are not always accurate, it depends on how the user tagged the picture, but you get the picture :-) I've built in some filtering for very nasty tags which some Flickr users apply to what should otherwise be an innocent picture of a dog or a cat. Pictures and vote buttons are added automatically to ".entry-content" (see dog_vs_cat.js).

Tested with WP 5.8.1 and the stock Twenty Tweny-One theme. P.S. The Javascript is ES6 and has not been transpiled, so you will want to use a modern browser like the latest Chrome to test.
