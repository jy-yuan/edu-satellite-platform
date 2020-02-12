define({ "api": [
  {
    "type": "post",
    "url": "get/",
    "title": "Get",
    "name": "Get",
    "description": "<p>Get Basic Info</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>Basic Info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"Message\": {\n        \"id\": \"1\",\n        \"username\": \"admin\",\n        \"group\": null,\n        \"leader\": null,\n        \"school\": \"Tsinghua\",\n        \"email\": \"\",\n        \"mobile\": \"\",\n        \"permission\": \"USER\",\n        \"avatar\": \"media/avatars/default.svg\",\n        \"programs\": [\n            {\n                \"id\": \"1\",\n                \"title\": \"program1\",\n                \"src\": \"media/admin/programs/CHAP02.3.1.pdf\",\n                \"description\": \"program1\",\n                \"owner\": \"admin\",\n                \"school\": \"Tsinghua\",\n                \"status\": \"TOCHECK\",\n                \"likes\": \"0\",\n                \"time\": \"2019-11-13 14:27:05\",\n                \"time2\": \"2019-11-13 14:27:05\",\n                \"downloads\": \"0\"\n            }\n        ],\n        \"groups\": [\n            {\n                \"id\": \"1\",\n                \"name\": \"superuser\",\n                \"leader\": \"admin\",\n                \"students\": [\n                    {\n                        \"id\": 1,\n                        \"username\": \"admin\",\n                        \"permission\": \"USER\",\n                        \"avatar\": \"media/avatars/default.svg\",\n                        \"groupstatus\": \"OUT\",\n                        \"group\": \"superuser\"\n                    },\n                    {\n                        \"id\": 2,\n                        \"username\": \"cwl\",\n                        \"permission\": \"USER\",\n                        \"avatar\": \"media/avatars/default.svg\",\n                        \"groupstatus\": \"OUT\",\n                        \"group\": \"superuser\"\n                    }\n                ]\n            }\n        ],\n        \"groupstatus\": \"OUT\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "group": "GetApis",
    "version": "0.0.0",
    "filename": "login/views/get.py",
    "groupTitle": "GetApis"
  },
  {
    "type": "post",
    "url": "getarticles/",
    "title": "GetArticles",
    "name": "GetArticles",
    "description": "<p>Get Articles of Discussion</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>ArticleList</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"Message\": [\n        {\n            \"id\": 1,\n            \"title\": \"一楼\",\n            \"text\": \"中文测试\",\n            \"time\": \"2019-11-05 12:34:47\",\n            \"author\": {\n                \"id\": 5,\n                \"username\": \"cwl\",\n                \"permission\": \"USER\",\n                \"avatar\": \"media/cwl/avatars/xbd.jpg\",\n                \"groupstatus\": \"IN\",\n                \"group\": \"yjygroup\"\n            },\n            \"Re\": null\n        },\n        {\n            \"id\": 2,\n            \"title\": \"二楼\",\n            \"text\": \"lzsb\",\n            \"time\": \"2019-11-05 12:41:19\",\n            \"author\": {\n                \"id\": 3,\n                \"username\": \"yjy\",\n                \"permission\": \"SUPERUSER\",\n                \"avatar\": \"media/yjy/avatars/alg_ilnbA0O.jpg\",\n                \"groupstatus\": \"IN\",\n                \"group\": \"superuser\"\n            },\n            \"Re\": \"一楼\"\n        },\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "group": "GetApis",
    "version": "0.0.0",
    "filename": "login/views/get.py",
    "groupTitle": "GetApis"
  },
  {
    "type": "post",
    "url": "getgroups/",
    "title": "GetGroups",
    "name": "GetGroupList",
    "description": "<p>Get GroupList</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>GroupList</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"Message\": {\n        \"groups\": [\n            {\n                \"id\": \"1\",\n                \"name\": \"superuser\",\n                \"leader\": \"admin\",\n                \"students\": [\n                    {\n                        \"id\": 1,\n                        \"username\": \"admin\",\n                        \"permission\": \"USER\",\n                        \"avatar\": \"media/avatars/default.svg\",\n                        \"groupstatus\": \"OUT\",\n                        \"group\": \"superuser\"\n                    },\n                    {\n                        \"id\": 2,\n                        \"username\": \"cwl\",\n                        \"permission\": \"USER\",\n                        \"avatar\": \"media/avatars/default.svg\",\n                        \"groupstatus\": \"OUT\",\n                        \"group\": \"superuser\"\n                    }\n                ]\n            }\n        ],\n        \"groupid\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "group": "GetApis",
    "version": "0.0.0",
    "filename": "login/views/get.py",
    "groupTitle": "GetApis"
  },
  {
    "type": "post",
    "url": "getgroupprograms/",
    "title": "GetGroupPrograms",
    "name": "GetGroupPrograms",
    "description": "<p>Get Programs of User-Leading Groups</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>ProgramList</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"Message\": [\n        {\n            \"name\": \"superuser\",\n            \"programs\": [\n                {\n                    \"id\": \"1\",\n                    \"title\": \"program1\",\n                    \"src\": \"media/admin/programs/CHAP02.3.1.pdf\",\n                    \"description\": \"program1\",\n                    \"owner\": \"admin\",\n                    \"school\": \"Tsinghua\",\n                    \"status\": \"TOCHECK\",\n                    \"likes\": \"0\",\n                    \"time\": \"2019-11-13 14:27:05\",\n                    \"time2\": \"2019-11-13 14:27:05\",\n                    \"downloads\": \"0\"\n                }\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "group": "GetApis",
    "version": "0.0.0",
    "filename": "login/views/get.py",
    "groupTitle": "GetApis",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Only SuperUser/Admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 500\n{\n    \"Code\": false,\n    \"Message\": \"Permission Denied\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "getpending/",
    "title": "GetPendingPrograms",
    "name": "GetPendingPrograms",
    "description": "<p>Get Pending Programs</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>ProgramList</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"Message\": {\n        \"programs\": [\n            {\n                \"id\": \"8\",\n                \"title\": \"wrong.py\",\n                \"src\": \"media/cwl/programs/wrong.py\",\n                \"description\": \"\",\n                \"owner\": \"cwl\",\n                \"school\": \"Tsinghua\",\n                \"status\": \"SENT\",\n                \"likes\": \"2\",\n                \"time\": \"2019-11-07 09:10:52\",\n                \"time2\": \"2019-11-12 06:43:09\",\n                \"downloads\": \"0\",\n                \"likestatus\": false\n            },\n            {\n                \"id\": \"7\",\n                \"title\": \"correct.py\",\n                \"src\": \"media/cwl/programs/correct.py\",\n                \"description\": \"\",\n                \"owner\": \"cwl\",\n                \"school\": \"Tsinghua\",\n                \"status\": \"SENT\",\n                \"likes\": \"3\",\n                \"time\": \"2019-11-07 09:10:35\",\n                \"time2\": \"2019-11-12 05:48:48\",\n                \"downloads\": \"0\",\n                \"likestatus\": true\n            },\n            {\n                \"id\": \"6\",\n                \"title\": \"urls.py\",\n                \"src\": \"media/yjy/programs/urls.py\",\n                \"description\": \"\",\n                \"owner\": \"yjy\",\n                \"school\": \"Tsinghua\",\n                \"status\": \"SENT\",\n                \"likes\": \"2\",\n                \"time\": \"2019-11-07 08:29:41\",\n                \"time2\": \"2019-11-13 13:26:58\",\n                \"downloads\": \"0\",\n                \"likestatus\": false\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "group": "GetApis",
    "version": "0.0.0",
    "filename": "login/views/get.py",
    "groupTitle": "GetApis"
  },
  {
    "type": "post",
    "url": "getprograms/",
    "title": "GetPrograms",
    "name": "GetPrograms",
    "description": "<p>Get Articles of Discussion</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>ProgramList</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"Message\": {\n        \"programs1\": [\n            {\n                \"id\": \"1\",\n                \"title\": \"test.py\",\n                \"src\": \"media/yjy/programs/test.py\",\n                \"description\": \"1\",\n                \"owner\": \"yjy\",\n                \"school\": \"Tsinghua\",\n                \"status\": \"SENT\",\n                \"likes\": \"5\",\n                \"time\": \"2019-11-05 12:45:35\",\n                \"time2\": \"2019-11-09 16:08:56\",\n                \"downloads\": \"0\",\n                \"likestatus\": true\n            }\n        ],\n        \"programs2\": [\n            {\n                \"id\": \"8\",\n                \"title\": \"wrong.py\",\n                \"src\": \"media/cwl/programs/wrong.py\",\n                \"description\": \"\",\n                \"owner\": \"cwl\",\n                \"school\": \"Tsinghua\",\n                \"status\": \"SENT\",\n                \"likes\": \"2\",\n                \"time\": \"2019-11-07 09:10:52\",\n                \"time2\": \"2019-11-12 06:43:09\",\n                \"downloads\": \"0\",\n                \"likestatus\": false\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "group": "GetApis",
    "version": "0.0.0",
    "filename": "login/views/get.py",
    "groupTitle": "GetApis"
  },
  {
    "type": "post",
    "url": "getusers/",
    "title": "GetUsers",
    "name": "GetUsers",
    "description": "<p>Get All Users List</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>UserList</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"Message\": [\n        {\n            \"id\": \"1\",\n            \"username\": \"administrator\",\n            \"group\": \"superuser\",\n            \"leader\": \"administrator\",\n            \"school\": \"Tsinghua\",\n            \"email\": \"\",\n            \"mobile\": \"114514\",\n            \"permission\": \"ADMIN\",\n            \"avatar\": \"media/avatars/default.svg\",\n            \"programs\": [],\n            \"groups\": [\n                {\n                    \"id\": \"1\",\n                    \"name\": \"superuser\",\n                    \"leader\": \"administrator\",\n                    \"students\": [\n                        {\n                            \"id\": 1,\n                            \"username\": \"administrator\",\n                            \"permission\": \"ADMIN\",\n                            \"avatar\": \"media/avatars/default.svg\",\n                            \"groupstatus\": \"OUT\",\n                            \"group\": \"superuser\"\n                        },\n                        {\n                            \"id\": 2,\n                            \"username\": \"ys\",\n                            \"permission\": \"SUPERUSER\",\n                            \"avatar\": \"media/ys/avatars/cxk_jF6Bh1f.jpg\",\n                            \"groupstatus\": \"IN\",\n                            \"group\": \"superuser\"\n                        },\n                        {\n                            \"id\": 3,\n                            \"username\": \"yjy\",\n                            \"permission\": \"SUPERUSER\",\n                            \"avatar\": \"media/yjy/avatars/alg_ilnbA0O.jpg\",\n                            \"groupstatus\": \"IN\",\n                            \"group\": \"superuser\"\n                        },\n                        {\n                            \"id\": 4,\n                            \"username\": \"wyt\",\n                            \"permission\": \"SUPERUSER\",\n                            \"avatar\": \"media/avatars/default.svg\",\n                            \"groupstatus\": \"IN\",\n                            \"group\": \"superuser\"\n                        }\n                    ]\n                },\n                {\n                    \"id\": \"6\",\n                    \"name\": \"奥里给\",\n                    \"leader\": \"administrator\",\n                    \"students\": []\n                }\n            ],\n            \"groupstatus\": \"OUT\"\n        },\n        {\n            \"id\": \"2\",\n            \"username\": \"ys\",\n            \"group\": \"superuser\",\n            \"leader\": \"administrator\",\n            \"school\": \"Tsinghua\",\n            \"email\": \"\",\n            \"mobile\": \"114514\",\n            \"permission\": \"SUPERUSER\",\n            \"avatar\": \"media/ys/avatars/cxk_jF6Bh1f.jpg\",\n            \"programs\": [],\n            \"groups\": [\n                {\n                    \"id\": \"2\",\n                    \"name\": \"ysgroup\",\n                    \"leader\": \"ys\",\n                    \"students\": []\n                },\n                {\n                    \"id\": \"4\",\n                    \"name\": \"bb\",\n                    \"leader\": \"ys\",\n                    \"students\": []\n                }\n            ]\n            \"groupstatus\": \"IN\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "group": "GetApis",
    "version": "0.0.0",
    "filename": "login/views/get.py",
    "groupTitle": "GetApis",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Only SuperUser/Admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 500\n{\n    \"Code\": false,\n    \"Message\": \"Permission Denied\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "getvideos/",
    "title": "GetVideos",
    "name": "GetVideoList",
    "description": "<p>Get Video List</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>VideoList</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"Message\": [\n        {\n            \"id\": \"1\",\n            \"header\": \"video1\",\n            \"description\": \"video1\",\n            \"owner\": \"cwl\",\n            \"src\": \"media/cwl/videos/2.mp4\",\n            \"time\": \"2019-11-13 14:59:26\",\n            \"time2\": \"2019-11-13 14:59:26\",\n            \"views\": \"0\",\n            \"likes\": \"0\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "group": "GetApis",
    "version": "0.0.0",
    "filename": "login/views/get.py",
    "groupTitle": "GetApis"
  },
  {
    "type": "post",
    "url": "searchvideo/",
    "title": "SearchVideo",
    "group": "GetApis",
    "name": "SearchVideo",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>SearchedVideos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"Message\": [\n        {\n            \"id\": \"1\",\n            \"header\": \"video1\",\n            \"description\": \"video1\",\n            \"owner\": \"cwl\",\n            \"src\": \"media/cwl/videos/2.mp4\",\n            \"time\": \"2019-11-13 14:59:26\",\n            \"time2\": \"2019-11-13 14:59:26\",\n            \"views\": \"0\",\n            \"likes\": \"0\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "login/views/get.py",
    "groupTitle": "GetApis"
  },
  {
    "type": "post",
    "url": "login/",
    "title": "Login",
    "name": "Login",
    "group": "LoginApis",
    "description": "<p>judge login</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "username",
            "description": "<p>The Only identify of user</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>Login Success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"permission\": \"SUPERUSER\",\n    \"Message\": \"login success, username is cwl, permission is SUPERUSER\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordError",
            "description": "<p>wrong password or no such user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 500\n{\n    \"Code\": false,\n    \"permission\": \"NONE\",\n    \"Message\": \"password error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "login/views/login.py",
    "groupTitle": "LoginApis"
  },
  {
    "type": "post",
    "url": "logout/",
    "title": "Logout",
    "name": "Logout",
    "group": "LoginApis",
    "description": "<p>logout the present user</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>Logout Success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "login/views/login.py",
    "groupTitle": "LoginApis"
  },
  {
    "type": "post",
    "url": "register/",
    "title": "Register",
    "name": "Register",
    "group": "LoginApis",
    "description": "<p>judge register</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "username",
            "description": "<p>The Only identify of user</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "mobile",
            "description": "<p>The mobile number of user</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": "<p>The email of user</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "code",
            "description": "<p>The judge code</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "msg",
            "description": "<p>Register Success</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": true,\n    \"Message\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CodeError",
            "description": "<p>code is not same as the code sent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 200 OK\n{\n    \"Code\": false,\n    \"Message\": \"code error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "login/views/login.py",
    "groupTitle": "LoginApis"
  },
  {
    "name": "upload_to_programs",
    "group": "ModelFunction",
    "description": "<p>redefine the path of programs uploaded to</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "filename",
            "optional": false,
            "field": "filename",
            "description": "<p>FileName Users upload</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>Path of the File Saved</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IOERROR",
            "description": "<p>Path Not Found</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "login/models.py",
    "groupTitle": "ModelFunction"
  },
  {
    "name": "upload_to_videos",
    "group": "ModelFunction",
    "description": "<p>redefine the path of videos uploaded to</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>FileName Users upload</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>Path of the File Saved</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IOERROR",
            "description": "<p>Path Not Found</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "login/models.py",
    "groupTitle": "ModelFunction"
  },
  {
    "name": "uploadtoavatars",
    "group": "ModelFunction",
    "description": "<p>redefine the path of avatars uploaded to</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "filename",
            "optional": false,
            "field": "filename",
            "description": "<p>FileName Users upload</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>Path of the File Saved</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IOERROR",
            "description": "<p>Path Not Found</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "login/models.py",
    "groupTitle": "ModelFunction"
  },
  {
    "type": "get",
    "url": "models/:modelname",
    "title": "Article",
    "name": "Article",
    "group": "Models",
    "description": "<p>Article User Submit in The Discussion</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "title",
            "description": "<p>Article Title</p>"
          },
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "text",
            "description": "<p>Article Text</p>"
          },
          {
            "group": "Parameter",
            "type": "ForiegnKey",
            "optional": false,
            "field": "author",
            "description": "<p>User Who Submit This Article</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeField",
            "optional": false,
            "field": "time",
            "description": "<p>Submit Time</p>"
          },
          {
            "group": "Parameter",
            "type": "ForiegnKey",
            "optional": false,
            "field": "res",
            "description": "<p>Article Response to</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CREATEERROR",
            "description": "<p>Permission Denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REQUESTERROR",
            "description": "<p>No Such Video</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DELETEERROR",
            "description": "<p>Permission Denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CHANGEERROR",
            "description": "<p>Permission Denied</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "login/models.py",
    "groupTitle": "Models"
  },
  {
    "type": "get",
    "url": "models/:modelname",
    "title": "Group",
    "name": "Group",
    "group": "Models",
    "description": "<p>Group of Users</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "name",
            "description": "<p>Display Name</p>"
          },
          {
            "group": "Parameter",
            "type": "ForiegnKey",
            "optional": false,
            "field": "leader",
            "description": "<p>Leader of Group</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "model.Group",
            "optional": false,
            "field": "group",
            "description": "<p>The Group request</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REQUESTERROR",
            "description": "<p>No Such Group</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DELETEERROR",
            "description": "<p>Permission Denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CHANGEERROR",
            "description": "<p>Permission Denied</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "login/models.py",
    "groupTitle": "Models"
  },
  {
    "type": "get",
    "url": "models/:modelname",
    "title": "LikeHandle",
    "name": "LikeHandle",
    "group": "Models",
    "description": "<p>Handler of User-Program Like-RelationShip</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ForeignKey",
            "optional": false,
            "field": "user",
            "description": "<p>User of The Like-RelationShip</p>"
          },
          {
            "group": "Parameter",
            "type": "ForeignKey",
            "optional": false,
            "field": "program",
            "description": "<p>Program of The Like-RelationShip</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeField",
            "optional": false,
            "field": "time",
            "description": "<p>RelationShip Create Time</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "login/models.py",
    "groupTitle": "Models"
  },
  {
    "type": "get",
    "url": "models/:modelname",
    "title": "Notice",
    "name": "Notice",
    "group": "Models",
    "description": "<p>Notice about the program</p>",
    "version": "0.0.0",
    "filename": "login/models.py",
    "groupTitle": "Models"
  },
  {
    "type": "get",
    "url": "models/:modelname",
    "title": "Program",
    "name": "Program",
    "group": "Models",
    "description": "<p>Python Program User Submit</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "title",
            "description": "<p>Display Program Title</p>"
          },
          {
            "group": "Parameter",
            "type": "FileField",
            "optional": false,
            "field": "text",
            "description": "<p>Program File</p>"
          },
          {
            "group": "Parameter",
            "type": "ForiegnKey",
            "optional": false,
            "field": "owner",
            "description": "<p>User Who Submit This Program</p>"
          },
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "description",
            "description": "<p>Description of Program</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeField",
            "optional": false,
            "field": "create_timestamp",
            "description": "<p>Submit Time</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeField",
            "optional": false,
            "field": "post_timestamp",
            "description": "<p>Do Post Action Time</p>"
          },
          {
            "group": "Parameter",
            "type": "IntegerField",
            "optional": false,
            "field": "stars",
            "description": "<p>Number of stars</p>"
          },
          {
            "group": "Parameter",
            "type": "IntegerField",
            "optional": false,
            "field": "like",
            "description": "<p>Number of likes</p>"
          },
          {
            "group": "Parameter",
            "type": "ManyToManyField",
            "optional": false,
            "field": "likeusers",
            "description": "<p>LikeUsers of Program</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "model.Program",
            "optional": false,
            "field": "program",
            "description": "<p>The Program request</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CREATEERROR",
            "description": "<p>Permission Denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REQUESTERROR",
            "description": "<p>No Such Program</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DELETEERROR",
            "description": "<p>Permission Denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CHANGEERROR",
            "description": "<p>Permission Denied</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "login/models.py",
    "groupTitle": "Models"
  },
  {
    "type": "get",
    "url": "models/:modelname",
    "title": "UserExtension",
    "name": "UserExtension",
    "group": "Models",
    "description": "<p>An Extension to Record the UserInfo</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "OneToOneField",
            "optional": false,
            "field": "user",
            "description": "<p>User Extension Belongs</p>"
          },
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "mobile",
            "description": "<p>Tele of User</p>"
          },
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "permission",
            "description": "<p>User Permission</p>"
          },
          {
            "group": "Parameter",
            "type": "ImageField",
            "optional": false,
            "field": "avatar",
            "description": "<p>User Avatar</p>"
          },
          {
            "group": "Parameter",
            "type": "ForiegnKey",
            "optional": false,
            "field": "group",
            "description": "<p>Group User Belongs</p>"
          },
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "school",
            "description": "<p>User School</p>"
          },
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "gstatus",
            "description": "<p>User Group Status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "model.UserExtension",
            "optional": false,
            "field": "userextension",
            "description": "<p>The UserExtension request</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CREATEERROR",
            "description": "<p>User/UserExtension Existed</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REQUESTERROR",
            "description": "<p>No Such UserExtension</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DELETEERROR",
            "description": "<p>Permission Denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CHANGEERROR",
            "description": "<p>Permission Denied</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "login/models.py",
    "groupTitle": "Models"
  },
  {
    "type": "get",
    "url": "models/:modelname",
    "title": "Video",
    "name": "Video",
    "group": "Models",
    "description": "<p>Video Lecture SuperUser Submit</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "title",
            "description": "<p>Display Video Title</p>"
          },
          {
            "group": "Parameter",
            "type": "FileField",
            "optional": false,
            "field": "video",
            "description": "<p>Video File</p>"
          },
          {
            "group": "Parameter",
            "type": "ForiegnKey",
            "optional": false,
            "field": "owner",
            "description": "<p>User Who Submit This Video</p>"
          },
          {
            "group": "Parameter",
            "type": "CharField",
            "optional": false,
            "field": "description",
            "description": "<p>Description of Video Lecture</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeField",
            "optional": false,
            "field": "create_timestamp",
            "description": "<p>Submit Time</p>"
          },
          {
            "group": "Parameter",
            "type": "TimeField",
            "optional": false,
            "field": "post_timestamp",
            "description": "<p>Do Post Action Time</p>"
          },
          {
            "group": "Parameter",
            "type": "IntegerField",
            "optional": false,
            "field": "stars",
            "description": "<p>Number of stars</p>"
          },
          {
            "group": "Parameter",
            "type": "IntegerField",
            "optional": false,
            "field": "like",
            "description": "<p>Number of likes</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "model.Video",
            "optional": false,
            "field": "video",
            "description": "<p>The Video request</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CREATEERROR",
            "description": "<p>Permission Denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "REQUESTERROR",
            "description": "<p>No Such Video</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DELETEERROR",
            "description": "<p>Permission Denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CHANGEERROR",
            "description": "<p>Permission Denied</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "login/models.py",
    "groupTitle": "Models"
  }
] });
