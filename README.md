# Server
###### https://www.canva.com/design/DAGqkg_V-1k/VFSbUa45RrcKz_Vr_p3ebg/view?utm_content=DAGqkg_V-1k&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h787ad91364

## Step 1 Setup server
```bash
npm init -y
npm install express
```
- "type": "module"
- "dev": "nodemon server"

## Step 2 Basic middleware
```bash
npm install cors morgan nodemon
```
- Test Server

## Step 3 Folder routes
- folder routes --> user.js --> export to server.js
- Test Postman

## Step 4 Folder controller
- folder controllers --> user.js --> export to routes/user.js
- ลบ function เก่าออกแล้วนำใน controller มาเชื่อม
- Test Postman

## Step 5 routes --> auth.js
- copy routes/user.js --> auth.js --> /register, /login export to server.js
- folder controllers --> auth.js --> export to routes/auth.js
- Test Postman