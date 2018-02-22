// this is JUST used to require files, so we know *exactly* what we'are using
// :) be happy
require('./redux/user');
require('./redux/diaries');
require('./redux/diaryEntries');

require('./commonFunctions');

require('./components/AppHeaderNotLoggedIn');
require('./containers/AppHeaderLoggedIn');
require('./containers/DiaryHeader');
require('./containers/DiaryList');
require('./containers/DiaryEntryList');

require('./forms/LoginForm');
require('./forms/SignUpForm');
require('./forms/CreateDiaryForm');
require('./forms/AddDiaryEntryForm');

require('./pages/CreateAccount');
require('./pages/HomeNotLoggedIn');
require('./pages/HomeLoggedIn');
require('./pages/NotFound');
require('./pages/CreateDiary');
require('./pages/DiaryLoggedIn');
require('./pages/DiaryNotLoggedIn');
require('./pages/AddDiaryEntry');

require('./containers/AppContent');

require('./App');
