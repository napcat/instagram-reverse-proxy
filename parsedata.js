exports.parse = function (data) 
{
	var instaposts = [];

	if (data)
	{
		data.data.forEach(post => 
		{
			/**
			 * Gets a default object with default values
			 */
			var instapost = getInstaObject();

			/**
			 * Set post id
			 */
			instapost.id = post.id;

			/**
			 * Parse images/thumbnails url and sizes
			 */
			post.thumbnail_resources.forEach(image =>
			{
				switch (image.config_width) 
				{
					case 150: 
						instapost.images.thumbnail.width  	= image.config_width;
						instapost.images.thumbnail.height 	= image.config_height;
						instapost.images.thumbnail.url		= image.src;
						break;
					case 320: 
						instapost.images.low_resolution.width	= image.config_width;
						instapost.images.low_resolution.height	= image.config_height;
						instapost.images.low_resolution.url 	= image.src;
					break;
					default: 
						instapost.images.standard_resolution.width 	= image.config_width;
						instapost.images.standard_resolution.height = image.config_height;
						instapost.images.standard_resolution.url 	= image.src;
						break;
				}
			});

			/**
			 * Set create time, date of the post in ms
			 */
			instapost.created_time = post.taken_at_timestamp;

			/**
			 * Set content of the instagram post
			 */
			post.edge_media_to_caption.edges.forEach(caption => 
			{
				instapost.caption.text += caption.node.text + " ";

				/**
			 	* Sets hashtags from captations
			 	*/
				instapost.tags = instapost.tags.concat(getHashTags(caption.node.text));
			});

			/**
			 * Keeps the other propertie at default values, there is no properties 
			 */
			instapost.caption.id;
			instapost.caption.created_time = post.taken_at_timestamp;
			instapost.caption.from.id;
			instapost.caption.from.full_name;
			instapost.caption.from.profile_picture;
			instapost.caption.from.username;

			/**
			 * Sets if user as liked post, property not availbale at this moment
			 */
			instapost.user_has_liked

			/**
			 * Sets likes count
			 */
			instapost.likes.count = post.edge_media_preview_like.count;

			
			/**
			 * Keeps the default value
			 */
			instapost.filter

			/**
			 * Sets comments counter
			 */
			instapost.comments.count = post.edge_media_to_comment.count;

			/**
			 * Sets post type
			 */
			instapost.type = post.__typename == "GraphImage" ? "image" : "video",

			instapost.link = "https://www.instagram.com/p/" + post.shortcode,

			/**
			 * Keeps default information, properties ate not available 
			 */
			instapost.location.latitude
			instapost.location.longitude
			instapost.location.name
			instapost.location.id

			/**
			 * Keeps default information, properties ate not available 
			 */
			instapost.attribution

			/**
			 * Keeps default information, properties ate not available 
			 */
			instapost.users_in_photo = [];

			instaposts.push(instapost);
		});
	}

	/**
	 * Update data object with parsed data objects
	 */
	data.data = instaposts;

	return data;
}

/**
 * Receives a string and search from hashtags starting # char.
 * Return an array of strings.
 * @param {*} string 
 */
var getHashTags = function (string) 
{
	var hashTags, i, len, word, words;

	words = string.split(/[\s\r\n]+/);
	hashTags = [];

	for (i = 0, len = words.length; i < len; i++)
	{
	  	word = words[i];
		if (word.indexOf('#') === 0) 
	  	{
			hashTags.push(word);
	  	}
	}

	return hashTags;
 };

 /**
  * Returns an object with properties to be set in the parsers.
  */
var getInstaObject = function()
{
	var instapost = 
	{
		id: "",
		user: 
		{
			id: "",
			full_name: "",
			profile_picture: "",
			username: ""
		},
		images: 
		{
			thumbnail: 
			{
				width: "",
				height: "",
				url: ""
			},
			low_resolution: 
			{
				width: "",
				height: "",
				url: ""
			},
			standard_resolution: 
			{
				width: "",
				height: "",
				url: ""
			}
		},
		created_time: "",
		caption: 
		{
			id: "",
			text: "",
			created_time: "",
			from: 
			{
				id: "",
				full_name: "",
				profile_picture: "",
				username: ""
			}
		},
		user_has_liked: false,
		likes: 
		{
			count: 0
		},
		tags: [],
		filter: "Normal",
		comments: 
		{
			"count": 0
		},
		type: "image",
		link: "",
		location: 
		{
			latitude: "",
			longitude: "",
			name: "",
			id: 0
		},
		attribution: null,
		users_in_photo: []
	}

	return instapost;
}
