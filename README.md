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
  
  ![RPReplay_Final1695411599](https://github.com/Confundus-Constructors/BlueOcean/assets/100256151/cd068d37-acf2-4ecb-95dd-bb35f48a51ce)
- **Check Car Status:** Convenient signaling and notification system.
- **Pick up:** Streamlined retrieval and payment process with real-time availability updates.

  
## Backend Documentation

### SQL Schema:

## API Routes:

### Garages

`GET /garages`

Returns all garages with available spots at input reservation times.

**Query Parameters**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| location    | string  | Address of user destination.                     |
| start_date  | string  | Reservation start datetime - UTC date in format “YYYY-MM-DD HH:MM:SS” |
| end_date    | string  | Reservation end datetime - UTC date in format “YYYY-MM-DD HH:MM:SS” |

**Response:** `Status: 200 OK`

### Reservations

`GET /reservations/:garage_id`

Returns all reservations at garage matching filter criteria.

**Path Variables**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| garage_id    | integer  | Id of garage.                     |

**Query Parameters**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| filter    | string  | Filter criteria for reservations - options are "reserved", "checked-in", "picking-up"                     |

**Response:** `Status: 200 OK`

### Vehicles

`GET /vehicles/:user_id`

Returns all vehicles for given user.

**Path Variables**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| user_id    | integer  | Id of user.                                      |

**Response:** `Status: 200 OK`

`POST /vehicles/:user_id`

Adds new vehicle for given user.

**Path Variables**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| user_id    | integer  | Id of user.                                      |

**Query Parameters**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| make_model    | string  | Make and model of car.                         |
| license_plate    | string  | License plate of car.                       |
| color    | string  | Color of car.                                       |

**Response:** `Status: 201 Added vehicle.`

### Transactions

`GET /transactions/:conf_code`

Returns the reservation data for both client and valet, and closest parking spot.

**Path Variables**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| conf_code    | string  | Unique Id for transaction.                      |

**Response:** `Status: 201`

`GET /transactions/confirmation`

Assigns randomly generated string for confirmation code.
**Response:** `Status: 201 OK`

`GET /parking_assignment/:conf_code`

Returns a closest parking spot at time of check-in.

**Path Variables**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| conf_code    | string  | Unique Id for transaction.                      |

**Response:** `Status 201 OK`

`PUT /transactions/:conf_code`

Updates status of transaction and other fields ased on current_status at time of call.

**Path Variables**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| conf_code    | string  | Unique Id for transaction.                      |

**Response:** `Successfully updated transactions`

`POST /transactions/:conf_code`

Adds new transactions at time of reservation.

**Path Variables**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| conf_code    | string  | Unique Id for transaction.                      |

**Query Parameters**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| user_id    | integer  | Id of user.                                      |
| vehicle_id    | integer  | Id of vehicle.                                |
| garage_id    | integer  | Id of garage.                                  |
| qr_code    | string  | Confirmation code.                                |

**Response:** `Status 201 Created`

`GET /transactions/users/:user_id`

Returns all transactions associated with given user.

**Path Variables**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| user_id    | integer  | Id of user.                                      |

**Query Parameters**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| filter    | string  | Filter criteria for reservations - options are "reserved", "checked-in", "picking-up"                                                           |

**Response:** `Status 201 OK`

`PUT /transactions/notify/:conf_code`

Updates current_status of transaction to "picking-up".

**Path Variables**

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| conf_code    | string  | Unique Id for transaction.                      |

**Response:** `Status 201 Notifying valets to retrieve your vehicle`

