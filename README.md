# ParKing - Revolutionizing Urban Parking

## Overview
ParKing is a pioneering SaaS application aimed at revolutionizing parking logistics in urban areas. Facing the challenges of parking in growing cities, ParKing provides streamlined interactions for drivers and valets, transforming parking experiences through cutting-edge technology.

## Authors

[Amelia LI](https://github.com/amelia8872)\
[Beck Baimouradov](https://github.com/BeckBay)\
[Daniel Park](https://github.com/dp9-16)\
[Jon Williams](https://github.com/jonwill08)\
[Kurt Vardeman](https://github.com/kurtvardeman)\
[LeDerius Franklin](https://github.com/lederius)\
[Michael Cuellar](https://github.com/mcuellar98)


## Built With

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Goals
- Enable users to create accounts and reserve parking spots.
- Implement a QR-based paperless system for expedited car handoff and receipt.
- Allow users to track their car and make payments within the app.

## Specifications
ParKing provides:
- **Client Authentication:** Account creation and login functionalities.
- **Garage/Valet Finding:** Intuitive location-based search.
- **Garage/Valet Listing:** Dynamic listing availability for space owners.
- **Reserve Parking:** Easy reservation process with transparency.
- **QR Code Generation:** Paperless solution for check-in and check-out.
- **Check Car Status:** Convenient signaling and notification system.
- **Pick up:** Streamlined retrieval and payment process with real-time availability updates.

## Backend Documentation

### SQL Schema:

## API Routes:

### Garages

Returns all garages with available spots at input reservation times.

`GET /garages`

**Query Parameters**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| location    | string  | Address of user destination.                     |
| start_date  | string  | Reservation start datetime - UTC date in format “YYYY-MM-DD HH:MM:SS” |
| end_date    | string  | Reservation end datetime - UTC date in format “YYYY-MM-DD HH:MM:SS” |

**Response:** `Status: 200 OK`

### Reservations

Returns all reservations at garage matching filter criteria.

`GET /reservations/:garage_id`

**Path Variables**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| garage_id    | integer  | Id of garage.                     |

**Query Parameters**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| filter    | string  | Filter criteria for reservations - options are "reserved", "checked-in", "picking-up"                     |

**Response:** `Status: 200 OK`




Git Work Flow
## update your master branch
```
git checkout main
git pull origin main
```
## start work on a feature
```
git checkout -b feature-branch
```

## write code, commit, repeat
```
git add .
git commit
```

## rebase before pull request
```
git checkout main
git pull origin main
```

## push to a feature branch on YOUR fork
```
git push origin feature-branch
```

## make a pull request on GitHub

## if pull request is rejected
## fix merge conflicts


