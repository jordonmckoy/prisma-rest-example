# Migration `20200915050344`

This migration has been generated by Jordon at 9/15/2020, 2:03:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `mydb`.`Admin` (
`id` int  NOT NULL  AUTO_INCREMENT,
`name` varchar(191)  NOT NULL ,
`username` varchar(191)  NOT NULL ,
`password` varchar(191)  NOT NULL ,
`role` ENUM('ADMIN', 'EMPLOYEE')  NOT NULL DEFAULT 'ADMIN',
UNIQUE Index `Admin.username_unique`(`username`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `mydb`.`Employee` (
`id` int  NOT NULL  AUTO_INCREMENT,
`name` varchar(191)  NOT NULL ,
`username` varchar(191)  NOT NULL ,
`password` varchar(191)  NOT NULL ,
`role` ENUM('ADMIN', 'EMPLOYEE')  NOT NULL DEFAULT 'EMPLOYEE',
UNIQUE Index `Employee.username_unique`(`username`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `mydb`.`Review` (
`id` int  NOT NULL  AUTO_INCREMENT,
`content` varchar(191)  NOT NULL ,
`employeeId` int  NOT NULL ,
`reviewerId` int  ,
`submitted` boolean  NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `mydb`.`Review` ADD FOREIGN KEY (`employeeId`) REFERENCES `mydb`.`Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `mydb`.`Review` ADD FOREIGN KEY (`reviewerId`) REFERENCES `mydb`.`Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200915050344
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,44 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Admin {
+  id       Int    @default(autoincrement()) @id
+  name     String
+  username String @unique
+  password String
+  role     Role   @default(ADMIN)
+}
+
+model Employee {
+  id             Int      @default(autoincrement()) @id
+  name           String
+  username       String   @unique
+  password       String
+  Reviews        Review[] @relation("Reviewer")
+  EmployeeReview Review[] @relation("EmployeeReviwed")
+  role           Role     @default(EMPLOYEE)
+}
+
+model Review {
+  id         Int       @default(autoincrement()) @id
+  content    String
+  employee   Employee  @relation(name: "EmployeeReviwed", fields: [employeeId], references: [id])
+  employeeId Int
+  reviewer   Employee? @relation(name: "Reviewer", fields: [reviewerId], references: [id])
+  reviewerId Int?
+  submitted  Boolean
+}
+
+enum Role {
+  ADMIN
+  EMPLOYEE
+}
```


