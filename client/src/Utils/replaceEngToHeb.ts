export const replaceEngToHeb = (categoryName:string)=>{
    let hebrewCategoryName;
    switch (categoryName) {
        case 'sport':
            hebrewCategoryName = 'ספורט';
            break;
        case 'food':
            hebrewCategoryName = 'אוכל';
            break;
        case 'play':
            hebrewCategoryName = 'לשחק';
            break;
        case 'dress':
            hebrewCategoryName = 'להתלבש';
            break;
        case 'clean':
            hebrewCategoryName = 'נקיון';
            break;
        default:
            hebrewCategoryName = 'לאכול';
            break;
    }
    return hebrewCategoryName;
}