**AUTH API**

END_POINT = https://abc.com/api/v2/

**REGISTER**
ENDPONT : /auth/register
METHOD : POST
DATA :

```
{
    "name":"Umair Farooqui",
    "mobile":"9867503256",
    "password":"password"
}
```

**LOGIN**
ENDPONT : /auth/login
METHOD : POST
DATA :

```
{
    "mobile":"9867503256",
    "password":"password"
}
```

**VERIFY**
ENDPONT : /auth/verify
METHOD : POST
DATA :

```
{
    "mobile":"9867503256",
    "otp":"234233",
    "token":"{{token}}"
}
```

*POSTMAN COLLECTION*

```
https://www.postman.com/mufazmi/workspace/ezyone
```