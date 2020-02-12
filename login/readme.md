#### 调用login来与后端连接

login app 目前提供了以下接口，你可以用它们来获取后端数据或者进行验证

1. ##### 登录验证接口

   | 选项   | 描述                      |
   | ------ | ------------------------- |
   | url    | 'api/login/'              |
   | method | POST                      |
   | param  | username, password        |
   | return | json of dic{'Code'<bool>} |
   | header | application/json          |

   使用该接口，传入用户名和密码，以json的方式返回一个字典，其中包括：Code<bool类型>,描述登录验证状态，True为成功，False为失败

2. ##### 注册验证接口

   | 选项   | 描述                             |
   | ------ | -------------------------------- |
   | url    | 'api/register/'                  |
   | method | POST                             |
   | param  | username, password, mobile, code |
   | return | json of dic{'Code'<bool>}        |
   | header | application/json                 |

   使用该接口，传入用户名和密码以及手机号和验证码，以json的方式返回一个字典，其中包括：Code<bool类型>,描述注册验证状态，True为成功，False为失败

3. ##### 登出接口

   | 选项   | 描述             |
   | ------ | ---------------- |
   | url    | 'api/logout/'    |
   | method | POST             |
   | param  | none             |
   | return | none             |
   | header | application/json |

   使用该接口进行登出操作，即使你没有处于登录状态也可以使用

4. ##### 获取用户信息接口

   | 选项   | 描述                                 |
   | ------ | ------------------------------------ |
   | url    | 'api/get/'                           |
   | method | POST                                 |
   | param  | param<str>(the item you want to get) |
   | return | json of dic{'Code'<bool>,'itemname'} |
| header | application/json                     |
   
   使用该接口获取用户信息（目前支持username,avatar)，传入参数为param='itemname',itemname为你想要获取的信息，返回Code 和itemname的字典<json>

##### 5.管理员登录验证接口

| 选项   | 描述                      |
| ------ | ------------------------- |
| url    | 'api/superlogin/'         |
| method | POST                      |
| param  | username, password        |
| return | json of dic{'Code'<bool>} |
| header | application/json          |

使用该接口，传入管理员用户名和密码，以json的方式返回一个字典，其中包括：Code<bool类型>,描述登录验证状态，True为成功，False为失败

##### 6. 管理员获取用户信息接口

| 选项   | 描述                                 |
| ------ | ------------------------------------ |
| url    | 'api/superget/'                      |
| method | POST                                 |
| param  | param<str>(the item you want to get) |
| return | json of dic{'Code'<bool>,'itemname'} |
| header | application/json                     |

使用该接口获取用户信息（目前支持users)，传入参数为param='itemname',itemname为你想要获取的信息，返回Code 和itemname的字典<json>

##### 7. 发送短信接口

| 选项   | 描述                                            |
| ------ | ----------------------------------------------- |
| url    | 'api/sendmsg/'                                  |
| method | POST                                            |
| param  | mobile<str>(the tele youw want to send message) |
| return | json of dic{'Code'<bool>}                       |
| header | application/json                                |

使用该接口像指定的手机号发送短信，传入参数为手机号mobile,返回值为成功状态Code的json，用于验证的验证码存储于session中。

##### 8. 上传头像接口

| 选项   | 描述                                      |
| ------ | ----------------------------------------- |
| url    | 'api/postavatar/'                         |
| method | POST                                      |
| param  | avatar<form file>(the avatar user upload) |
| return | json of dic{'Code'<bool>,'Message'<str>}  |
| header | multipart/form-data                       |

使用该接口上传头像, 传入表单类型的文件数据，返回上传成功状态Code的json

##### 9.上传程序接口

| 选项   | 描述                                        |
| ------ | ------------------------------------------- |
| url    | 'api/postprogram/'                          |
| method | POST                                        |
| param  | program<form file>(the program user upload) |
| return | json of dic{'Code'<bool>,'Message'<str>}    |
| header | multipart/form-data                         |

使用该接口上传程序, 传入表单类型的文件数据，返回上传成功状态Code的json

##### 10.获取用户程序接口

| 选项   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| url    | 'api/getprogramlist/'                                        |
| method | POST                                                         |
| param  | none                                                         |
| return | json of dic{'Code'<bool>,'Message'<str>,'id'<int>:'title'<str>...} |
| header | application/json                                             |

使用该接口获取用户上传程序列表，返回成功时json中包含当前用户所有的id:title