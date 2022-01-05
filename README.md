<h1 align="center">MEDICARE</h1>

<p>Built during Webster 2021, Avishkar</p>

## Introduction
It is an online medical appointments and consultation website, built using NodeJS in backend and ReactJS in frontend. 

## Demo Video
<a href='https://youtu.be/qcMfFGy47tA'>Demo Video</a>

## Table of Contents
- [Problem Statement](#problem-statement)
- [Description](#description)
- [Technology Used](#technology-used)
- [Features](#features)
- [Local Installation](#local-installation)
- [Demo Images](#demo-images)

### Problem Statement
- “During a heated encounter with the police, Nairobi was shot. Now the gang members need to revive her.Rio wants to save her and needs a doctor’s assistance immediately. All they have access to is the internet. Can you quickly design a platform for having online consultation with the doctors?”

### Description
- Through this web app, people can signup as patients and book appointments with doctors and get an online/offline consultation. 
- Similarly doctors can signup and view the appointments scheduled for him/her and schedule video meetings accordingly.

### Technology Used
  1) NodeJs
  2) ReactJs
  3) Firebase
  4) socket.io
  5) simple-peer library (node.js style API for WebRTC)

### Features
- Doctors/Patients/Admins have separate login
- Admins can verify and unverify doctors and patients
- Patients can search for any doctor according to his/her name/speciality/city
- Patients can book appointments in the doctor's slot
- Doctors can either cancel/confirm appointments
- A meeting is automatically scheduled for confirmed appointments and the notification is sent to the patient as well
- In the meeting, doctors can view patient's profile, chat, toggle their camera and mic, give prescription, update patient's blood sugar level
- In the meeting, patients can chat, toggle their camera and mic, can read and download the prescription given by doctor, can rate and review the doctor
- Patients can also download the prescription as a PDF
- After the meeting, the doctors can view the same patient in their "Your Patients" section and see their past appointments with him/her
- Similarly, patients can find their past appointments alongwith prescription and feedback
- Admins can create posts with latest updates which will be visible to all users.

### Local Installation
```
git clone https://github.com/Sneha0607/medicare.git
cd medicare

#Open two terminals

#1st Terminal
cd client
npm install
npm start

#2nd Terminal
cd server
npm install
npm start
```
To get the database working, the firebase configuration needs to be added in client/src/firebase.js file after cloning the repository.

### Demo Images
![home](https://github.com/Sneha0607/medicare/blob/master/images/1.png)
<br/>
![doctor signup](https://github.com/Sneha0607/medicare/blob/master/images/6.png)
<br/>
![doctor dashboard](https://github.com/Sneha0607/medicare/blob/master/images/2.png)
<br/>
![view doctors](https://github.com/Sneha0607/medicare/blob/master/images/3.png)
<br/>
![book appointment](https://github.com/Sneha0607/medicare/blob/master/images/4.png)
<br/>
![meeting](https://github.com/Sneha0607/medicare/blob/master/images/8.png)
<br/>
![prescription](https://github.com/Sneha0607/medicare/blob/master/images/5.png)
<br/>
![graphs](https://github.com/Sneha0607/medicare/blob/master/images/7.png)
<br/>
![admin](https://github.com/Sneha0607/medicare/blob/master/images/9.png)
<br/>
