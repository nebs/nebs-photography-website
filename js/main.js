// TO ADD NEW PHOTOS, UPDATE THIS DICTIONARY.
// Note: Gallery names must correspond to folders directly.
var galleries = {
	"People I": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"],
	"People II": ["9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"],
};

var currentGalleryName = "";
var currentGalleryImageIndex = 0;
var $imageContainer;
var $portfolioElements;

$(document).ready(function(){
	var galleryNames = Object.keys(galleries);
	var $portfolio = $(".nav .portfolio");

	var portfolioListMarkup = "<ul>";
	for (var i=0; i<galleryNames.length; i++) {
		portfolioListMarkup += "<li>" + galleryNames[i] + "</li>";
	}
	portfolioListMarkup += "</ul>";
	$portfolio.append(portfolioListMarkup);

	$portfolioElements = $(".nav .portfolio li");
	$imageContainer = $(".gallery img");

	$portfolioElements.click(function() {
		var galleryName = $(this).text();
		gotoImage(galleryName, 0);
	});

	$("#prev-control").click(gotoPrev);
	$("#next-control").click(gotoNext);

	gotoImage(galleryNames[0], 0);
});

var gotoNext = function() {
	var galleryImages = galleries[currentGalleryName];
	currentGalleryImageIndex++;
	if (currentGalleryImageIndex >= galleryImages.length) {
		currentGalleryImageIndex = 0;
	}
	gotoImage(currentGalleryName, currentGalleryImageIndex);
}

var gotoPrev = function() {
	var galleryImages = galleries[currentGalleryName];
	currentGalleryImageIndex--;
	if (currentGalleryImageIndex < 0) {
		currentGalleryImageIndex = galleryImages.length - 1;
	}
	gotoImage(currentGalleryName, currentGalleryImageIndex);
}

var gotoImage = function(galleryName, imageIndex) {
	var galleryImages = galleries[galleryName];

	if (imageIndex < 0 || imageIndex >= galleryImages.length) {
		return;
	}

	var imageName = galleryImages[imageIndex];
	var imageSrc = "assets/portfolio/" + galleryName + "/" + imageName;

	$portfolioElements.each(function() {
		if ($(this).text() == galleryName) {
			$(this).addClass("selected");
		} else {
			$(this).removeClass("selected");
		}
	});

	currentGalleryName = galleryName;
	currentGalleryImageIndex = imageIndex;
	$imageContainer.attr("src", imageSrc);
}
