import { Category } from "../schemas/category.schema";

export interface CategoryWithItems extends Category {
    itemNames: string[]
};

export const categoriesWithItems: CategoryWithItems[] = [{
    name: 'לבוש',
    sentenceBeginning: 'אני רוצה ללבוש ',
    imageUrl: 'https://i.ibb.co/bB4TzqW/clothes.jpg',
    itemNames: ['חולצה', 'מכנס', 'שמלה', 'חצאית', 'נעלי ספורט', 'כובע מצחיה', 'מעיל', 'חגורה', 'צעיף', 'סוודר', 'בגדי ספורט', 'טייץ',
        'מגפיים', 'סנדלים', 'כפכפים', 'גרביון', 'גופיה', 'ז\'קט', 'כובע גרב', 'גרבים']
}, {
    name: 'רגשות',
    sentenceBeginning: 'אני מרגיש ',
    imageUrl: 'https://i.ibb.co/B4Vdk8P/emotions.jpg',
    itemNames: ['בלבול', 'רעב', 'עייפות', 'עצב', 'כעס', 'שנאה', 'אהבה', 'שמחה', 'יאוש', 'נחת', 'סיפוק', 'הצלחה']
}, {
    name: 'אוכל',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/qCKxqfs/food.jpg',
    itemNames: ['פיצה', 'המבורגר', 'קולה', 'בננה', 'גלידה', 'שוקולד', 'מלפפון', 'עגבניה', 'פלפל', 'אננס', 'תות', 'אפרסק', 'כריך'
        , 'חביתה', 'ביצה', 'קציצה', 'פסטה', 'אורז', 'פירה', 'פתיתים', 'סושי', 'נודלס', 'מים', 'מיץ', 'סודה', 'שניצל', 'בשר', 'קורנפלקס'
        , 'לחם', 'לחמניה', 'שוקו', 'חלב', 'שקשוקה', 'חומוס', 'סלט', 'גזר', 'תפוח', 'אגס', 'קינוח', 'עוגה', 'עוגיה', 'גבינה', 'טוסט']
}, {
    name: 'משחק',
    sentenceBeginning: 'אני רוצה לשחק ב',
    imageUrl: 'https://i.ibb.co/PNfDnJM/games.jpg',
    itemNames: ['כדורסל', 'כדורגל', 'לגו', 'פאזל', 'מחשב', 'בובות', 'קוביות', 'משחק קופסה', 'כדור', 'חברים', 'חול']
}, {
    name: 'היגיינה',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/Y7NQ03j/hygiene.jpg',
    itemNames: ['לנקות', 'להתקלח', 'לשטוף ידיים', 'לצחצח שיניים', 'שירותים']
}, {
    name: 'ספורט',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/SK6rnBQ/sport.jpg',
    itemNames: ['לשחק ', 'לשחק כדורגל', 'לשחק כדורסל', 'לרוץ', 'לקפוץ', 'להתעמל', 'לשחק כדורעף', 'לרקוד', 'לשחות', 'לרכב על אופניים']
}, {
    name: 'משפחה וחברים',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/Gn7QZfr/family.jpg',
    itemNames: ['סבתא', 'סבא', 'אחות', 'אח', 'אבא', 'אמא', 'חֲבֵרָה', 'חבר', 'דּוֹד', 'דודה', 'בן דּוֹד', 'בת דודה', 'אחיין', 'אחיינית']
}, {
    name: 'מקומות',
    sentenceBeginning: 'אני רוצה ללכת ל',
    imageUrl: 'https://i.ibb.co/XLdy7rp/locations.jpg',
    itemNames: ['בית', 'בית ספר', 'יער', 'חוג', 'משחקיה', 'קניון', 'מגרש', 'חברים', 'כיתה', 'קייטנה', 'סבא וסבתא', 'בריכה'
        , 'ים', 'גן חיות', 'פארק']
}, {
    name: 'לימודים',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/d2qNZXP/study.jpg',
    itemNames: ['מחק', 'עפרון', 'ספר', 'מספריים', 'מחברת', 'מורה', 'שיעור', 'הפסקה', 'מחדד', 'עט', 'צבעים', 'קלמר', 'תיק']
}, {
    name: 'צפייה',
    sentenceBeginning: 'אני רוצה לראות ',
    imageUrl: 'https://i.ibb.co/8cbj9VF/watch.jpg',
    itemNames: ['טלויזיה', 'סרט', 'סדרה', 'הופעה', 'כוכבים']
}, {
    name: 'שיחה',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg',
    itemNames: ['שלום', 'מה שלומך?', 'אני', 'אתה', 'את', 'אנחנו', 'רוצה?', 'יודע?', 'איפה?', 'מתי?', 'כמה?', 'למה?', 'מה?', 'להתראות']
}, {
    name: 'פעולות',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg',
    itemNames: ['ללכת לישון', 'לשחק', 'לנקות', 'ללכת', 'לטייל', 'לצייר', 'לנוח', 'לבשל', 'לשיר', 'לכתוב', 'לקנות']
}];

export const hardcodedImageUrls: Record<string, string> = {
    'איפה?': 'https://images.unsplash.com/photo-1535745122259-f1e187953c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHw0fHwlRDclOTAlRDclOTklRDclQTQlRDclOTR8aGV8MXx8fHwxNjg0Nzc0MjgzfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'אנחנו': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTZ8MHwxfHNlYXJjaHwyfHwlRDclOTAlRDclQTAlRDclOTclRDclQTAlRDclOTUlMjAlRDclOTklRDclOTclRDclOTN8aGV8MXx8fHwxNjg0Nzc0MjUwfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'למה?': 'https://images.unsplash.com/photo-1458419948946-19fb2cc296af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjExODJ8MHwxfHNlYXJjaHw0fHwlRDclOUMlRDclOUUlRDclOTR8aGV8MXx8fHwxNjg0Nzc0MTgxfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'מה שלומך?': 'https://images.unsplash.com/photo-1562618817-7a67fb3a9c33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTl8MHwxfHNlYXJjaHw0fHwlRDclOUUlRDclOTQlMjAlRDclQTklRDclOUMlRDclOTUlRDclOUUlRDclOUF8aGV8MXx8fHwxNjg0Nzc0MTM2fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'מתי?': 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHw2fHwlRDclOUUlRDclQUElRDclOTklMjAlRDclQTklRDclQTIlRDclOTR8aGV8MXx8fHwxNjg0Nzc0MTEzfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'מה?': 'https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTZ8MHwxfHNlYXJjaHwxfHwlRDclOUUlRDclOTR8aGV8MXx8fHwxNjg0Nzc0MDc2fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'כמה?': 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTF8MHwxfHNlYXJjaHwzfHwlRDclOUUlRDclQTElRDclQTQlRDclQTglRDclOTklRDclOUR8aGV8MXx8fHwxNjg0Nzc0MDE3fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'יודע?': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHwzfHwlRDclOTklRDclOTMlRDclQTJ8aGV8MXx8fHwxNjg0NzczODk5fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'אני': 'https://images.unsplash.com/photo-1567613398990-bd73db70b431?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTZ8MHwxfHNlYXJjaHw1fHwlRDclOTAlRDclQTAlRDclOTklMjAlRDclOTUlRDclOTAlRDclQTAlRDclOTUlRDclOUIlRDclOTl8aGV8MXx8fHwxNjg0NzczODUzfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'סנדלים': 'https://images.unsplash.com/photo-1628375385879-1af64230c2e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTF8MHwxfHNlYXJjaHw5fHwlRDclQTElRDclQTAlRDclOTMlRDclOUMlRDclOTklRDclOUR8aGV8MXx8fHwxNjg0NzczNjM0fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'טייץ': 'https://images.unsplash.com/photo-1600696491085-19dbbeb4f8c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjExODJ8MHwxfHNlYXJjaHwyfHwlRDclOTElRDclOTIlRDclOTMlRDclOTklMjAlRDclQTElRDclQTQlRDclOTUlRDclQTglRDclOTh8aGV8MXx8fHwxNjg0NzcwNzE4fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'כובע גרב': 'https://images.unsplash.com/photo-1674852001432-c1b132a327b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTZ8MHwxfHNlYXJjaHwxfHwlRDclOUIlRDclOTUlRDclOTElRDclQTIlMjAlRDclOTIlRDclQTglRDclOTElMjAlRDclQTIlRDclOUMlMjAlRDclQTglRDclOTAlRDclQTl8aGV8MXx8fHwxNjg0NzczNDQyfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'כפכפים': 'https://images.unsplash.com/photo-1501406606344-f28a12920fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjExODJ8MHwxfHNlYXJjaHwzfHwlRDclOUIlRDclQTQlRDclOUIlRDclQTQlRDclOTklRDclOUR8aGV8MXx8fHwxNjg0NzczMjgxfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'מים': 'https://images.unsplash.com/photo-1523362628745-0c100150b504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTl8MHwxfHNlYXJjaHwxfHwlRDclOTElRDclQTclRDclOTElRDclOTUlRDclQTclMjAlRDclOUUlRDclOTklRDclOUR8aGV8MXx8fHwxNjg0NzczMDE0fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'פתיתים': 'https://images.unsplash.com/photo-1556910148-3adb7f0c665a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTZ8MHwxfHNlYXJjaHw1fHwlRDclQTElRDclOTklRDclQTglMjAlRDclQTQlRDclQUElRDclOTklRDclQUElRDclOTklRDclOUR8aGV8MXx8fHwxNjg0NzcyODcwfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'פירה': 'https://images.unsplash.com/photo-1600984177310-c86c8f8fa9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTl8MHwxfHNlYXJjaHw0fHwlRDclQTQlRDclOTklRDclQTglRDclOTQlMjAlRDclQUElRDclQTQlRDclOTUlRDclOTclMjAlRDclOTAlRDclOTMlRDclOUUlRDclOTR8aGV8MXx8fHwxNjg0NzcyNzY3fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'סיפוק': 'https://images.unsplash.com/photo-1587837073080-448bc6a2329b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTZ8MHwxfHNlYXJjaHwzfHwlRDclQTQlRDclQTglRDclQTYlRDclOTUlRDclQTMlMjAlRDclQTklRDclOUMlMjAlRDclQTElRDclOTklRDclQTQlRDclOTUlRDclQTd8aGV8MXx8fHwxNjg0NzcyNjU0fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'נחת': 'https://images.unsplash.com/photo-1568341370472-153ce12bb2cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTF8MHwxfHNlYXJjaHwxfHwlRDclQTQlRDclQTglRDclQTYlRDclOTUlRDclQTMlMjAlRDclQTklRDclOUMlMjAlRDclQTAlRDclOTclRDclQUF8aGV8MXx8fHwxNjg0NzcyNjEzfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'אהבה': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHwzfHwlRDclOTAlRDclOTQlRDclOTElRDclOTR8aGV8MXx8fHwxNjg0NzcyNTI3fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'כדור': 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTF8MHwxfHNlYXJjaHw1fHwlRDclOUIlRDclOTMlRDclOTUlRDclQTglMjAlRDclOUUlRDclQTklRDclOTclRDclQTd8aGV8MXx8fHwxNjg0NzcyMzc2fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'אמא': 'https://images.unsplash.com/photo-1542385151-efd9000785a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTl8MHwxfHNlYXJjaHwzfHwlRDclOTAlRDclOUUlRDclOTB8aGV8MXx8fHwxNjg0NzcyMzE3fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'חבר': 'https://images.unsplash.com/photo-1522098635833-216c03d81fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHw0fHwlRDclOTclRDclOTElRDclQTh8aGV8MXx8fHwxNjg0NzcyMjc5fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'דּוֹד': 'https://images.unsplash.com/photo-1605812830455-2fadc55bc4ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTZ8MHwxfHNlYXJjaHwyfHwlRDclOTAlRDclOTElRDclOTB8aGV8MXx8fHwxNjg0NzcyMjYwfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'אחיין': 'https://images.unsplash.com/photo-1605714935427-12754de1a50e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTl8MHwxfHNlYXJjaHwyfHwlRDclOTAlRDclOTclRDclOTklRDclOTklRDclOUZ8aGV8MXx8fHwxNjg0NzcyMjAxfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'אחיינית': 'https://images.unsplash.com/photo-1635354825488-dadf5a40ee77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHw0fHwlRDclOTAlRDclOTclRDclOTklRDclOTklRDclQTAlRDclOTklRDclQUElMjAlRDclOTUlRDclOTMlRDclOTUlRDclOTMlRDclOTR8aGV8MXx8fHwxNjg0NzcyMTc1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'ים': 'https://images.unsplash.com/photo-1623167237575-e4de58c3df2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjExODJ8MHwxfHNlYXJjaHw2fHwlRDclOTklRDclOUQlMjB8aGV8MXx8fHwxNjg0NzcyMDg3fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'בריכה': 'https://images.unsplash.com/photo-1631356552355-08dfe9d8c533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHw3fHwlRDclOTElRDclQTglRDclOTklRDclOUIlRDclOTQlMjAlRDclQTYlRDclOTklRDclOTElRDclOTUlRDclQTglRDclOTklRDclQUF8aGV8MXx8fHwxNjg0NzcyMDEwfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'מגרש': 'https://images.unsplash.com/photo-1600534220378-df36338afc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTF8MHwxfHNlYXJjaHwzfHwlRDclOUUlRDclOTIlRDclQTglRDclQTklMjAlRDclOUIlRDclOTMlRDclOTUlRDclQTglRDclQTElRDclOUN8aGV8MXx8fHwxNjg0NzcxOTYyfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'יער': 'https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTl8MHwxfHNlYXJjaHwzfHwlRDclOTklRDclQTIlRDclQTh8aGV8MXx8fHwxNjg0NzcxOTAyfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'חוג': 'https://images.unsplash.com/photo-1517637633369-e4cc28755e01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHwxfHwlRDclOTclRDclOTUlRDclOTIlMjAlRDclOTQlRDclQUElRDclQTIlRDclOUMlRDclOUUlRDclOTUlRDclQUF8aGV8MXx8fHwxNjg0NzcxODcwfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'מחק': 'https://images.unsplash.com/photo-1518826778770-a729fb53327c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjExODJ8MHwxfHNlYXJjaHw2fHwlRDclOUUlRDclOTclRDclQTd8aGV8MXx8fHwxNjg0NzcwNzEyfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'הפסקה': 'https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTl8MHwxfHNlYXJjaHwzfHwlRDclOTQlRDclQTQlRDclQTElRDclQTclRDclOTQlMjAlRDclOTElRDclOTElRDclOTklRDclQUElMjAlRDclQTElRDclQTQlRDclQTh8aGV8MXx8fHwxNjg0NzcxNzI4fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'מחדד': 'https://images.unsplash.com/photo-1624383416434-3d5fda7dc9a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjExODJ8MHwxfHNlYXJjaHwxfHwlRDclOUUlRDclOTclRDclOTMlRDclOTMlMjAlRDclQTklRDclOUMlMjAlRDclQTIlRDclOTklRDclQTQlRDclQTglRDclOTUlRDclOUZ8aGV8MXx8fHwxNjg0NzcxNTU5fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'קלמר': 'https://images.unsplash.com/photo-1661732017125-f425c3e86467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHwzfHwlRDclQTclRDclOUMlRDclOUUlRDclQTglMjAlRDclQTklRDclOUMlMjAlRDclOTElRDclOTklRDclQUElMjAlRDclQTElRDclQTQlRDclQTh8aGV8MXx8fHwxNjg0NzcxNTA1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'לנוח': 'https://images.unsplash.com/photo-1568617935424-49ab968826d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTF8MHwxfHNlYXJjaHw2fHwlRDclOUMlRDclQTAlRDclOTUlRDclOTd8aGV8MXx8fHwxNjg0NzcwNzE1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'ללכת': 'https://images.unsplash.com/photo-1519255122284-c3acd66be602?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjExODJ8MHwxfHNlYXJjaHwyfHwlRDclOUMlRDclOUMlRDclOUIlRDclQUF8aGV8MXx8fHwxNjg0NzcxMTg0fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'לנקות': 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTl8MHwxfHNlYXJjaHwyfHwlRDclQTAlRDclOTklRDclQTclRDclOTklRDclOTUlRDclOUZ8aGV8MXx8fHwxNjg0NzcxMTIyfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'לשחק כדורעף': 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHwxfHwlRDclOUIlRDclOTMlRDclOTUlRDclQTglRDclQTIlRDclQTN8aGV8MXx8fHwxNjg0NzcxMDQ1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'רעב': 'https://images.unsplash.com/photo-1531928351158-2f736078e0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTl8MHwxfHNlYXJjaHwxfHwlRDclQTglRDclQTIlRDclOTF8aGV8MXx8fHwxNjg0NzgxMTIyfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'קוביות': 'https://images.unsplash.com/photo-1577563682708-4f022ec774fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTZ8MHwxfHNlYXJjaHwzfHwlRDclQTclRDclOTUlRDclOTElRDclOTklRDclOTUlRDclQUElMjAlRDclOUMlRDclOTElRDclQTAlRDclOTklRDclOTklRDclOTR8aGV8MXx8fHwxNjg0NzgxMDMyfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'חול': 'https://images.unsplash.com/photo-1637848688238-d0b8163793af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTF8MHwxfHNlYXJjaHw4fHwlRDclOTAlRDclQTglRDclOTIlRDclOTYlMjAlRDclOTclRDclOTUlRDclOUN8aGV8MXx8fHwxNjg0NzgxMDA5fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'מחשב': 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjExODJ8MHwxfHNlYXJjaHw0fHwlRDclOUUlRDclOTclRDclQTklRDclOTF8aGV8MXx8fHwxNjg0NzgwOTc4fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'בובות': 'https://images.unsplash.com/photo-1585767395671-0da505dfaa23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHw0fHwlRDclOTElRDclOTUlRDclOTElRDclOTUlRDclQUF8aGV8MXx8fHwxNjg0NzgwOTMzfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'עפרון': 'https://images.unsplash.com/photo-1590243107381-a5e2bd5ef4ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTZ8MHwxfHNlYXJjaHw4fHwlRDclQTIlRDclOTklRDclQTQlRDclQTglRDclOTUlRDclOUZ8aGV8MXx8fHwxNjg0NzgwODgxfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'בן דּוֹד': 'https://images.unsplash.com/photo-1569761597965-cbf328af6d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTZ8MHwxfHNlYXJjaHw0fHwlRDclOTElRDclOUYlMjAlRDclOTMlRDclOTUlRDclOTN8aGV8MXx8fHwxNjg0NzgyMTUxfDA&ixlib=rb-4.0.3&q=80&w=1080',
    'פלפל': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTF8MHwxfHNlYXJjaHwzfHwlRDclQTQlRDclOUMlRDclQTQlRDclOUN8aGV8MXx8fHwxNjg0NzgyMTA2fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'סודה': 'https://images.unsplash.com/photo-1603968070333-58761fa00853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTl8MHwxfHNlYXJjaHw0fHwlRDclQTElRDclOTUlRDclOTMlRDclOTR8aGV8MXx8fHwxNjg0NzcwNzI0fDA&ixlib=rb-4.0.3&q=80&w=1080',
    'כעס': 'https://images.unsplash.com/photo-1620110488106-dad904f50930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDA2MTh8MHwxfHNlYXJjaHw2fHwlRDclOUIlRDclQTIlRDclQTF8aGV8MXx8fHwxNjg0NzgxODUyfDA&ixlib=rb-4.0.3&q=80&w=1080',
};
