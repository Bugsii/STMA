-- How to create db in mysql
-- Run this script once only. Do not run multiple times. Make sure you are login as root user
create database ThesisDb; 
create user 'thesis'@'%' identified by 'thesis'; 
grant all privileges on ThesisDb.* to 'thesis'@'%'; 

-- Create users table
use ThesisDb; 
CREATE TABLE `users` (
  `userid` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid` (`userid`)
); 

 -- Insert record into users table for login use
use ThesisDb; 
INSERT into users (username, email, password) value ('user1','user1@gmail.com','User12345!'); 
INSERT into users (username, email, password) value ('user2','user2@gmail.com','User246810!');  
INSERT into users (username, email, password) value ('guest','guest@gmail.com','Guest12345!');  
select * from users; -- query the table

-- Create Screentime table
use ThesisDb;
CREATE TABLE `screentime` (
    `screentimeid` bigint(20) NOT NULL AUTO_INCREMENT,
    `screentimeduration` timestamp NOT NULL,
    PRIMARY KEY (`screentimeid`)
);

-- Chreate trackers table
use ThesisDb; 
CREATE TABLE `trackers` (
  `trackerid` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(500) NOT NULL,
  `appname` varchar(100) NOT NULL, 
  `dateaccessed` DateTime,
  PRIMARY KEY (`trackerid`)
); 
select * from trackers; -- query the table
