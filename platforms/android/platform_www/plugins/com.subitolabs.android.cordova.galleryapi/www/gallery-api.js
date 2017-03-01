cordova.define("com.subitolabs.android.cordova.galleryapi.galleryAPI", function(require, exports, module) {

function GalleryAPI()
{
    
}

GalleryAPI.prototype.getAlbums = function(successCallback, errorCallback) {
    cordova.exec(
        successCallback,
        errorCallback,
        'GalleryAPI',
        'getAlbums',
        []
    );
};

GalleryAPI.prototype.getMedia = function(albumName, successCallback, errorCallback) {
    cordova.exec(
        successCallback,
        errorCallback,
        'GalleryAPI',
        'getMedia',
        [albumName]
    );
};

module.exports = new GalleryAPI();

});
