#! /bin/bash

mongoimport --host backend-mongodb --username ${MONGO_INITDB_USERNAME} --password ${MONGO_INITDB_PASSWORD} --db ${MONGO_INITDB_DATABASE} --collection users --drop --type json --file /data/seed/backend.users.json --jsonArray
mongoimport --host backend-mongodb --username ${MONGO_INITDB_USERNAME} --password ${MONGO_INITDB_PASSWORD} --db ${MONGO_INITDB_DATABASE} --collection skills --drop --type json --file /data/seed/backend.skills.json --jsonArray
mongoimport --host backend-mongodb --username ${MONGO_INITDB_USERNAME} --password ${MONGO_INITDB_PASSWORD} --db ${MONGO_INITDB_DATABASE} --collection activities --drop --type json --file /data/seed/backend.activities.json --jsonArray