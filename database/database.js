import * as SQLite from 'expo-sqlite';

export const DatabaseConnected = {
  getConnection: () => SQLite.openDatabase("dbName", 1.0 ),
};