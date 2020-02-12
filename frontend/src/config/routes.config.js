import AsyncCompnent from "../components/common/HighOrderComponents/AsyncComponent";

const PageOnStar = AsyncCompnent(() => import("../pages/PageOnStar.jsx"));
const PagePending = AsyncCompnent(() => import("../pages/PagePending.jsx"));
const PageMyProgram = AsyncCompnent(() => import("../pages/PageMyProgram.jsx"));
const PageUpload = AsyncCompnent(() => import("../pages/PageUpload.jsx"));
const PageUser = AsyncCompnent(() => import("../pages/PageUser.jsx"));
const PageVideo = AsyncCompnent(() => import("../pages/PageVideo.jsx"));
const PagePost = AsyncCompnent(() => import("../pages/PagePost.jsx"));
const PageStudents = AsyncCompnent(() => import("../pages/PageStudents.jsx"));
const PageCheck = AsyncCompnent(() => import("../pages/PageCheck.jsx"));
const PageGroups = AsyncCompnent(() => import("../pages/PageGroups.jsx"));
const PageCreateGroup = AsyncCompnent(() => import("../pages/PageCreateGroup.jsx"));
const PageUsers = AsyncCompnent(() => import("../pages/PageUsers.jsx"));
const PageNotifications = AsyncCompnent(() => import("../pages/PageNotifications"));
const PageSatellite = AsyncCompnent(() => import("../pages/PageSatellite.jsx"));

const ROUTES = [
    {
        key: 'OnStar',
        link: '/mainpage/onstar',
        iconType: 'star',
        text: '星上程序',
        component: PageOnStar
    }, {
        key: 'Pending',
        link: '/mainpage/pending',
        iconType: 'camera',
        text: '即将上传',
        component: PagePending
    }, {
        key: 'MyProgram',
        link: '/mainpage/myprogram',
        iconType: 'user',
        text: '我的程序',
        component: PageMyProgram
    }, {
        key: 'Upload',
        link: '/mainpage/upload',
        iconType: 'upload',
        text: '上传程序',
        component: PageUpload
    }, {
        key: 'User',
        link: '/mainpage/user',
        iconType: 'user',
        text: '个人中心',
        component: PageUser
    }, {
        key: 'Video',
        link: '/mainpage/video',
        iconType: 'video-camera',
        text: '视频教程',
        component: PageVideo
    }, {
        key: 'Post',
        link: '/mainpage/post',
        iconType: 'video-camera',
        text: '讨论区',
        component: PagePost
    }, {
        key: 'Students',
        link: '/mainpage/students',
        iconType: 'user',
        text: '我的学生',
        component: PageStudents
    },{
        key: 'Check',
        link: '/mainpage/check',
        iconType: 'camera',
        text: '审查程序',
        component: PageCheck
    }, {
        key: 'Groups',
        link: '/mainpage/groups',
        iconType: 'user',
        text: '加入组',
        component: PageGroups
    }, {
        key: 'CreateGroup',
        link: '/mainpage/creategroup',
        iconType: 'user',
        text: '创建组',
        component: PageCreateGroup
    }, {
        key: 'Users',
        link: '/mainpage/users',
        iconType: 'user',
        text: '用户管理',
        component: PageUsers
    }, {
        key: 'Notifications',
        link: '/mainpage/notifications',
        iconType: 'user',
        component: PageNotifications
    }, {
        key: 'Satellite',
        link: '/mainpage/showsatellite',
        iconType: 'user',
        component: PageSatellite
    }
];

export { ROUTES };