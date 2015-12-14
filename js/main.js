// TO ADD NEW PHOTOS, UPDATE THIS DICTIONARY.
// Note: Gallery names must correspond to folders directly.
// Minify with: http://refresh-sf.com/
var galleries = {
	"Street": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"],	
	"Portraits": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"],
};

var currentGalleryName = "";
var currentGalleryImageIndex = 0;
var $imageContainer;
var $portfolioElements;
var $loader;

$(document).ready(function(){
	var galleryNames = Object.keys(galleries);
	var $portfolio = $(".nav .portfolio");

	// Add portfolio gallery list
	var portfolioListMarkup = "<ul>";
	for (var i=0; i<galleryNames.length; i++) {
		portfolioListMarkup += "<li>" + galleryNames[i] + "</li>";
	}
	portfolioListMarkup += "</ul>";
	$portfolio.append(portfolioListMarkup);
	
	// Find elements
	$portfolioElements = $(".nav .portfolio li");
	$imageContainer = $(".gallery img");
	$loader = $(".loader");	
	
	$imageContainer.load(function() {
		hideLoader();
	});

	// Setup click handlers
	$portfolioElements.click(function() {
		var galleryName = $(this).text();
		gotoImage(galleryName, 0);
	});
	$("#prev-control").click(gotoPrev);
	$("#next-control").click(gotoNext);

	// Initialize with first image
	gotoImage(galleryNames[0], 0);
});

var showLoader = function() {
	$loader.show();
}

var hideLoader = function() {
	$loader.hide();
}

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
	showLoader();
	$imageContainer.attr("src", imageSrc);
}
