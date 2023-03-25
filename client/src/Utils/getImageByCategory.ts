export const getImageByCategory = (categoryName: string) => {
    let imageSource;
    switch (categoryName) {
        case 'play':
            imageSource = require('../../assets/play.png');
            break;
        case 'dress':
            imageSource = require('../../assets/dress.png');
            break;
        default:
            imageSource = require('../../assets/play.png');
            break;
    }
    return imageSource;
}